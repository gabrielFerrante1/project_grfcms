from rest_framework import serializers

from pages.models import Page
from pages.serializers import PageSerializer

from .models import Website
from historys.models import History

from datetime import datetime

class WebsitesSerializer(serializers.ModelSerializer):
    count_views = serializers.SerializerMethodField()

    class Meta:
        model = Website
        fields = ('id', 'title',
                  'subtitle', 'slug', 'bgcolor', 'txtcolor', 'count_views')

    def get_count_views(self, obj) -> int:
        return History.objects.filter(website_id=obj.id).count()


class WebsiteSerializer(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField()
    authorized = serializers.SerializerMethodField()
    index_page = serializers.SerializerMethodField()

    class Meta:
        model = Website
        user_id = serializers.ReadOnlyField(source="user_id")
        fields = (
            'id',
            'title',
            'subtitle',
            'bgcolor',
            'txtcolor',
            'slug',
            'menu',
            'authorized',
            'index_page',
            'user_id'
        )

    def get_authorized(self, obj):
        history = History.objects.filter(
            ip=self.context.get('ip'),
            website_id=obj.id
        ).first()

        if history:
            if history.banned == False:
                History.objects.filter(
                    ip=self.context.get('ip'),
                    website_id=obj.id
                ).update(date=datetime.now())
            else:
                return False
        else:
            history = History.objects.create(
                ip=self.context.get('ip'),
                website_id=obj.id
            )

        return True
    
    def get_index_page(self, obj):
        page = Page.objects.filter(website_id=obj.id, is_index=True).last()
        
        if not page: return None

        serializer = PageSerializer(page)

        return serializer.data

    def get_menu(self, obj):
        pages = Page.objects.values(
            'id', 'title', 'slug').filter(website_id=obj.id).all()

        return pages

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.subtitle = validated_data.get('subtitle', instance.subtitle)
        instance.bgcolor = validated_data.get('bgcolor', instance.bgcolor)
        instance.txtcolor = validated_data.get('txtcolor', instance.txtcolor)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.save()
        return instance
