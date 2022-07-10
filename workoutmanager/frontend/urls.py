from django.urls import re_path
from . import views

# allows any pattern for reload
urlpatterns = [
    re_path(r'^.*', views.index)
]
