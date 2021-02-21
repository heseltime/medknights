#from django.urls import path

#from . import views

#urlpatterns = [
#    path('', views.index, name='index'),
#]

from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    url('^skript/gewebe$', TemplateView.as_view(template_name='gewebe.html')),
    url('^skript/gewebe/epithelgewebe$', TemplateView.as_view(template_name='gewebe/epithelgewebe.html')),
    url('^skript/gewebe/bindegewebe$', TemplateView.as_view(template_name='gewebe/bindegewebe.html')),
    url('^skript/gewebe/muskelgewebe$', TemplateView.as_view(template_name='gewebe/muskelgewebe.html')),
    url('^skript/gewebe/nervengewebe$', TemplateView.as_view(template_name='gewebe/nervengewebe.html')),
    url('^skript/se$', TemplateView.as_view(template_name='soziales_entscheiden.html')),
    url('^turnier/gewebe$', TemplateView.as_view(template_name='gewebe/turnier.html')),
    url('^turnier/se$', TemplateView.as_view(template_name='soziales_entscheiden/turnier.html')),
    url('^schmiede$', TemplateView.as_view(template_name='schmiede/zf.html')),
    url('^schmiede/wf$', TemplateView.as_view(template_name='schmiede/wf.html')),
    url('^schmiede/word_tracker$', TemplateView.as_view(template_name='schmiede/word_tracker.html')),
    url('^pages/medKnights$', TemplateView.as_view(template_name='medKnights.html')),
    url('^pages/jack$', TemplateView.as_view(template_name='jack.html')),
    url('^skript/bms_canon$', TemplateView.as_view(template_name='bms_canon.html')),
    url('^skript/ee_merk$', TemplateView.as_view(template_name='ee+merk.html')),
    url('^turnier/ee_merk$', TemplateView.as_view(template_name='ee_merk/turnier.html')),
    url('^turnier/ee$', TemplateView.as_view(template_name='ee_merk/ee_turnier.html')),
    url('^schmiede/zf$', TemplateView.as_view(template_name='schmiede/zf.html')),
    url('^schmiede/imp$', TemplateView.as_view(template_name='schmiede/imp.html')),
    url('^tv/turnier$', TemplateView.as_view(template_name='tv/turnier_01.html')),
    url('^tv/turnier_01$', TemplateView.as_view(template_name='tv/turnier_01.html')),
    url('^tv/turnier_02$', TemplateView.as_view(template_name='tv/turnier_02.html')),
    url('^tv/turnier_03$', TemplateView.as_view(template_name='tv/turnier_03.html')),
    url('^schmiede/fz$', TemplateView.as_view(template_name='schmiede/fz.html')),
    url('^pages/next_steps$', TemplateView.as_view(template_name='next_steps.html')),
    url('^pages/maxi$', TemplateView.as_view(template_name='maxi.html')),
    url('^turnier/merk$', TemplateView.as_view(template_name='ee_merk/merk_turnier.html')),
    url('^tv/turnier_04$', TemplateView.as_view(template_name='tv/turnier_04.html')),
    url('^tv/turnier_05$', TemplateView.as_view(template_name='tv/turnier_05.html'))
]