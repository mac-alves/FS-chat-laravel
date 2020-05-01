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

// Route::get('/home', 'HomeController@index')->name('home');

//visualizo as msgs
Route::get('/messages', 'MessageController@index');

// Route::prefix('messages')->group(function(){
//     //formulario de criação da msg
//     Route::get('/', 'MessageController@viewMessages');

//     //rota de criaçõ da msg
//     Route::post('/', 'MessageController@createMessages');
// });


Route::get('/', 'ChatController@index');

Route::prefix('contacts')->group(function(){
    //pesquisa qualquer contato do sistema
    Route::get('/', 'ContactController@index');

    //retorna os contatos do usuario logado
    Route::get('/show', 'ContactController@show');

    //cria um novo contato
    Route::post('/', 'ContactController@store');

    // deleta um contato do usuario logado
    Route::delete('/{id}', 'ContactController@destroy');
});



Route::get('/nada', function(Request $request){
    $contact = \App\User::all();
    return response()->json($contact, 200);
});

