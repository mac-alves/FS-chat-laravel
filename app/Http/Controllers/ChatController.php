<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Events\SendMessage;
use \App\Contact;
use \App\Message;
use \App\User;

class ChatController extends Controller
{
    private $contact;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Contact $contact)
    {
        $this->middleware('auth');
        $this->contact = $contact;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(){
        return view('main');
    }

    /**
     * get chat information with a contact
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show(Request $request) {

        $contact_id = ($request->has('contact_id') && $request->input('contact_id')) ? $request->input('contact_id') : null;

        $userId = auth()->user()->id;

        $info = $this->contact->where('user_id', $userId)
                              ->with('menssages')
                              ->findOrFail($contact_id);

        return response()->json($info, 200);
    }
}
