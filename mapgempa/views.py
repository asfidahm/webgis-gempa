from django.views.generic.base import TemplateView

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from mapgempa.models import gempa, jembatan_nasional, bendungan, tpa, spam, iplt, ipal, rumah_khusus, rusunawa
from mapgempa.serializers import  GempaSerializer, JembatanSerializer, BendunganSerializer, TPASerializer
from django.contrib.gis.measure import D

# Create your views here.

class GempaTahunanView(TemplateView):
    template_name = 'gempa_tahunan.html'

class GempaView(TemplateView):
    template_name = 'gempa.html'

class IndexView(TemplateView):
    template_name = 'index.html'

@api_view(['GET'])
def gempaall(request):
    queryset = gempa.objects.order_by('id')
    serializer = GempaSerializer(queryset, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def gempawithid(request, pk):
    queryset = gempa.objects.get(pk=pk)
    serializer = GempaSerializer(queryset)
    
    return Response(serializer.data)

@api_view(['GET'])
def id_jembatan(request, pk):
    sm = gempa.objects.get(pk=pk)
    queryset = jembatan_nasional.objects.filter(geom__distance_lt = (sm.geom, D(km=sm.estimasiradius)))
    serializer = JembatanSerializer(queryset, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def id_bendungan(request, pk):
    sm = gempa.objects.get(pk=pk)
    queryset = bendungan.objects.filter(geom__distance_lt = (sm.geom, D(km=sm.estimasiradius)))
    serializer = BendunganSerializer(queryset, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def id_tpa(request, pk):
    sm = gempa.objects.get(pk=pk)
    queryset = tpa.objects.filter(geom__distance_lt = (sm.geom, D(km=sm.estimasiradius)))
    serializer = TPASerializer(queryset, many=True)
    
    return Response(serializer.data)