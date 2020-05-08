<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Events\SendMessage;
use \App\Message;
use \App\Contact;
use \App\User;

class MessageController extends Controller
{
    private $message;
    private $contact;
    private $user;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Message $message, User $user, Contact $contact)
    {
        $this->middleware('auth');
        $this->message = $message;
        $this->user = $user;
        $this->contact = $contact;
    }

    public function store(Request $request)
    {
        $contact = $this->contact->where('user_id', auth()->user()->id)
                              ->where('contact_user_id', $request->input('contact_user_id'))
                              ->firstOrFail();

        if (is_object($contact) && $contact->contactUser->telephone === $request->input('telephone')) {

            $data = [
                'body' => $request->input('body'),
                'from_user' => auth()->user()->telephone,
                'to_user' => $contact->contactUser->telephone,
            ];

            $msg  = $this->message->create($data);

            broadcast(new SendMessage($msg, $contact->contactUser));
            return response()->json($msg, 200);
        }

        return response()->json(['erro' => 'inserção não autorizada.'], 401);
    }

    public function show(Request $request)
    {
        // verificar se o usuario logado possui esse contato
        $userAuth = auth()->user();
        $contact = $this->contact->where('user_id', $userAuth->id)
                                 ->where('contact_user_id', $request->input('contact_user_id'))
                                 ->firstOrFail();

        if (is_object($contact)) {
            $telAuth = $userAuth->telephone; // $userAuth->telephone; //wYx1P0sklNyy40
            $telCont = $contact->contactUser->telephone; //g8WIU22xJYVchX ozKfyPkeMQTd7p  $value->contactUser->telephone;

            $menssage = $this->message->where([['from_user', '=', $telAuth]])
                                      ->where([['to_user', '=', $telCont]])
                                      ->orWhere([['from_user', '=', $telCont]])
                                      ->where([['to_user', '=', $telAuth]])
                                      ->orderBy('created_at','desc')->get();

            return response()->json($menssage, 200);
        }

        return response()->json(['erro' => 'Não autorizado.'], 401);
    }

    public function destroy(Request $request)
    {
        // verificar se o usuario logado foi quem escreveu a msg
        $userAuth = auth()->user();
        $message = $this->message->where('from_user', $userAuth->telephone)
                                 ->findOrFail($request->input('id_msg'));
        $message->delete();

        return response()->json(201);
    }

    public function destroyAll(Request $request)
    {
        // verificar se o usuario pode deletar
        $userAuth = auth()->user();
        $contact = $this->contact->where('user_id', $userAuth->id)
                                 ->where('contact_user_id', $request->input('contact_user_id'))
                                 ->firstOrFail();

        if (is_object($contact)) {
            $telAuth = $userAuth->telephone; // $userAuth->telephone; //wYx1P0sklNyy40
            $telCont = $contact->contactUser->telephone; //g8WIU22xJYVchX ozKfyPkeMQTd7p  $value->contactUser->telephone;

            $menssage = $this->message->where([['from_user', '=', $telAuth]])
                                      ->where([['to_user', '=', $telCont]])
                                      ->orWhere([['from_user', '=', $telCont]])
                                      ->where([['to_user', '=', $telAuth]])
                                      ->delete();

            return response()->json(201);
        }

        return response()->json([ 'erro' => 'Não autorizado.' ], 401);
    }

}
