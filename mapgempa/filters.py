import django_filters
from .models import gempa

class GempaFilter(django_filters.FilterSet):

    class Meta:
        model = gempa
        fields = [
            'magnitude',
            'cluster',
            'datetime',
        ]