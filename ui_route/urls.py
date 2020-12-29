from django.urls import path
from django.conf.urls import url, include
from ui_route.views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
	url(r'^test/$', test),
 #    url(r'^hellonuts/$', hello_world),
    url(r'^dashboard/$', dashboard),
    url(r'^nssi_topology/$', nssi_topology),
    # url(r'^nssi_list/$', nssi_list),
    url(r'^NSS_Instance/$', NSS_Instance),
    url(r'^plugin/$', plugin),
    url(r'^VNF_Template/$', VNF_Template),
    url(r'^NSD_Template/$', NSD_Template),
    url(r'^NRM_Template/$', NRM_Template),
    url(r'^NSS_Template/$', NSS_Template),
]

urlpatterns += staticfiles_urlpatterns()