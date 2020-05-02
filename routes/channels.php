<?php

use \App\PrivateChat;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('message.received.{hash}', function ($user, $hash) {
    $regis = PrivateChat::where('hash_chat', $hash)->get();

    return count($regis) > 0;
    // return true;
});
