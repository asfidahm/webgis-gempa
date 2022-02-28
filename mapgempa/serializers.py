from rest_framework_gis import serializers
from mapgempa.models import gempa, jembatan_nasional, bendungan, tpa, spam, iplt, ipal, rumah_khusus, rusunawa

class GempaSerializer(serializers.GeoFeatureModelSerializer):
    
    class Meta:
        fields = ("id", "name", "magnitude", "depth", "datetime", "bujur_x", "lintang_y", "estimasiradius", "jumlahinf", "cluster")
        geo_field = "geom"
        model = gempa

class JembatanSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "kode_jembatan", "panjang", "lebar", "bujur_x", "lintang_y", "nomor_jembatan")
        geo_field = "geom"
        model = jembatan_nasional

class BendunganSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "balai", "bujur_x", "lintang_y")
        geo_field = "geom"
        model = bendungan

class TPASerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "bujur_x", "lintang_y")
        geo_field = "geom"
        model = tpa

class SPAMSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "bujur_x", "lintang_y")
        geo_field = "geom"
        model = spam

class IPLTSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "bujur_x", "lintang_y")
        geo_field = "geom"
        model = iplt

class IPALSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "bujur_x", "lintang_y")
        geo_field = "geom"
        model = ipal

class RusunawaSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "alamat", "hunian","bujur_x", "lintang_y")
        geo_field = "geom"
        model = rusunawa

class RususSerializer(serializers.GeoFeatureModelSerializer):
    class Meta:
        fields = ("id", "name", "provinsi", "kota", "alamat", "hunian","bujur_x", "lintang_y")
        geo_field = "geom"
        model = rumah_khusus