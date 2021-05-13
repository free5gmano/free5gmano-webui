var dom = document.getElementById("container");
var myChart = echarts.init(dom);

function show_deallocate_nssi_topology(nssiID, NM_URL) {
	  axios.get(topology_url).then(response => {
	    if (response.data.length) {
	      for (var i = 1; i < response.data.length; i++) {
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

	    var categories = [];
	    datas.nodes.forEach(function(node) {
	      node.itemStyle = null;
	      node.category = node.attributes.modularity_class;
	      node.value = node.category;
	      // Use random x,y
	      node.x = node.y = null;
	      node.draggable = true;
	    });

	    categories[0] = {
	      name: 'NSSI'
	    };
	    categories[1] = {
	      name: "VNF",
	      itemStyle: {
	        color: "rgb(55, 206, 13)"
	      }
	    };
	    label = false;
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
	    delete_vnf(datas.nodes, nssiID, NM_URL);
	  });
}


async function reload_nssi_topology(nodes) {
    myChart.setOption({
      series: [
          {
            type: 'graph',
            layout: 'force',
            data: nodes,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            roam: true,
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
}


function delete_vnf(nodes, nssiID, NM_URL) {
	const url = NM_URL+'ObjectManagement/NSS/SliceProfiles/';
	for (let i = nodes.length - 1; i >= 1; i--) {
	    setTimeout(function (){
	    	nodes.pop();
	    	reload_nssi_topology(nodes);
	    	if (nodes.length == 1) {
	    		alert("NSSI Deallocate Success");
	    		window.location.href = '/NSS_Instance/';
	    	}
	    }, i*1500);
	}
    axios.delete(url+nssiID+'/')
    .catch((error) => {
      console.log(error);
      alert("NSSI in not allocated");
      window.location.href = '/NSS_Instance/';
    });
}