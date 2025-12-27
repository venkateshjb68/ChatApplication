from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('ad1/', views.admin_dashboard, name='admin_dashboard'),
    path('upload/', views.upload_file, name='upload_file'),
]