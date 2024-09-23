<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{

    public function store(Request $request)
    {
//        return response()->json(['message' => $request]);
        // バリデーション
//        $validated = $request->validate([
//            'user_id' => 'required|integer|exists:users,id',
//            'message' => 'required|string|max:1000',
//        ]);
//
//        // ユーザーからのメッセージを保存
        //なんかuser_idが0で入ってくる、DBにuuidで入ってる
        $conversation = Conversation::create([
            'user_id' => $request->user_id,
            'message' => $request->message,
        ]);

        return response()->json(['message' => 'Conversation saved successfully', 'conversation' => $conversation]);
//
//        // AIからのレスポンスを生成
//        $response = $this->generateAIResponse($validated['message']);
//
//        // AIのレスポンスを保存
//        $conversation->response = $response;
//        $conversation->save();
//
//        // クライアントにレスポンスを返す
//        return response()->json([
//            'message' => 'Conversation saved successfully',
//            'conversation' => $conversation
//        ]);
    }
}
