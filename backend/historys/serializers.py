from rest_framework import serializers

from .models import History

class HistorysSerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = (
            'id',
            'ip',
            'banned',
            'date',
        )


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = (
            'id',
            'ip',
            'website_id',
            'banned',
            'date',
        )
