<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function currentUser($userId)
    {
        $user = User::find($userId);
        var_dump($user);

        return response()->json(['status' => 200]);
    }
}
