@extends('layouts.app')

@section('content')

    <form method="post" accept-charset="utf-8" class="container">
        {{ csrf_field() }}
        <input type="text" name="title" placeholder="Titulo" class="form-control">
        <textarea name="body" class="form-control" placeholder="Menssagem"></textarea>
        <input type="submit" value="Salvar" class="btn btn-primary">
    </form>

@endsection
