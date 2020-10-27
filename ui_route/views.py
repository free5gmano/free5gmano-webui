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
    })


def nssi_topology(request):
    return render(request, 'topology.html',{
    	'id': str(request.GET['id']),
    	'nssi_topology_active': str('active'),
    })


def NSS_Instance(request):
    return render(request, 'nss_instance.html',{
    	'NSS_Instance_active': str('active'),
    })


def plugin(request):
    return render(request, 'plugin.html',{
    	'plugin_active': str('active'),
    })