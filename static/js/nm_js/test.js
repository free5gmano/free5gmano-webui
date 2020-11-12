// function nss_instance_list(url){
//   axios.get(url+'ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,1]').then((response) => {
//     console.log(response.data);
//     for (var i = 0; i < response.data.attributeListOut.length; i++) {
//       // console.log(response.data.attributeListOut[i].nsInfo);
//       if(response.data.attributeListOut[i].nsInfo) {
//       document.getElementById("nssitable").innerHTML += '\
//           <tr>\
//             <td>'+response.data.attributeListOut[i].nssiId+'</td>\
//             <td>'+response.data.attributeListOut[i].nsInfo.nsInstanceName+'</td>\
//             <td>'+response.data.attributeListOut[i].administrativeState+'</td>\
//             <td>'+response.data.attributeListOut[i].operationalState+'</td>\
//             <td align="center"><a href="/nssi_topology?id='+response.data.attributeListOut[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
//             <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response.data.attributeListOut[i].nssiId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
//           </tr>';        
//       }else{
//         document.getElementById("nssitable").innerHTML += '\
//           <tr>\
//             <td>'+response.data.attributeListOut[i].nssiId+'</td>\
//             <td>'+response.data.attributeListOut[i].nsInfo+'</td>\
//             <td>'+response.data.attributeListOut[i].administrativeState+'</td>\
//             <td>'+response.data.attributeListOut[i].operationalState+'</td>\
//             <td align="center"><a href="/nssi_topology?id='+response.data.attributeListOut[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
//             <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response.data.attributeListOut[i].nssiId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
//           </tr>';        
//       }
//       // document.getElementById("nssitable").innerHTML += '\
//       //   <tr>\
//       //     <td>'+response.data.attributeListOut[i].nssiId+'</td>\
//       //     <td>'+response.data.attributeListOut[i].nsInfo+'</td>\
//       //     <td>'+response.data.attributeListOut[i].administrativeState+'</td>\
//       //     <td>'+response.data.attributeListOut[i].operationalState+'</td>\
//       //     <td align="center"><a href="/nssi_topology?id='+response.data.attributeListOut[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
//       //     <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response.data.attributeListOut[i].nssiId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
//       //   </tr>';
//     }
//     // Call the dataTables jQuery plugin
//     $(document).ready(function() {
//       $('#dataTable').DataTable();
//     });
//   });
// }


// function deallocate_nssi(url, nssiID){
//   axios.delete(url+nssiID).then((response) => {
//     alert("NSSI Deallocate Success");
//     location.reload();
//   })
//   .catch((error) => {
//     console.log(error);
//     alert("ERROR!!");
//   });
// }

// $(function(){
//     $("#employees").dxTreeList({
//         dataSource: employees,
//         rootValue: -1,
//         keyExpr: "ID",
//         parentIdExpr: "Head_ID",
//         columns: [{
//             dataField: "nssiId",
//             caption: "ID"
//         }, "Name", "administrativeState", "operationalState"],
//         expandedRowKeys: [1],
//         showRowLines: true,
//         showBorders: true,
//         columnAutoWidth: true
//     });
// });


function vnf_template_list(url){
  axios.get('http://10.20.1.111:8080/ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,1]').then((response) => {
    // console.log(response.data);
    var response = response.data.attributeListOut;
    // console.log(response);
    for (var i =0; i< response.length; i++) {
      // console.log(response[i])
      if (response[i].nsInfo) {
        // console.log(response[i].content)
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
                          <th>IP Addresses</th>\
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
            <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response[i].nssiId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
          strdata = response[i].nsInfo.vnfInstance;
          // console.log(strdata);
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
                          <th>IP Addresses</th>\
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
            <td align="center"><a href="/nssi_topology?id='+response[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
            <td align="center"><a href="#" onclick="deallocate_nssi(\''+url+'ObjectManagement/NSS/SliceProfiles/\',\''+response[i].nssiId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
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
