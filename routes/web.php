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

// retorna a principla do sistema
Route::get('/', 'PrivateChatController@viewIndex');

Route::prefix('privatechats')->group(function(){
    //pesquisa qualquer contato do sistema
    Route::get('/', 'PrivateChatController@index');

    //retorna os contatos do usuario logado
    Route::get('/show', 'PrivateChatController@show');

    //cria um novo contato
    Route::post('/', 'PrivateChatController@store');

    // deleta um contato do usuario logado
    Route::delete('/{id}', 'PrivateChatController@destroy');
});

Route::prefix('messages')->group(function(){
    //retorna as msg do chat passado
    Route::get('/', 'MessageController@show');

    //rota de criaçõ da msg
    Route::post('/', 'MessageController@store');
});

// Route::get('/nada', function(Request $request){
//     $contact = count(auth()->user()->contacts()->where('hash_chat', 'fRlYzF1SSrTEsZ')->get()) > 0;

//     return response()->json($contact, 200);
// });

