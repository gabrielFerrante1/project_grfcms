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
        success = False
        errors = {}

        if not name or name == '':
            errors['name'] = ['Este campo é obrigatório']
        if not email or email == '':
            errors['email'] = ['Este campo é obrigatório']
        if not password or password == '':
            errors['password'] = ['Este campo é obrigatório']

        if len(errors.keys()) > 0:
            return errors
        
        if User.objects.filter(email=email).exists():
            errors['email'] = ['Este email já existe na plataforma']
 
            return errors

        password = make_password(password)

        success = True
        User.objects.create(
            name=name,
            email=email,
            password=password
        )

        if not success:
            return errors

        return True