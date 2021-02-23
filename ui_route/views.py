import requests
from free5gmano_webui import settings
from django.shortcuts import render

# Create your views here.
from datetime import datetime


def dashboard(request):
    return render(request, 'dashboard.html', {
        'dashboard_active': str('active'),
        'generic_template_link_status': str('nav-link collapsed'),
        'generic_template_expanded': str('false'),
        'nssi_view_link_status': str('nav-link collapsed'),
        'nssi_view_expanded': str('false'),
        'NM_URL': settings.NM_URL,
    })


def nssi_topology(request):
    return render(request, 'nssi_topology.html', {
        'id': str(request.GET['id']),
        'status': str(request.GET['status']),
        'graph_view_active': str('active'),
        'generic_template_link_status': str('nav-link collapsed'),
        'generic_template_expanded': str('false'),
        'nssi_view_link_status': str('nav-link collapsed'),
        'nssi_view_expanded': str('true'),
        'nssi_view_show': str('show'),
        'NM_URL': settings.NM_URL,
    })


def NSS_Instance(request):
    return render(request, 'nss_instance.html', {
        'list_view_active': str('active'),
        'generic_template_link_status': str('nav-link collapsed'),
        'generic_template_expanded': str('false'),
        'nssi_view_link_status': str('nav-link collapsed'),
        'nssi_view_expanded': str('true'),
        'nssi_view_show': str('show'),
        'NM_URL': settings.NM_URL,
    })