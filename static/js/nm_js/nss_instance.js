function nss_instance_list(url){
  axios.get(url+'ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,1]').then((response) => {
    var response = response.data.attributeListOut;
    // console.log(response);
    for (var i =0; i< response.length; i++) {
      // console.log(response[i])
      if (response[i].nsInfo) {
        document.getElementById("nssitable").innerHTML += '\
          <tr>\
            <td>\
              <ul id="myUL">\
                <li><span class="caret">'+response[i].nssiId+'</span>\
                  <ul class="nested">\
                    <table id="'+response[i].nssiId+'">\
                      <thead>\
                        <tr>\
                          <th>VNF Name</th>\
                          <th>VNF Provider</th>\
                          <th>VNF State</th>\
                          <th>VNF IP Addresses</th>\
                        </tr>\
                      </thead>\
                    </table>\
                  </ul>\
                </li>\
              </ul>\
            </td>\
            <td>'+response[i].nsInfo.nsInstanceName+'</td>\
            <td>'+response[i].administrativeState+'</td>\
            <td>'+response[i].operationalState+'</td>\
            <td align="center"><a href="/nssi_topology?id='+response[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
            <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response[i].nssiId+'\')" class="btn btn-warning btn-circle"><i class="fas fa-exclamation-triangle"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_nssi(\''+url+'ObjectManagement/NetworkSliceSubnet/'+response[i].nssiId+'/?scope=[%27BASE_NTH_LEVEL%27,0]\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
          strdata = response[i].nsInfo.vnfInstance;
          strdata_handle = strdata.replace(/'/g, '"').replace(/:[ ]*False/g, ":false").replace(/:[ ]*True/g, ":true").replace(/:[ ]*None/g, ":null");
          result = JSON.parse(strdata_handle);
          console.log(result);
        for (var j=0; j<result.length; j++){
          // console.log(result[j]);
          vnf_name = result[j].vnfProductName;
          vnf_ip = result[j].instantiatedVnfInfo.extCpInfo[0].cpProtocolInfo[0].ipOverEthernet.ipAddresses[0].addresses;
          document.getElementById(response[i].nssiId).innerHTML += '\
            <tr>\
              <td style="text-align: center">'+vnf_name+'</td>\
              <td style="text-align: center">'+result[j].vnfProvider+'</td>\
              <td>'+result[j].instantiatedVnfInfo.vnfState+'</td>\
              <td style="text-align: center">'+vnf_ip+'</td>\
            </tr>';
        }
      }
      else{
        document.getElementById("nssitable").innerHTML += '\
          <tr>\
            <td>\
              <ul id="myUL">\
                <li><span class="caret">'+response[i].nssiId+'</span>\
                  <ul class="nested">\
                    <table id="'+response[i].nssiId+'">\
                      <thead>\
                        <tr>\
                          <th>VNF Name</th>\
                          <th>VNF Provider</th>\
                          <th>VNF State</th>\
                          <th>VNF IP Addresses</th>\
                        </tr>\
                      </thead>\
                    </table>\
                  </ul>\
                </li>\
              </ul>\
            </td>\
            <td>'+response[i].nsInfo+'</td>\
            <td>'+response[i].administrativeState+'</td>\
            <td>'+response[i].operationalState+'</td>\
            <td align="center"><a href="#"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
            <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response[i].nssiId+'\')" class="btn btn-warning btn-circle"><i class="fas fa-exclamation-triangle"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_nssi(\''+url+'ObjectManagement/NetworkSliceSubnet/'+response[i].nssiId+'/?scope=[%27BASE_NTH_LEVEL%27,0]\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
        document.getElementById(response[i].nssiId).innerHTML += '<tr><td colspan="4" style="text-align: center">No VNF Information !!</td></tr>';
      }
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
    var toggler = document.getElementsByClassName("caret");
    var i;
    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
      });
    }
  });
}


function deallocate_nssi(url, nssiID){
  axios.delete(url+nssiID)
  .catch(function (error) {
    if (error.response) {
      alert("NSSI Deallocate Success");
      location.reload();
    }
    else if (error.request) {
      alert("test");
    }
    else {
      console.log('Error', error.message);
      alert("test123");
    }
  });
}


function delete_nssi(url){
  axios.delete(url).then((response) => {
    alert("NSSI Delete Success");
    location.reload();
  })
  .catch((error) => {
    console.log(error);
    alert("ERROR!!");
  });
}