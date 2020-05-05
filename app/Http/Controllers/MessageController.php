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
        // usuario 1 enviando para o usuario 2
        $privateChat = $this->privateChat->where('hash_chat', $request->input('in_hash_chat'))->firstOrFail();

        if (((int) $privateChat->user_id_one === (int) auth()->user()->id) ||
            ((int) $privateChat->user_id_two === (int) auth()->user()->id)) {

            $data = [
                'body' => $request->input('body'),
                'from_user_id' => auth()->user()->id,
                'to_user_id' => $request->input('to_user_id'),
                'in_hash_chat' => $privateChat->hash_chat
            ];

            $msg  = $this->message->create($data);

            broadcast(new SendMessage($msg, $privateChat));
            return response()->json($msg, 200);
        }

        return response()->json(['erro' => 'inserção não autorizada.'], 401);
    }

    public function show(Request $request)
    {
        // verificar se o usuario logado popssui esse chat com o hash
        $privateChat = $this->privateChat->where('hash_chat', $request->input('hash_chat'))->firstOrFail();

        if (((int) $privateChat->user_id_one === (int) auth()->user()->id) ||
            ((int) $privateChat->user_id_two === (int) auth()->user()->id)) {

            return response()->json($privateChat->menssages, 200);
        }

        return response()->json(['erro' => 'Não autorizada.'], 401);
    }

    public function destroy(Request $request)
    {
        // verificar se o usuario logado popssui esse chat com o hash
        $message = $this->message->where('in_hash_chat', $request->input('in_hash_chat'))
                                 ->findOrFail($request->input('id_msg'));
        $message->delete();

        return response()->json(201);
    }

    public function destroyAll(Request $request)
    {
        // verificar se o usuario logado popssui esse chat com o hash
        $messages = $this->message->where('in_hash_chat', $request->input('in_hash_chat'))->get();

        if (count($messages) > 0) {
            $this->message->where('in_hash_chat', $request->input('in_hash_chat'))->delete();
            return response()->json(201);
        }

        return response()->json([ 'erro' => 'Não encontrado mensagens para esse hash.' ], 401);
    }

}
