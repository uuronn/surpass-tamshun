<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function currentUser($userId)
    {
        $user = User::find($userId);


        return response()->json(['user' => $user, 'status' => 200]);
    }
}
