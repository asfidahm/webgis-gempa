import os
from sklearn.cluster import KMeans
from mapgempa.models import gempa, kluster
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def inf_cluster():
    # QUERYING EXISTING EARTHQUAKE
    qs = gempa.objects.order_by('id')
    q = qs.values('magnitude', 'jumlahinf')

    # QUERYSET TO PANDAS DATA FRAME
    data = pd.DataFrame.from_records(q)

    # NORMALISASI MAGNITUDO DAN JUMLAH INFRASTRUKTUR BERPOTENSI TERDAMPAK
    normalized_inf = []
    normalized_mag = []
    
    i = 0
    
    for elem in qs:
        normal_mag = (data.magnitude[i]-data.magnitude.min())/(data.magnitude.max()-data.magnitude.min())
        normal_inf = (data.jumlahinf[i]-data.jumlahinf.min())/(data.jumlahinf.max()-data.jumlahinf.min())
        
        elem.normal_mag = normal_mag
        elem.normal_inf = normal_inf

        elem.save()
        normalized_mag.append(normal_mag)
        normalized_inf.append(normal_inf)
        i += 1

    data2 = data.assign(NormalizedMag=normalized_mag)
    data3 = data2.assign(NormalizedInf=normalized_inf)

    # PEMILIHAN KOLOM UNTUK KMEANS
    data_x = data3.iloc[:, [False, False, True, True]]
    x_array = np.array(data_x)

    # ANALISIS KLUSTERING
    kmeans = KMeans(n_clusters=3)
    kmeans.fit(x_array)

    # PENAMBAHAN KOLOM KLUSTER KE DATA
    data3['kluster'] = kmeans.labels_

    # PLOT HASIL KMEANS CLUSTERING
    kluster_class = ['Kluster 0', 'Kluster 1', 'Kluster 2']
    cdict = {0: '#4287f5', 1: '#42f587', 2: '#f54242'}

    fig, ax = plt.subplots()
    for g in np.unique(data3.kluster):
        ix = np.where(data3.kluster == g)
        ax.scatter(x_array[ix, 1], x_array[ix, 0], c = cdict[g], label = g, s = 100)

    ax.legend(kluster_class)

    plt.xlabel('Nilai Normal Infrastruktur Berpotensi Terdampak')
    plt.ylabel('Nilai Normal Magnitudo Gempa')

    centers = kmeans.cluster_centers_
    plt.scatter(centers[:, 1], centers[:, 0], c='black', s=150, alpha=1, marker='o',)
    plt.savefig(os.getcwd() + "/mapgempa/static/assets/img/cluster_figure.png")

    # PENAMBAHAN KLUSTER, CENTROIDS, DAN JUMLAH DATA PADA DB    
    kluster.objects.all().delete()
    unique, counts = np.unique(kmeans.labels_, return_counts=True)
    count = dict(zip(unique, counts))

    n = 0
    for i in kmeans.cluster_centers_:
        kluster_name = "Kluster " + str(n)
        mag_centroids = round(i[0], 5)
        inf_centroids =  round(i[1], 5)
        jumlah = count[n]
        warna = cdict[n]

        ly = kluster.objects.create(name=kluster_name, mag_centroid=mag_centroids, inf_centroid=inf_centroids, jumlah=jumlah, warna=warna)
        ly.save()

        n += 1

    # SAVE HASIL KLUSTER KE DB
    i = 0
    for elem in qs:
        elem.cluster = data3.T[i]['kluster']
        elem.save()
        i+=1
    
    return kmeans.cluster_centers_