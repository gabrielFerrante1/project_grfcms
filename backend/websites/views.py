from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status

from websites import models

from websites.serializers import WebsitesSerializer, WebsiteSerializer

from rest_framework.pagination import PageNumberPagination


class Websites(APIView):
    paginator = PageNumberPagination()

    def get(self, request):
        queryset = models.Website.objects.all()
        paginate_queryset = self.paginator.paginate_queryset(queryset, request)

        serializer = WebsitesSerializer(paginate_queryset, many=True)
        data = self.paginator.get_paginated_response(serializer.data).data

        return Response(data)

    def post(self, request):
        serializer = WebsiteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Website(APIView):
    def get_queryset(self, website_id):
        website = models.Website.objects.filter(id=website_id).first()

        if not website:
            raise Http404()

        return website

    def get(self, request, website_id):
        website = self.get_queryset(website_id)

        serializer = WebsiteSerializer(website)
        return Response(serializer.data)

    def put(self, request, website_id):
        website = self.get_queryset(website_id)
        data = request.data

        serializer = WebsiteSerializer(website, data=data, partial=True)

        if serializer.is_valid():
            serializer.update(instance=website, validated_data=data)

            serializer = WebsiteSerializer(website)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, website_id):
        website = self.get_queryset(website_id)
        website.delete()

        return Response({"id": website_id}, status=status.HTTP_200_OK)
