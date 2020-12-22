function nrm_template_list(url){
  axios.get(url+'ObjectManagement/GenericTemplate/').then((response) => {
    // console.log(response.data);
    var response = response.data;
    // console.log(response);
    for (var i =0; i< response.length; i++) {
      if (response[i].templateType == "NRM" && response[i].operationStatus == "UPLOAD") {
        nrm_id = response[i].templateId;
        document.getElementById("nrm_table").innerHTML += '\
          <tr>\
            <td>'+nrm_id+'</td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nrm_id+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="'+response[i].templateFile+'" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nrm_id+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
      }
      else if (response[i].templateType == "NRM"){
        nrm_id = response[i].templateId;
        document.getElementById("nrm_table").innerHTML += '\
          <tr>\
            <td>'+nrm_id+'</td>\
            <td>'+response[i].name+'</td>\
            <td>'+response[i].description+'</td>\
            <td>'+response[i].templateType+'</td>\
            <td>'+response[i].nfvoType+'</td>\
            <td>'+response[i].operationStatus+'</td>\
            <td align="center"><a href="#" onclick="show_update_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nrm_id+'\',\''+response[i].nfvoType+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_template_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
            <td align="center"><a href="#" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
            <td align="center"><a href="#" onclick="delete_template(\''+url+'ObjectManagement/GenericTemplate/\',\''+nrm_id+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
          </tr>';
      }
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  });
}


function delete_template(url, name) {
  var yes = confirm("Sure to delete NRM Template ?");
  if (yes) {
    axios.delete(url+name+'/').then((response) => {
      alert("NRM Template Delete Success");
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
    console.log(file);
}


function create_template(url) {
  var name = document.getElementById("template_name").value;
  var description = document.getElementById("nrm_description").value;
  var nfvoType = document.getElementById("nfvoType").value;
  var form = new FormData();
  form.append("nfvoType", nfvoType);
  form.append("templateType", "NRM");
  form.append("name", name);
  form.append("description", description);
 if (nfvoType && name) {
    axios.post(url+'ObjectManagement/GenericTemplate/', form)
    .then((response) => {
      alert("NRM Template Create Success !!");
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
        <h5 class="modal-title" id="exampleModalLabel">Update NRM Template</h5>\
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">×</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        <label for="update_template_id">NRM Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+name+'"><br>\
        <label for="templateFile">NRM Template File :</label><br><input class="btn btn-secondary btn-icon-split" name="templateFile" id="templateFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
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
    form.append("templateType", "NRM");
    form.append("templateFile", file);
    axios.put(url+name+'/', form)
    .then((response) => {
      alert("Template update success！");
      location.reload();
    })
    .catch((error) => {
      alert("NRM Template model has some error.");
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


// function show_nrm_info(url, nrmid) {
//   // console.log("show nrm info");
//   axios.get(url+nrmid+'/')
//   .then((response) => {
//     console.log(response.data);
//     if (response.data.operationStatus == "UPLOAD") {
//       document.getElementById("nrm_info_Modal").innerHTML += '\
//         <div class="modal-dialog" role="document">\
//           <div class="modal-content">\
//             <div class="modal-header">\
//               <h5 class="modal-title" id="exampleModalLabel">Network Resource Info</h5>\
//               <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
//                 <span aria-hidden="true">×</span>\
//               </button>\
//             </div>\
//             <div class="modal-body">\
//               <label for="update_template_id">NRM Template ID :</label><input type="text" class="form-control bg-light border-0 small" name="update_template_id" id="update_template_id" required readonly value="'+name+'"><br>\
//               <label for="templateFile">NRM Template File :</label><br><input class="btn btn-secondary btn-icon-split" name="templateFile" id="templateFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
//             <div class="modal-footer">\
//               <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>\
//               <a class="btn btn-primary" href="#" onclick="update_template(\''+url+'\',\''+nfvoType+'\')">Update</a>\
//             </div>\
//           </div>\
//         </div>';
//     }
//   })
// }

// <td align="center"><a href="#" onclick="show_nrm_info(\''+url+'ObjectManagement/GenericTemplate/\',\''+nrm_id+'\')" class="btn btn-info btn-circle"><i class="fas fa-file-alt text-white"></i></a></td>\