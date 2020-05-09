@extends('layouts.app')

@section('content')
<div id="login" class="container">
    <div class="row content">
        <div class="col-md-6 imgContent">
            <img src="{{ asset('images/wellcome.svg') }}" alt="">
        </div>
        <div class="col-md-6 formContent">
            <div class="formDiv">
                <div class="imgFomDiv">
                    <img src="{{ asset('images/form.svg') }}" alt="">
                </div>

                @error('email')
                    <div class="info">
                        <strong>Email/Senha incorretos.</strong>
                    </div>
                @enderror

                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <input type="email" name="email" id="email" placeholder="E-mail">
                    <input type="password" name="password" id="password" placeholder="password" required>

                    <div class="optionsDiv">
                        <div class="remember">
                            <input type="checkbox" name="remember" id="remember" placeholder="">
                            <label for="remember">Remember Me</label>
                        </div>

                        <a class="link" href="{{ route('password.request') }}">
                            {{ __('Forgot Your Password?') }}
                        </a>
                    </div>

                    <button type="submit" class="btn-form">Login</button>
                </form>

                <div class="createOrLoginDiv">
                    <a class="link" href="{{ route('register') }}">{{ __('Create your account here') }}</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
