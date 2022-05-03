from django.urls import path
from mapgempa.views import KlusterView, GempaView, IndexView, KuesionerView, gempa_filter, gempawithid, gempaall, id_jembatan, id_bendungan, id_tpa, id_ipal, id_iplt, id_spam, id_rusus, id_rusunawa

app_name = "gempa"

urlpatterns = [
    path("", IndexView.as_view()),
    path("infrastruktur-terdampak", GempaView.as_view()),
    path("kluster-gempa/", KlusterView),
    path("datagempa/", gempa_filter),
    path("kuesioner/", KuesionerView.as_view()),
    path("api/gempa/", gempaall),
    path("api/gempa/<int:pk>", gempawithid),
    path("api/jembatan/<int:pk>", id_jembatan),
    path("api/bendungan/<int:pk>", id_bendungan),
    path("api/tpa/<int:pk>", id_tpa),
    path("api/spam/<int:pk>", id_spam),
    path("api/iplt/<int:pk>", id_iplt),
    path("api/ipal/<int:pk>", id_ipal),
    path("api/rusunawa/<int:pk>", id_rusunawa),
    path("api/rusus/<int:pk>", id_rusus),
]