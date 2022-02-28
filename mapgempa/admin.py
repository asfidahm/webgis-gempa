from django.contrib.gis import admin

# Register your models here.
from mapgempa.models import gempa, jembatan_nasional, bendungan, tpa, spam, iplt, ipal, rusunawa, rumah_khusus

@admin.register(gempa)
class gempaAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "magnitude")

@admin.register(jembatan_nasional)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kode_jembatan")

@admin.register(bendungan)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(tpa)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(spam)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(iplt)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(ipal)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(rusunawa)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

@admin.register(rumah_khusus)
class InfAdmin(admin.OSMGeoAdmin):
    list_display = ("name", "kota")

# @admin.register(inf_point)
# class InfAdmin(admin.OSMGeoAdmin):
#     list_display = ("name", "no_telp")

# @admin.register(inf_line)
# class InfLineAdmin(admin.OSMGeoAdmin):
#     list_display = ("name", "no_telp")