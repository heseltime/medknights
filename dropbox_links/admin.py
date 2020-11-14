# Register your models here.
from django.contrib import admin
from .models import Dropbox_link


class Dropbox_link_admin(admin.ModelAdmin):
    fields = ('title', 'user', 'link')
    list_display = ('title', 'user', 'created_at', 'updated_at', 'link', 'used')

admin.site.register(Dropbox_link, Dropbox_link_admin)
