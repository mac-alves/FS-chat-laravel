@extends('layouts.app')

@section('content')
    <example-component user-id="{{\Auth::user()->id}}" msgs="{{$msgs}}"/>
@endsection
