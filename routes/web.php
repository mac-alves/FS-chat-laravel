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

/* retorna os dados do usuarios logado */
Route::get('/user', function(){
    return response()->json(auth()->user(), 200);
});

// retorna a pagina principal do sistema
Route::get('/', 'ContactController@viewIndex');

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

Route::prefix('messages')->group(function(){
    //retorna as msg do chat passado
    Route::get('/', 'MessageController@show');

    //rota de criaçõ da msg
    Route::post('/', 'MessageController@store');

    // apaga uma msg
    Route::delete('/', 'MessageController@destroy');

    // apaga todas as msg do chat privado
    Route::delete('/all', 'MessageController@destroyAll');
});

