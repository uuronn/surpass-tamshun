<?php

namespace App\Http\Controllers;

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

//            var_dump($body['choices'][0]['message']["content"]);
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
}
