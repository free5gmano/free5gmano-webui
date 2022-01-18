var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var datas,nssi_num;
var nssi_switched = 0;

function show_nssi(nssi_id) {
  axios.get(topology_url).then(response => {
    console.log(response);
    if (response.data.length) {
      for (var i = 1; i < response.data.length; i++) {
        // console.log(response.data[i].nodes);
        var node_tal = response.data[0].nodes;
        var node = response.data[i].nodes;
        $.merge(node_tal, node);
        var link_tal = response.data[0].links;
        var link = response.data[i].links;
        $.merge(link_tal, link);
      }
      datas = response.data[0];
      nssi_num = response.data.length;
    }else{
      nssi_num = 1;
      datas = response.data;
    }

    // console.log(datas);
    var categories = [];
    datas.nodes.forEach(function(node) {
      node.itemStyle = null;
      // node.symbol = 'image://https://lh3.googleusercontent.com/Xrl4VPHXpU676rucGuA2nWTlmyEZ0hmTuGH_GheNYEVUkfxx5AXE2GHhpT1c_1A46n19kvG6M5WORDjoAWo8bhbQO-QLlNyNke8qxiYJWRF1z49vvoxlxSiP_amlX0GE65B6xUoePw=w2400';
      // node.symbolSize = 20;
      node.category = node.attributes.modularity_class;
      node.value = node.category;
      // Use random x,y
      node.x = node.y = null;
      node.draggable = true;
    });

    categories[0] = {
      name: 'NSSI'
    };
    // categories[1] = {
    //   name: 'NSI'
    // };
    categories[1] = {
      name: "VNF",
      itemStyle: {
        color: "rgb(55, 206, 13)"
      }
    };

    label = false;

    // for (var i = 0; i < 3; i++) {
    //   categories[i] = {
    //     name: 'item' + i
    //   };
    // }

    myChart.setOption({
      tooltip: {},
      legend: [{
        data: categories.map(function (a) {
          return a.name;
        }),
        selected: {
          'NSI': false,
          'VNF': false
        }
      }],
      animation: false,
      series: [
          {
            type: 'graph',
            layout: 'force',
            data: datas.nodes,
            links: datas.links,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            categories: categories,
            roam: true,
            // focusNodeAdjacency: true,
            label: {
                show: true,
                position: 'bottom',
                color: 'rgba(0, 0, 0, 1)',
            },
            lineStyle: {
                      color: 'source',
                  },
            emphasis: {
                      lineStyle: {
                          width: 10
                      }
                  },
            force: {
                repulsion: 100
            }
          }]
      });
    if (!response.data.length) {
      // console.log(response.data.length);
      myChart.setOption({
        legend: [{
          selected: {
            'NSI': true,
            'VNF': true
          }
        }]
      });
    }
    document.getElementById("NS-view-Chart").innerHTML = '<label>Total NSSI: '+nssi_num+'</label>';
  });

    myChart.on('dblclick', function () {
      document.getElementById("NS-view-Chart").innerHTML = '<label>Total NSSI: '+nssi_num+'</label>';
  });

    myChart.on('click', {dataType: 'node'}, function (params) {
      console.log(params);
      switch(params.data.attributes.modularity_class){
        case 1:
          // console.log(params.data.attributes.modularity_class);
          document.getElementById("NS-view-Chart").innerHTML = '<label>VNF id: '+params.data.id+'</label>';
          document.getElementById("NS-view-Chart").innerHTML += '<label>VNF name: '+params.name+'</label>';
          document.getElementById("NS-view-Chart").innerHTML += '<br><label>Address: '+params.data.address+'</label>';
          document.getElementById("NS-view-Chart").innerHTML += '<br><label>VNF State: '+params.data.vnfState+'</label>';
          document.getElementById("NS-view-Chart").innerHTML += '<br><label>Instantiation State: '+params.data.instantiationState+'</label>';
          break;
        case 0:
          // console.log(params.data.attributes.modularity_class);
          document.getElementById("NS-view-Chart").innerHTML = '<label>NSSI id: '+params.data.id+'</label>';
          document.getElementById("NS-view-Chart").innerHTML += '<label>NSSI name: '+params.name+'</label>';
          // console.log(params.data.attributes.modularity_class);
          nssi_switched = !nssi_switched;
          label = !label;
          // console.log(nssi_switched);
          if (nssi_switched) {
            axios.get(url+params.data.id+'/').then(response => {
              var datas = response.data;
              var categories = [];
              datas.nodes.forEach(function(node) {
                node.itemStyle = null;
                node.category = node.attributes.modularity_class;
                node.value = node.category;
                // Use random x,y
                node.x = node.y = null;
                node.draggable = true;
              });
              myChart.setOption({
                legend: [{
                  selected: {
                    'NSI': label,
                    'VNF': label
                  }
                }],
                series: [{
                  data: datas.nodes,
                  links: datas.links
                }]
              });
            });
            document.getElementById("NS-view-Chart").innerHTML = '<label>NSSI id: '+params.data.id+'</label>';
            document.getElementById("NS-view-Chart").innerHTML += '<label>NSSI name: '+params.name+'</label>';
          }else{
            myChart.setOption({
              legend: [{
                selected: {
                  'NSI': label,
                  'VNF': label
                }
              }],
              series: [{
                data: datas.nodes,
                links: datas.links
              }]
            });
            document.getElementById("NS-view-Chart").innerHTML = '<label>Total NSSI: '+nssi_num+'</label>';
          }
          break;
      }
  });
  if (nm_url != ''){
    const subscriptions_json = JSON.stringify({filter:{nsInstanceSubscriptionFilter:{nSSIId:[nssi_id]}},
                                callbackUri:Kafka_URL+'topics/fault_alarm_'+nssi_id+'/',timeTick:"1"});
    axios.post(nm_url+'subscriptions/', subscriptions_json, {
      headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json'
      }
    }).then(response => {
      console.log(response);
      const consumers_json = JSON.stringify({"id":getRandom(1,100),"format":"binary",
                                            "auto.offset.reset":"earliest","auto.commit.enable":false});
      axios.post(Kafka_URL+'consumers/group', consumers_json, {
        headers: {
          'Content-Type': 'application/vnd.kafka.v2+json'
        }}).then(response => {
          var consumers_basi_uri = response.data.base_uri;
          console.log(consumers_basi_uri);
          const create_topic_json = JSON.stringify({"topics":["fault_alarm_"+nssi_id]});
          axios.post(consumers_basi_uri+'/subscription', create_topic_json, {
            headers: {
              'Content-Type': 'application/vnd.kafka.v2+json'
            }
          }).then(response => {
            alert("NSSI Status Subscription Start !!");
            setInterval(function (){
              axios.get(consumers_basi_uri+'/records', {
                headers: {
                  "Content-Type": "application/vnd.kafka.json.v2+json"
                }
              }).then(response => {
                console.log(response);
                if (response.data.length != 0){
                  for (let i = 0; i < response.data.length; i++){
                    console.log(Base64.decode(response.data[i].value));
                    decode_message = Base64.decode(response.data[i].value);
                  }
                }
              });
            }, 4000);
          });
        });
      });
  }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
