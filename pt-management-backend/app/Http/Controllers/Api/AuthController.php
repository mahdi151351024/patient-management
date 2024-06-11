<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiTrait;

    public function register(Request $request) {

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required | email',
                'password' => 'required | min: 6'
            ]);
            if($validator->fails()) return $this->apiFailed($validator->errors()->first(), [], 422);
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $access_token = $user->createToken('auth_token')->plainTextToken;
            return $this->apiSuccess('User created successfully', [
                'user' => $user,
                'access_token' => $access_token,
                'token_type' => 'Bearer'
            ]);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
        
    }

    public function login(Request $request) {

        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required | email',
                'password' => 'required'
            ]);
            if($validator->fails()) return $this->apiFailed($validator->errors()->first(), [], 422);

            $credentials = $request->only('email', 'password');
            if(! Auth::attempt($credentials)) return $this->apiFailed('Email or password is incorrect');

            $user = User::where('email', $request->email)->firstOrFail();
            $access_token = $user->createToken('auth_token')->plainTextToken;
            return $this->apiSuccess('You are logged in successfully', [
                'user' => $user,
                'access_token' => $access_token
            ]);

        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
        

    }

    public function logout() {
        try {
            
            Auth::user()->tokens()->delete();
            return $this->apiSuccess('Logout successfully');

        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }

    }
}
