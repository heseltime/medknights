from django.shortcuts import render, redirect

from django.contrib.auth import (
    authenticate,
    get_user_model,
    login,
    logout
)

from .forms import UserLoginForm, CreateUserForm

from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth.hashers import make_password

from django.contrib import messages

def login_view(request):
    if request.user.is_authenticated:
        return redirect('/app')
    else:
        next = request.GET.get('next')
        form = UserLoginForm(request.POST or None)

        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)

            login(request, user)

            if next:
                return redirect(next)

            return redirect('/app')

        context = {
            'form': form,
        }

        return render(request, "accounts/login.html", context)


def logout_view(request):

    logout(request)

    return redirect('/')


def register(request):
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)

        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, 'medKnight Account Angelegt! Bitte mit User ' + user + ' einloggen')
            return redirect('/accounts/login')

    context = {
        'form': form,
    }

    return render(request, "storefront.html", context)
