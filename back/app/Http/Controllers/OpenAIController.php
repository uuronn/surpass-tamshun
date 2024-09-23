<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class OpenAIController extends Controller
{
    public function generateText(Request $request)
    {
//        // バリデーション
//        $request->validate([
//            'prompt' => 'required|string',
//        ]);

        $prompt = $request->input('prompt');

        $client = new Client();

        try {
            $response = $client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo', // 正しいモデル名
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => '
                            あなたはこの【熱い言葉】投げられて、育ちました。これらを"部分的"に参考に会話してください。
                            そのまま使うのはNGです。

                            【熱い言葉】
                            ・呆れた
                            ・一緒に頑張ろうよ！！俺も頑張るから！！一所懸命、一つの所に命を懸ける。
                            ・できるできる、君ならできる！！
                            ・お前は俺の友達だ！
                            ・お前なんてダメだ。
                            ・お前は俺のライバルだ！
                            ・あの太陽みたいに、熱くなれよ
                            ・どうした？お前の元気はそんなものか！？
                            ・真剣だからこそ、ぶつかる壁がある。'
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'max_tokens' => 150,
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            $generatedText = $body['choices'][0]['message']["content"] ?? '';

            return response()->json([
                'success' => true,
                'data' => $generatedText,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'APIリクエストに失敗しました: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function training(Request $request)
    {
        $prompt = $request->input('prompt');

        $user = User::where('id', $request['user_id'])->first();

        var_dump($user->level);

        // ユーザーが存在しない場合
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // hot_words に prompt を追加
        // hot_words が null の場合は空配列として扱う
        $hotWords = $user->hot_words ?? [];

        var_dump($hotWords);
        $hotWords[] = $prompt;
        $user->hot_words = $hotWords;
        $user->save();

        $client = new Client();

        try {
            $response = $client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => '僕から熱い言葉やエネルギッシュな言葉があったら、それを100点満点で点数を採点して、"数値のみ"を出力して欲しいです。
                            採点基準は、その言葉がどれだけ相手に元気を与えるか、どれだけ相手を励ますか、どれだけ相手を前向きにさせるか、です。
                            厳しく判定してください。
                            また、判定できない場合は最低点数で出力してください。'
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'max_tokens' => 150,
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            $generatedText = $body['choices'][0]['message']["content"] ?? '0';

            $resultScore = preg_replace('/\D/', '', $generatedText);

            return response()->json([
                'success' => true,
                'xp' => $resultScore,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'APIリクエストに失敗しました: ' . $e->getMessage(),
            ], 500);
        }
    }

}
