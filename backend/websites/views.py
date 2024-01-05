from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status

from websites import models
from websites.serializers import WebsitesSerializer, WebsiteSerializer

from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class Websites(APIView):
    paginator = PageNumberPagination()

    def get(self, request):
        queryset = models.Website.objects.all()
        paginate_queryset = self.paginator.paginate_queryset(queryset, request)

        serializer = WebsitesSerializer(paginate_queryset, many=True)
        data = self.paginator.get_paginated_response(serializer.data).data

        return Response(data)

    def post(self, request):
        ip = request.META['REMOTE_ADDR']

        serializer = WebsiteSerializer(data=request.data, context={'ip': ip})
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Website(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self, website_slug):
        website = models.Website.objects.filter(slug=website_slug).first()

        if not website:
            raise Http404()

        return website

    def get(self, request, website_slug):
        website = models.Website.objects.filter(slug=website_slug).first()
        ip = request.META['REMOTE_ADDR']

        if not website:
            raise Http404()

        serializer = WebsiteSerializer(website, context={'ip': ip})
        return Response({"website": serializer.data})

    def put(self, request, website_slug):
        website = self.get_queryset(website_slug)
        data = request.data
        ip = request.META['REMOTE_ADDR']

        serializer = WebsiteSerializer(
            website, data=data, partial=True,  context={'ip': ip})

        if serializer.is_valid():
            serializer.update(instance=website, validated_data=data)

            serializer = WebsiteSerializer(website, context={'ip': ip})
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, website_slug):
        website = self.get_queryset(website_slug)
        website.delete()

        return Response({"success": True}, status=status.HTTP_200_OK)
