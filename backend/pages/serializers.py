from rest_framework import serializers

from .models import Page
from websites.models import Website


class PagesSerializer(serializers.ModelSerializer):
    website_title = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = (
            'id',
            'title',
            'slug',
            'is_index',
            'website_title',
        )

    def get_website_title(self, obj):
        return Website.objects.values('title').filter(id=obj.website_id).first()['title']


class PageSerializer(serializers.ModelSerializer):
    website_id = serializers.ReadOnlyField()

    class Meta:
        model = Page
        fields = (
            'id',
            'title',
            'slug',
            'body',
            'is_index',
            'website_id',
        )

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.body = validated_data.get('body', instance.body)
        instance.is_index = validated_data.get('is_index', instance.is_index) 

        instance.save()
        return instance
