from rest_framework import serializers, viewsets
from .models import Dropbox_link

# Serializers define the API representation.
class Dropbox_linkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dropbox_link
        fields = ['id','title', 'user', 'link', 'created_at', 'updated_at', 'link', 'used']


# ViewSets define the view behavior.
class Dropbox_linkViewSet(viewsets.ModelViewSet):
    queryset = Dropbox_link.objects.all()
    #_user = request.user
    #queryset = Dropbox_link.objects.filter(user=_user)

    serializer_class = Dropbox_linkSerializer

    def get_queryset(self):
        _user = self.request.user
        return Dropbox_link.objects.filter(user=_user)

