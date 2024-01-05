from rest_framework import serializers

from .models import Page
from websites.models import Website


class PagesSerializer(serializers.ModelSerializer):
    website_title = serializers.SerializerMethodField()
    website_slug = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = (
            'id',
            'title',
            'slug',
            'body',
            'is_index',
            'website_title',
            'website_slug',
            'website_id',
        )

    def get_website_title(self, obj):
        return Website.objects.values('title').filter(id=obj.website_id).first()['title']

    def get_website_slug(self, obj):
        return Website.objects.values('slug').filter(id=obj.website_id).first()['slug']


class PageSerializer(serializers.ModelSerializer):
    website = serializers.SerializerMethodField()
    menu = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = (
            'id',
            'title',
            'slug',
            'body',
            'is_index',
            'website',
            'menu'
        )

    def get_website(self, obj):
        website = Website.objects.values(
            'id', 'slug', 'title', 'subtitle', 'bgcolor', 'txtcolor').filter(id=obj.website_id).first()

        return website

    def get_menu(self, obj):
        pages = Page.objects.values(
            'id', 'title', 'slug').filter(website_id=obj.website_id).all()

        return pages

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.body = validated_data.get('body', instance.body)
        instance.is_index = validated_data.get('is_index', instance.is_index)

        instance.save()
        return instance
