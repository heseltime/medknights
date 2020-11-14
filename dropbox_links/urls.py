from django.urls import path, include
from rest_framework import routers
from .views import Dropbox_linkViewSet

router = routers.DefaultRouter()
router.register(r'', Dropbox_linkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]