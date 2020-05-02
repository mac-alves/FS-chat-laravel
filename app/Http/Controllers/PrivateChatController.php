<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use \App\PrivateChat;
use \App\User;

class PrivateChatController extends Controller
{
    private $privateChat;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(PrivateChat $privateChat)
    {
        $this->middleware('auth');
        $this->privateChat = $privateChat;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function viewIndex(){
        return view('main');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $at_sign = ($request->has('at_sign') && $request->input('at_sign')) ? [['at_sign', 'like', $request->input('at_sign').'%']] : [];
        $contact = User::where($at_sign)->get();

        return response()->json($contact, 200);
    }

    /**
     * get the user's contacts.
     */
    public function show(Request $request)
    {
        $user_id_one = auth()->user()->id;
        $privateChat = $this->privateChat->where('user_id_one', $user_id_one)
                                         ->with('userTwo')
                                         ->get();

        return response()->json($privateChat, 200);
    }

    /**
     * add a contact for the user   'user_id_one', 'user_id_two', 'hash_chat'
     */
    public function store(Request $request)
    {
        $user_id_one = auth()->user()->id;
        $user_id_two = ($request->has('user_id_two') && $request->input('user_id_two')) ? $request->input('user_id_two') : null;

        if ($user_id_one == $user_id_two) {
            return response()->json([
                'error' => 'Chat consigo mesmo ainda não é um recurso disponivel.'
            ], 401);
        }

        /* verificar depois como diminuir para apenas uma requisicao */

        /* verifica se ha instacia de chat para esses dois usuarios */
        $hash_chat = $this->privateChat->where('user_id_one', $user_id_two)
                                       ->where('user_id_two', $user_id_one)
                                       ->first();

        /* verifica se esse chat ja existe */
        $privateChat = $this->privateChat->where('user_id_one', $user_id_one)
                                         ->where('user_id_two', $user_id_two)
                                         ->with('userTwo')
                                         ->first();
        /* --------------------------------------------------------- */
        $msg = 'Chat adicionado com sucesso';

        if (is_null($privateChat)) {

            if (is_null($hash_chat)) {
                $hash = Str::random(15);

            } else {
                $hash = $hash_chat->hash_chat;
            }

            $privateChat = $this->privateChat->firstOrCreate([
                'user_id_one' => $user_id_one,
                'user_id_two' => $user_id_two,
                'hash_chat' => $hash
            ]);

            $privateChat['user_two'] = $privateChat->userTwo;

        } else {
            $msg = 'Chat ja existe para esse usuario';
        }
// dd($privateChat->menssages);
        return response()->json([
            'msg' => $msg,
            'info' => $privateChat
        ], 201);
    }

    /**
     * destroy a chat for the user
     */
    public function destroy(Request $request, $id)
    {
        $user_id_one = auth()->user()->id;
        $privateChat = $this->privateChat->where('user_id_one', $user_id_one)
                                         ->findOrFail($id);

        // $contact->menssages()->delete();
        $privateChat->delete();

        return response()->json([
            'msg' => 'Chat deletado'
        ], 200);
    }
}
