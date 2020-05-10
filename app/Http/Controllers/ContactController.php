<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use \App\Events\SendMessage;
use \App\Contact;
use \App\Message;
use \App\User;

class ContactController extends Controller
{
    private $contact;
    private $message;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Message $message, Contact $contact)
    {
        $this->middleware('auth');
        $this->contact = $contact;
        $this->message = $message;
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
        $userAuth = auth()->user();
        $contacts = $this->contact->where('user_id', $userAuth->id)
                                  ->with('contactUser')
                                  ->get();
        $data = [];
        if (count($contacts) > 0) {
            foreach ($contacts as $key => $value) {

                $telAuth = $userAuth->telephone;
                $telCont = $value->contactUser->telephone;

                $menssage = $this->message->where([['from_user', '=', $telAuth]])
                                          ->where([['to_user', '=', $telCont]])
                                          ->orWhere([['from_user', '=', $telCont]])
                                          ->where([['to_user', '=', $telAuth]])
                                          ->orderBy('created_at','desc')->first();

                $value->contactUser['last_message'] = $menssage;
                $data[] = $value->contactUser;
            }
        }

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $inversoCreateContact = $request->input('inverse');

        $userAuth = auth()->user();
        $telContact = ($request->has('tel_contact') && $request->input('tel_contact')) ? $request->input('tel_contact') : null;
        $bodyMsg = ($request->has('body') && $request->input('body')) ? $request->input('body') : null;

        $contUser = User::where('telephone', $telContact)->firstOrFail();

        $contact = $this->contact->firstOrCreate([
            'user_id' => $userAuth->id,
            'contact_user_id' => $contUser->id
        ]);

        if (is_null($inversoCreateContact)) {
            $message = $this->message->create([
                'body' => $bodyMsg,
                'from_user' => $userAuth->telephone,
                'to_user' => $contact->contactUser->telephone
            ]);

            broadcast(new SendMessage($message, $contact->contactUser));

        } else {
            $message = $this->message->where('from_user', $contact->contactUser->telephone)
                                     ->where('to_user', $userAuth->telephone)->firstOrFail();
        }

        return response()->json([
            'msg' => 'Contato adicionado com sucesso',
            'info' => [
                'contact' => $contact->contactUser,
                'last_message' => $message
            ]
        ], 201);
    }

    /**
     * destroy a contact for the user
     */
    public function destroy(Request $request, $id)
    {
        $userAuth = auth()->user();
        $contact = $this->contact->where('user_id', $userAuth->id)
                                 ->where('contact_user_id', $id)
                                 ->firstOrFail();

        $contact->delete();

        return response()->json([
            'msg' => 'Contato deletado'
        ], 200);
    }
}
