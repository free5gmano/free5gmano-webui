function nss_instance_list(){
  const url = 'http://10.0.0.15:8080/ObjectManagement/NetworkSliceSubnet/*/?scope=[%27BASE_NTH_LEVEL%27,0]';
  axios.get(url).then((response) => {
    console.log(response.data);
    for (var i = 0; i < response.data.attributeListOut.length; i++) {
      document.getElementById("nssitable").innerHTML += '\
        <tr>\
          <td>'+response.data.attributeListOut[i].nssiId+'</td>\
          <td>'+response.data.attributeListOut[i].nsInfo+'</td>\
          <td>'+response.data.attributeListOut[i].sliceProfileList['0']+'</td>\
          <td>'+response.data.attributeListOut[i].administrativeState+'</td>\
          <td>'+response.data.attributeListOut[i].operationalState+'</td>\
          <td align="center"><a href="/nssi_topology?id='+response.data.attributeListOut[i].nssiId+'"><img src="/static/images/topology_icon.png" alt="" style="width: 32px; height: 32px"></a></td>\
        </tr>';
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  });
}