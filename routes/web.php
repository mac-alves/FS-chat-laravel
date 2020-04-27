<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

/* Route::get('/home', 'HomeController@index')->name('home');

//visualizo as msgs
Route::get('/', 'MessageController@index');

Route::prefix('messages')->group(function(){
    //formulario de criação da msg
    Route::get('/', 'MessageController@viewMessages');

    //rota de criaçõ da msg
    Route::post('/', 'MessageController@createMessages');
}); */


Route::get('/', 'ChatController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
