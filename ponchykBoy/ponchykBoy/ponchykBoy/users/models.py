import phonenumbers  
from django.utils.deconstruct import deconstructible

from django.db import models
from django.core import validators
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager


# @deconstructible
# class PhoneValidator:

#     message = ("Enter a valid phone number.")
#     code = "invalid"

#     def __call__(self, value):
#         print(value)
#         try:
#             z = phonenumbers.parse(value, 'UA')
        
#         except phonenumbers.phonenumberutil.NumberParseException as e:
#             raise ValidationError(self.message, code=self.code, params={"value": value})

#         # if not phonenumbers.is_valid_number(z):
#         #     raise ValidationError(self.message, code=self.code, params={"value": value})



class CustomUserManager(BaseUserManager):
    # use_in_migrations = True

    def _create_user(self, username, email, phone_number, password, **extra_fields):

        if not username:
            raise ValueError("The given username must be set")
        
        if not email:
            raise ValueError("The given email must be set")
        

        if not phone_number:
            raise ValueError("The given phone_number must be set")

        # z = phonenumbers.parse(phone_number, None)

        # if not phonenumbers.is_valid_number(z):
        #     return JsonResponse({"error": "The given phone_number is not valid"}, status=400)

        # return JsonResponse({"error": "The given phone_number is not valid"}, status=400)

        
        user = self.model(
            username = username, 
            email = self.normalize_email(email),
            phone_number = phone_number,
            **extra_fields

        )

        user.password = make_password(password)

        return user
   

    def create_user(self, username, email, phone_number, password=None, **extra_fields):
        user = self._create_user(username, email, phone_number, password, **extra_fields)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, username, email, phone_number, password, **extra_fields):
        user = self._create_user(username, email, phone_number, password, **extra_fields)

        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True

        user.save(using=self._db)

        return user

    

class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(unique=True,max_length=100,error_messages={
            "unique": ("A user with that email already exists."),
        },)
    phone_number = models.CharField(max_length=20,unique=True,validators=[])

    username = models.CharField(max_length=255)
    city = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    # is_super_user = models.BooleanField(default=True) 
    is_superuser = models.BooleanField(default=False) 

    profile_img = models.ImageField(blank=True,null=True,upload_to='image')

    objects = CustomUserManager()

    # EMAIL_FIELD = 
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username","phone_number","city"]

