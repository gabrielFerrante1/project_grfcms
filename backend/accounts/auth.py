from accounts.models import User
from rest_framework import exceptions
from django.core.signing import Signer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password


class Authentication():
    def signin(self, email=None, password=None):
        exception_auth = exceptions.AuthenticationFailed(
            'Email e/ou senha incorretos')
        try:
            user = User.objects.get(email=email)
            user_password = user.password
            if check_password(password, user_password):
                return user
            else:
                raise exception_auth
        except User.DoesNotExist:
            raise exception_auth

    def signup(self, name, email, password):
        error = ''

        if not name or not email or not password:
            error = 'Envie os campos obrigatórios'

        if error:
            raise exceptions.AuthenticationFailed(error)

        if User.objects.filter(email=email).exists():
            raise exceptions.AuthenticationFailed(
                'Este email já existe na plataforma')

        password = make_password(password)

        User.objects.create(
            name=name,
            email=email,
            password=password
        )

        return True
