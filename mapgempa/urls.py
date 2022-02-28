from django.urls import path
from mapgempa.views import GempaTahunanView, GempaView, IndexView, gempawithid, gempaall, id_jembatan, id_bendungan, id_tpa

app_name = "gempa"

urlpatterns = [
    path("", GempaView.as_view()),
    path("gempa2021/", GempaTahunanView.as_view()),
    path("api/gempa/", gempaall),
    path("api/gempa/<int:pk>", gempawithid),
    path("api/jembatan/<int:pk>", id_jembatan),
    path("api/bendungan/<int:pk>", id_bendungan),
    path("api/tpa/<int:pk>", id_tpa),
]