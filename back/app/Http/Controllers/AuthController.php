<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class AuthController extends Controller
{
    public function register(Request $request)
    {
//        405が出るけど理由がわからない
//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:users',
//            'password' => 'required|string|min:8|confirmed',
//        ]);

//        var_dump($request->name);
//        var_dump($request->email);
//        var_dump(Hash::make($request->password));
        try {

        $user = User::create([
            'id' => Str::uuid()->toString(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user], 201);
        } catch (Throwable $exception) {
            var_dump($exception);
        }
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // ユーザーをメールで検索
        $user = User::where('email', $credentials['email'])->first();

        // ユーザーが存在しない場合
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // パスワードを確認
        if (Hash::check($credentials['password'], $user->password)) {
            // ユーザーを手動でログイン
            Auth::login($user);

            // セッション再生成（なんかできない）
//              $request->session()->regenerate();

            // セッション再生成
//            $request->session()->regenerate();

            // セッションIDを取得
            $sessionId = session()->getId();

            // 認証成功
            return response()->json([
                'user' => $user,
                'session_id' => $sessionId // デバッグ用に追加
            ], 201);

            // 認証成功
            return response()->json(['user' => $user], 201);
        } else {
            // パスワードが一致しない場合
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }
}
