<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Events\SendMessage;
use \App\PrivateChat;
use \App\Message;
use \App\User;

class MessageController extends Controller
{
    private $message;
    private $privateChat;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Message $message, PrivateChat $privateChat)
    {
        $this->middleware('auth');
        $this->message = $message;
        $this->privateChat = $privateChat;
    }

    public function store(Request $request)
    {
        // verificar se o usuario logado popssui esse chat
        $privateChat = $this->privateChat->where('user_id_one', auth()->user()->id)
                                         ->where('user_id_two', $request->input('to_user_id'))
                                         ->where('hash_chat', $request->input('in_hash_chat'))
                                         ->firstOrFail();

        $data = [
            'body' => $request->input('body'),
            'from_user_id' => $privateChat->user_id_one,
            'to_user_id' => $privateChat->user_id_two,
            'in_hash_chat' => $privateChat->hash_chat
        ];

        $msg  = $this->message->create($data);

        broadcast(new SendMessage($msg, $privateChat));
        return response()->json($msg, 200);
    }

    public function show(Request $request)
    {
        // verificar se o usuario logado popssui esse chat com o hash
        $privateChat = $this->privateChat->where('user_id_one', auth()->user()->id)
                                         ->where('hash_chat', $request->input('hash_chat'))
                                         ->firstOrFail();

        return response()->json($privateChat->menssages, 200);
    }

}
