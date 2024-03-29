﻿# WebGIS Gempa
 
 WebGIS Bangunan Infrastruktur Berpotensi Terdampak Kejadian Gempa yang dibuat dengan Geodjango Web Framework.

## Prerequisites

GeoDjango installation requires:

1. Python and Django

2. installing PostGIS and create new db with postgis extension

        $ sudo apt install postgis postgresql-postgis
        $ sudo -u postgres -i
        $ createdb  <db name>
        $ psql <db name>
        > CREATE EXTENSION postgis;

3. installing Geospatial Library
        
    for Ubuntu you can use UbuntuGIS and follow this step:

        $ sudo add-apt-repository ppa:ubuntugis/ppa
        $ sudo apt-get update
        $ sudo apt-get install binutils libproj-dev gdal-bin
        $ sudo sh -c "echo '/usr/local/lib' >> /etc/ld.so.conf"
        $ sudo ldconfig

    (for easier installation please refer to https://docs.djangoproject.com/en/4.0/ref/contrib/gis/install/)


## Getting Started

1. First clone the repository from Github and switch to the new directory:

        $ git clone https://github.com/asfidahm/webgis-infrastruktur.git
        $ cd webgis-infrastruktur

2. Make new virtualenv and install all python required package

        $ python3 -m venv env
        $ pip install -r requirements.txt

3. Open webgempa/settings.py and search for:
        
        DATABASES = {
            'default': {
                "ENGINE": "django.contrib.gis.db.backends.postgis",
                "HOST": <host>,
                "NAME": <dbname>,
                "PASSWORD": <password>,
                "PORT": <port>,
                "USER": <username>,
            }
        }

    change and set your db connection

4. Migrate database

        $ python3 manage.py migrate



