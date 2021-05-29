function vnf_template_list(url){
  axios.get(url+'ObjectManagement/GenericTemplate/').then((response) => {
    var response = response.data;
    for (var i =0; i< response.length; i++) {
      if (response[i].templateType == "VNF" && response[i].operationStatus == "UPLOAD") {
        document.getElementById("vnf_table").innerHTML += '\
          <tr>\
            <td>\
              <ul id="myUL">\
                <li><span class="caret">'+response[i].templateId+'</span>\
                  <ul class="nested" id="'+response[i].templateId+'"></ul>\
                </li>\
              </ul>\
            </td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+response[i].templateId+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="'+response[i].templateFile+'" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+response[i].templateId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
        for (var j=0; j<response[i].content.length; j++){
          strdata = response[i].content[j].topology_template;
          strdata_handle = strdata.replace(/'/g, '"').replace(/:[ ]*False/, ":false").replace(/:[ ]*True/, ":true");
          result = JSON.parse(strdata_handle);
          if (!('VNF1' in result.node_templates)) {
            for (vnf in result.node_templates){
              if (result.node_templates[vnf].type == 'tosca.nodes.nfv.VDU.Tacker'){
                vnf_descriptor_id = result.node_templates[vnf].properties.name;
              }
            }
          }else{
            vnf_descriptor_id = result.node_templates.VNF1.properties.descriptor_id;
          }
          document.getElementById(response[i].templateId).innerHTML += '<li>'+vnf_descriptor_id+'</li>';
        }
      }
      else if (response[i].templateType == "VNF"){
        document.getElementById("vnf_table").innerHTML += '\
          <tr>\
            <td>\
              <ul id="myUL">\
                <li><span class="caret">'+response[i].templateId+'</span>\
                  <ul class="nested" id="'+response[i].templateId+'"></ul>\
                </li>\
              </ul>\
            </td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+response[i].templateId+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="#" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+response[i].templateId+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
        document.getElementById(response[i].templateId).innerHTML += '<li>No Upload Virtualized Network Function Template!!</li>';
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


function delete_template(url, name) {
  var yes = confirm("Sure to delete VNF Template ?");
  if (yes) {
    axios.delete(url+name+'/').then((response) => {
      alert("VNF Template Delete Success");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR!!");
    });
  }
}


var file;
function upload(e) {
    file = e.files[0];
    if (!file) {
        return;
    }
}


function create_template(url) {
  var name = document.getElementById("template_name").value;
  var description = document.getElementById("vnf_description").value;
  var nfvoType = document.getElementById("nfvoType").value;
  var form = new FormData();
  form.append("nfvoType", nfvoType);
  form.append("templateType", "VNF");
  form.append("name", name);
  form.append("description", description);
 if (nfvoType && name) {
    axios.post(url+'ObjectManagement/GenericTemplate/', form)
    .then((response) => {
      alert("VNF Template Create Success !!");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert("ERROR!!");
    });
  }
  else{
    alert("Please select a NFVO or enter template name!");
  }
}


function show_update_template(url, name, nfvoType) {
  document.getElementById("update_template_Modal").innerHTML = '\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title" id="exampleModalLabel">Update VNF Template</h5>\
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">×</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        <label for="update_template_id">VNF Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+name+'"><br><br>\
        <label for="templateFile">VNF Template File :</label><br><input class="btn btn-secondary btn-icon-split" name="templateFile" id="templateFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
      <div class="modal-footer">\
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>\
        <a class="btn btn-primary" href="#" onclick="update_template(\''+url+'\',\''+nfvoType+'\')">Update</a>\
      </div>\
    </div>\
  </div>';
}


function update_template(url, nfvoType) {
  var name = document.getElementById("update_template_id").value;
  if (file && name) {
    var form = new FormData();
    form.append("nfvoType", nfvoType);
    form.append("templateType", "VNF");
    form.append("templateFile", file);
    axios.put(url+name+'/', form)
    .then((response) => {
      alert("Template update success！");
      location.reload();
    })
    .catch((error) => {
      alert("VNF Template model has some error.");
    });
  }else{
    alert("Please enter Template ID and Template File");
  }
}


function get_plugin_list(url) {
  axios.get(url+'plugin/management/').then((response) => {
    var response = response.data;
    if (response.length == 0){
      document.getElementById("nfvoType").innerHTML = '<option value="">Create NFVO first</option>';
    }
    else{
      document.getElementById("nfvoType").innerHTML = '<option value="">Select a NFVO</option>';
      for (var i = 0; i < response.length; i++) {
        document.getElementById("nfvoType").innerHTML += '\
        <option value="'+response[i].name+'">'+response[i].name+'</option>';
      }
    }
  });
}