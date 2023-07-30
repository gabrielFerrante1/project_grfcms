from rest_framework import serializers

from .models import Website
from historys.models import History


class WebsitesSerializer(serializers.ModelSerializer):
    count_views = serializers.SerializerMethodField()

    class Meta:
        model = Website
        fields = ('id', 'title', 'count_views', )

    def get_count_views(self, obj) -> int:
        return History.objects.filter(website_id=obj.id).count()


class WebsiteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Website
        user_id = serializers.ReadOnlyField(source="user_id")
        fields = (
            'title',
            'subtitle',
            'bgcolor',
            'txtcolor',
            'slug',
            'user_id'
        )

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.subtitle = validated_data.get('subtitle', instance.subtitle)
        instance.bgcolor = validated_data.get('bgcolor', instance.bgcolor)
        instance.txtcolor = validated_data.get('txtcolor', instance.txtcolor)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.save()
        return instance
