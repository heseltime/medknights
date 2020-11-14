from django.urls import path, include
from . import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('/login/', views.login_view),
    path('/logout/', views.logout_view),
    path('/register/', views.register),
]