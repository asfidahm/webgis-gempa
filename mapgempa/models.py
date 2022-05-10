from django.contrib.gis.db import models

# Create your models here.
class gempa(models.Model):
    
    name = models.CharField(max_length=255)
    magnitude = models.FloatField()
    depth = models.FloatField(null=True)
    timetemp = models.CharField(max_length=25, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)
    datetime = models.DateTimeField(null=True)
    estimasiradius = models.FloatField(null=True)
    jumlahinf = models.IntegerField(null=True)
    normal_mag = models.FloatField(null=True)
    normal_inf = models.FloatField(null=True)
    cluster = models.IntegerField(null=True)

    geom = models.PointField()

    def __str__(self):
        return self.name

class jembatan_nasional(models.Model):
    
    name = models.CharField(max_length=255)
    kode_jembatan = models.CharField(max_length=255, null=True)
    panjang = models.FloatField(null=True)
    lebar = models.FloatField(null=True)
    nomor_jembatan = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class bendungan(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    balai = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class tpa(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class spam(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class iplt(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class ipal(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class rusunawa(models.Model):
    
    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    alamat = models.CharField(max_length=255, null=True)
    hunian = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class rumah_khusus(models.Model):

    name = models.CharField(max_length=255)
    provinsi = models.CharField(max_length=255, null=True)
    kota = models.CharField(max_length=255, null=True)
    alamat = models.CharField(max_length=255, null=True)
    hunian = models.CharField(max_length=255, null=True)
    bujur_x = models.FloatField(null=True)
    lintang_y = models.FloatField(null=True)

    geom = models.PointField()

    def __str__(self):
        """Return string representation."""
        return self.name

class kluster(models.Model):
    
    name = models.CharField(max_length=255)
    mag_centroid = models.FloatField()
    inf_centroid = models.FloatField()
    jumlah = models.IntegerField()
    warna = models.CharField(max_length=10)

    def __str__(self):
        """Return string representation."""
        return self.name