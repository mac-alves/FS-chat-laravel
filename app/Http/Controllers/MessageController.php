<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Message;
use \App\User;

class MessageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Message $msg)
    {

        $userId = \Auth::user()->id;
        $msgs = $msg->where('to_user_id', $userId)->get();
        $mensages = [
            'msgs' => $msgs
        ];

        return view('welcome', $mensages);
    }

    public function viewMessages()
    {
        return view('message');
    }

    public function createMessages(Request $request, Message $message, User $user)
    {
        $data = $request->all();
        $msg  = $message->create($data);
        $userMsg = $user->findOrFail($msg->to_user_id);

        broadcast(new \App\Events\SendMessage($msg, $userMsg));
        return redirect('/messages');
    }
}
