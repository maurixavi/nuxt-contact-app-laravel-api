<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function signin(Request $request)
    {
        $request->validate = ([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('email', '=', $request->email)->first();

        if(isset($user->id)){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('auth_token')->plainTextToken;
                
                return response()->json([
                    'status' => true,
                    'message' => 'User Logged In Successfully',
                    'access_token' => $token,
                    'data' => $user->name,
                    'user' => $user
                ], 200);

            } else {
                return response()->json([
                    'status' => false,
                    'errors' => ['Unauthorized. Password incorrect'],
                    'input' => $request->all()
                ], 401);
            }
        } else{
            return response()->json([
                'status' => false,
                'errors' => ['Unauthorized. User not registered'],
                'input' => $request->all()
            ], 401);
        }

    }
}
