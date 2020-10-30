import requests

from django.shortcuts import render

# Create your views here.
from datetime import datetime

# def hello_world(request):
#     return render(request, 'template_whoami.html', {
#         'now': str(datetime.today()),
#     })

def test(request):
    uri = "http://10.0.0.15:8080/plugin/management/"
    response = requests.get(uri)
    print(response.json())
    if response.status_code == 200:
    	for i in response.json():
            return render(request, 'test.html', {
            'test': str(i['name']),
            })


def hello_world(request):
    return render(request, 'template_whoami.html', {
        'content': str(datetime.today()),
     })


def dashboard(request):
    return render(request, 'dashboard.html',{
    	'dashboard_active': str('active'),
    	'generic_template_link_status': str('nav-link collapsed'),
    	'generic_template_expanded': str('false'),
    })


def nssi_topology(request):
    return render(request, 'topology.html',{
    	'id': str(request.GET['id']),
    	'generic_template_link_status': str('nav-link collapsed'),
    	'nssi_topology_active': str('active'),
     	'generic_template_expanded': str('false'),
   })


def NSS_Instance(request):
    return render(request, 'nss_instance.html',{
    	'NSS_Instance_active': str('active'),
    	'generic_template_link_status': str('nav-link collapsed'),
     	'generic_template_expanded': str('false'),
   })


def plugin(request):
    return render(request, 'plugin.html',{
    	'generic_template_link_status': str('nav-link collapsed'),
    	'plugin_active': str('active'),
    	'generic_template_expanded': str('false'),
    })


def VNF_Template(request):
    return render(request, 'vnf_template.html',{
    	'vnf_template_active': str('active'),
    	'generic_template_link_status': str('nav-link'),
    	'generic_template_expanded': str('true'),
    	'generic_template_show': str('show'),
    })


def NSD_Template(request):
    return render(request, 'nsd_template.html',{
    	'nsd_template_active': str('active'),
    	'generic_template_link_status': str('nav-link'),
    	'generic_template_expanded': str('true'),
    	'generic_template_show': str('show'),
    })


def NRM_Template(request):
    return render(request, 'nrm_template.html',{
    	'nrm_template_active': str('active'),
    	'generic_template_link_status': str('nav-link'),
    	'generic_template_expanded': str('true'),
    	'generic_template_show': str('show'),
    })