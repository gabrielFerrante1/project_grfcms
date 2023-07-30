from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User

from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from accounts.auth import Authentication
from rest_framework import status

class AccountLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = Authentication.signin(self, email=email, password=password)
        refresh = RefreshToken.for_user(user)

        return Response({
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            },
            "refresh": str(refresh),
            "access": str(refresh.access_token) 
        })


class AccountCreate(APIView):
    def post(self, request):
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        signup_user = Authentication.signup(self, name=name, email=email, password=password)

        if signup_user == True:
            return Response({"success": True}, status=status.HTTP_201_CREATED)
        else:
            return Response(signup_user, status=status.HTTP_400_BAD_REQUEST)