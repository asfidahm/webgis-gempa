from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import gempa, jembatan_nasional, bendungan, tpa, spam, iplt, ipal, rumah_khusus, rusunawa
from datetime import datetime
from django.contrib.gis.measure import D

def load_data(verbose=True):
    datagempa = {
        'name' : 'place',
        'magnitude' : 'mag',
        'depth' : 'depth',
        'timetemp' : 'time',
        'bujur_x' : 'longitude',
        'lintang_y' : 'latitude',
        'geom': 'POINT',
    }
    jembatan_map = {
        'name' : 'bridge_nam',
        'kode_jembatan' : 'bridge_id',
        'panjang' : 'bridge_len',
        'lebar' : 'bridge_wid',
        'nomor_jembatan' : 'bridge_num',
        'bujur_x' : 'longitude',
        'lintang_y' : 'latitude',
        'geom': 'POINT',
    }
    bendungan_map = {
        'name' : 'nm_inf',
        'provinsi' : 'provinsi',
        'kota' : 'kab',
        'balai' : 'nm_balai',
        'lintang_y' : 'koord_y',
        'bujur_x' : 'koord_x',
        'geom': 'POINT',
    }
    tpa_spam_iplt_ipal_map = {
        'name' : 'namobj',
        'provinsi' : 'provinsi',
        'kota' : 'kab_kot',
        'lintang_y' : 'koord_y',
        'bujur_x' : 'koord_x',
        'geom': 'POINT',
    }
    rusunawa_map = {
        'name' : 'nm_inf',
        'provinsi' : 'provinsi',
        'kota' : 'kabupaten',
        'alamat' : 'almt_rusun',
        'hunian' : 'tgt_hunian',
        'lintang_y' : 'koord_y',
        'bujur_x' : 'koord_x',
        'geom': 'POINT',
    }
    rusus_map = {
        'name' : 'nm_dat_das',
        'provinsi' : 'provinsi',
        'kota' : 'kab_kota',
        'alamat' : 'almt_rusus',
        'hunian' : 'tgt_hunian',
        'lintang_y' : 'koord_y',
        'bujur_x' : 'koord_x',
        'geom': 'POINT',
    }

    gempa_shp = Path(__file__).resolve().parent / 'data' / 'datagempa.shp'
    jembatan_shp = Path(__file__).resolve().parent / 'data' / 'Jembatan40L.shp'
    bedungan_shp = Path(__file__).resolve().parent / 'data' / 'Bendungan.shp'
    tpa_shp = Path(__file__).resolve().parent / 'data' / 'TPA.shp'
    spam_hp = Path(__file__).resolve().parent / 'data' / 'SPAM.shp'
    iplt_shp = Path(__file__).resolve().parent / 'data' / 'IPLT.shp'
    ipal_shp = Path(__file__).resolve().parent / 'data' / 'IPAL.shp'
    rusunawa_shp = Path(__file__).resolve().parent / 'data' / 'Rusunawa.shp'
    rusus_shp = Path(__file__).resolve().parent / 'data' / 'Rumah_khusus.shp'
    
    gm = LayerMapping(gempa, gempa_shp, datagempa)
    gm.save(strict=True, verbose=verbose)
    jm = LayerMapping(jembatan_nasional, jembatan_shp, jembatan_map)
    jm.save(verbose=verbose)
    bn = LayerMapping(bendungan, bedungan_shp, bendungan_map, transform=False)
    bn.save(strict=True, verbose=verbose)
    tp = LayerMapping(tpa, tpa_shp, tpa_spam_iplt_ipal_map, transform=False)
    tp.save(strict=True, verbose=verbose)
    sp = LayerMapping(spam, spam_hp, tpa_spam_iplt_ipal_map, transform=False)
    sp.save(strict=True, verbose=verbose)
    il = LayerMapping(iplt, iplt_shp, tpa_spam_iplt_ipal_map, transform=False)
    il.save(strict=True, verbose=verbose)
    ia = LayerMapping(ipal, ipal_shp, tpa_spam_iplt_ipal_map, transform=False)
    ia.save(strict=True, verbose=verbose)
    rw = LayerMapping(rusunawa, rusunawa_shp, rusunawa_map, transform=False)
    rw.save(strict=True, verbose=verbose)
    rs = LayerMapping(rumah_khusus, rusus_shp, rusus_map, transform=False)
    rs.save(strict=True, verbose=verbose)

def preprocess():
    qs = gempa.objects.order_by('id')

    for elem in qs:
        elem.datetime = datetime.strptime(elem.timetemp, '%Y/%m/%d %H:%M:%S.%f')
        eq = float(elem.magnitude) - 0.614
        elem.estimasiradius = round(1.4*(eq**3))
        jm = jembatan_nasional.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        bn = bendungan.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        tp = tpa.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        sp = spam.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        il = iplt.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        ia = ipal.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        rw = rusunawa.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        rs = rumah_khusus.objects.filter(geom__distance_lt = (elem.geom, D(km=elem.estimasiradius)))
        elem.jumlahinf = len(jm) + len(bn) + len(tp) + len(sp) + len(il) + len(ia) + len(rw) + len(rs)
        elem.save()