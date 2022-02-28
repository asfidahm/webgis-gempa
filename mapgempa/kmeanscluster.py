from sklearn.cluster import KMeans
from .models import gempa
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def run():
    qs = gempa.objects.order_by('id')
    q = qs.values('magnitude', 'jumlahinf')
    data = pd.DataFrame.from_records(q)

    data_x = data.iloc[:, 0:2]
    data_x.head()
    x_array = np.array(data_x)

    kmeans = KMeans(n_clusters=3)
    kmeans.fit(x_array)
    data['kluster'] = kmeans.labels_

    data.to_csv('cluster_output2.csv')

    centroids = kmeans.cluster_centers_

    kluster = ['Kluster 1', 'Kluster 2', 'Kluster 3']
    output = plt.scatter(x_array[:, 1], x_array[:, 0], s=100, c=data.kluster, marker='o', alpha=1, )
    plt.xlabel('Infrastruktur Terdampak')
    plt.ylabel('Magnitude Gempa')

    centers = kmeans.cluster_centers_
    plt.scatter(centers[:, 1], centers[:, 0], c='red', s=200, alpha=1, marker='o',)
    
    plt.legend(handles = output.legend_elements()[0], labels=kluster)

    plt.savefig('cluster_figure2.png')

    i = 0
    for elem in qs:
        elem.cluster = data.T[i]['kluster']
        elem.save()
        i+=1