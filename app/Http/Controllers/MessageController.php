<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Message;
use \App\User;

class MessageController extends Controller
{
    private $message;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->middleware('auth');
        $this->message = $message;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $userId = auth()->user()->id;
        $msgs = $this->message->where('user_id', $userId)
                              ->where('contact_id', )->get();

        return response()->json($msgs, 200);
        // return view('welcome', $mensages);
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
