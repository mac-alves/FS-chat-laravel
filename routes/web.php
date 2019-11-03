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

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('/send', function(){
//    broadcast(new \App\Events\SendMessage);
//    return 'done';
//});

Route::middleware(['auth'])->group(function(){
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/messages', function(){
        return view('message');
    });

    Route::post('/messages', function(){
        $data = request()->all();
        $message = \App\Message::create($data);
        $user = \App\User::findOrFail($message->to_user_id);

        broadcast(new \App\Events\SendMessage($message, $user));
        return redirect('/messages');
    });
});

