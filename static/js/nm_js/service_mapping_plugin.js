// const url = 'http://127.0.0.1:30088/plugin/management/';
const url = 'http://10.0.0.15:8080/plugin/management/';

function service_mapping_plugin_list(){
  axios.get(url).then((response) => {
    console.log(response.data);
    var response = response.data;
    for (var i = 0; i < response.length; i++) {
      document.getElementById("plugintable").innerHTML += '\
        <tr>\
          <td>'+response[i].name+'</td>\
          <td>'+response[i].allocate_nssi+'</td>\
          <td>'+response[i].deallocate_nssi+'</td>\
          <td align="center"><a href="#" onclick="show_update_plugin(\''+response[i].name+'\')" class="btn btn-warning btn-circle" data-toggle="modal" data-target="#update_plugin_Modal"><i class="fas fa-fw fa-wrench"></i></a></td>\
          <td align="center"><a href="'+response[i].pluginFile+'" class="btn btn-primary btn-circle"><i class="fas fa-arrow-down"></i></a></td>\
          <td align="center"><a href="#" onclick="delete_plugin(\''+response[i].name+'\')" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a></td>\
        </tr>';
    }
    // Call the dataTables jQuery plugin
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  });
}

function delete_plugin(name) {
  console.log(name);
  axios.delete(url+name+'/').then((response) => {
    alert(response.data.status);
    location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

var file;
function upload(e) {
    file = e.files[0];
    if (!file) {
        return;
    }
    console.log(file);
}

function create_plugin() {
  var name = document.getElementById("create_pluginName").value;
  if (file && name) {
    var form = new FormData();
    form.append("name", name);
    form.append("pluginFile", file);
    axios.post(url, form)
    .then((response) => {
      location.reload();
    })
    .catch((error) => {
      alert("Service Mapping Plugin model with this name already exists.");
    });
  }else{
    alert("Please enter Plugin Name and Plugin File");
  }
}

function show_update_plugin(name) {
  document.getElementById("update_plugin_Modal").innerHTML = '\
  <div class="modal-dialog" role="document">\
    <div class="modal-content">\
      <div class="modal-header">\
        <h5 class="modal-title" id="exampleModalLabel">Update Service Mapping Plugin</h5>\
        <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
          <span aria-hidden="true">×</span>\
        </button>\
      </div>\
      <div class="modal-body">\
        <label for="update_pluginName">Plugin Name :</label><input type="text" name="update_pluginName" id="update_pluginName" required readonly value="'+name+'"><br><br>\
        <label for="pluginFile">Plugin File :</label><input name="pluginFile" id="pluginFile" type="file" accept=".zip" onchange="upload(this)" required></div>\
      <div class="modal-footer">\
        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>\
        <a class="btn btn-primary" href="#" onclick="update_plugin()">Create</a>\
      </div>\
    </div>\
  </div>';
}

function update_plugin() {
  var name = document.getElementById("update_pluginName").value;
  console.log(name);
  if (file && name) {
    var form = new FormData();
    form.append("name", name);
    form.append("pluginFile", file);
    axios.patch(url+name+'/', form)
    .then((response) => {
      alert("Plugin update success！");
      location.reload();
    })
    .catch((error) => {
      alert("Service Mapping Plugin model has some error.");
    });
  }else{
    alert("Please enter Plugin Name and Plugin File");
  }
}