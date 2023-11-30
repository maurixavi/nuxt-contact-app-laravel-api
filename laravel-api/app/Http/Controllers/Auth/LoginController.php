<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Auth\AuthenticationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        /*Log::info('Intento de inicio de sesión', ['input' => $request->all()]);

        $rules = [
            'email' => 'required',
            'password' => 'required|string',
        ];
        $validator = \Validator::make($request->input(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->error()->all()
            ], 400);
        }-------------*/

        //$user = User::where('email', $request->email)->first();

        /*if (!$user) {
            // El usuario no fue encontrado
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized. User not found'],
                'input' => $request->all()
            ], 401);
        }

        // Verificar si la contraseña coincide
        if (Hash::check($request->input('password'), $user->password)) {
            // Contraseña válida, el usuario coincide
            Log::info('Contraseña válida');

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully',
                'data' => $user,
                'token' => $user->createToken('API TOKEN')->plainTextToken,
                'input' => $request->all()
            ], 200);
        } else {
            // Contraseña inválida, la autenticación ha fallado
            Log::info('Contraseña inválida');
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized'],
                'input' => $request->all()
            ], 401);
        }*/

        //$user = User::where('email', $request->email)->first();

        /*if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized 1'],
                'input' => $request->all(),
            ], 401);
        }*/
        
        if(!Auth::attempt($request->only('email','password'))){
            //Log::error('Inicio de sesión fallido', ['email' => $request->input('email')]);
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized--'],
                'input' => $request->all()
            ], 401);
        }
        $user = User::where('email', $request->email)->first();
        
        return response()->json([
            'status' => true,
            'message' => 'User Logged In Successfully',
            'data' => $user->name,
            'token' => $user->createToken('API TOKEN')->plainTextToken,
            'user' => $user
        ], 200);
    }
}
