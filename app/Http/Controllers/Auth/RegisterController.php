<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'at_sign' => $this->genereteAtSing($data['email']),
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /*
     * gera o @ unico do usuario
     * */
    private function genereteAtSing($email) {
        $arr = explode(".", explode("@", $email)[0]);

        $at_sign = '@';

        if (count($arr) > 1) {
            foreach ($arr as $value) {
                $at_sign = $at_sign."".$value;
            }
        } else {
            $at_sign = $at_sign."".$arr[0];
        }

        return $this->verifyAtSingExist($at_sign);
    }

    /*
     * retorno um @ unico
     * */
    private function verifyAtSingExist($at_sign) {
        $user = User::where('at_sign', '=', $at_sign)->get();

        if (count($user) > 0) {
            $at_sign = $at_sign."".rand(100,1000);
            verifyAtSingExist($at_sign);
        } else {
            return $at_sign;
        }
    }
}
