<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Contact;
use \App\User;

class ContactController extends Controller
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
        $user_auth = auth()->user()->id;
        $contact = $this->contact->where('user_id', $user_auth)
                                 ->with('userContact')
                                 ->get();

        // $contact = $this->contact->where('user_id', $user_auth)->get();

        return response()->json($contact, 200);
    }

    /**
     * add a contact for the user
     */
    public function store(Request $request)
    {
        $contact_id = ($request->has('contact_id') && $request->input('contact_id')) ? $request->input('contact_id') : null;
        $user_auth = auth()->user()->id;

        if ($user_auth == $contact_id) {
            return response()->json([
                'error' => 'Chat consigo mesmo ainda não é um recurso disponivel.'
            ], 401);
        }

        $contact = $this->contact->firstOrCreate([
            'user_id' => auth()->user()->id,
            'contact_user_id' => $contact_id
        ]);

        return response()->json([
            'msg' => 'Contato adicionado com sucesso'
        ], 201);
    }

    /**
     * add a contact for the user
     */
    public function destroy(Request $request, $id)
    {
        $user_auth = auth()->user()->id;
        $contact = $this->contact->where('user_id', $user_auth)
                                 ->findOrFail($id);

        $contact->menssages()->delete();
        $contact->delete();

        return response()->json([
            'msg' => 'Contato deletado'
        ], 200);
    }
}
