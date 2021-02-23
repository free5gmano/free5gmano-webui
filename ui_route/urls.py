from django.urls import path
from django.conf.urls import url, include
from ui_route.views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^dashboard/$', dashboard),
    url(r'^nssi_topology/$', nssi_topology),
    url(r'^NSS_Instance/$', NSS_Instance),
]

urlpatterns += staticfiles_urlpatterns()