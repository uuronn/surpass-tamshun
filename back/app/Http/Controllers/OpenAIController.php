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
                            'content' => 'あなたは有能なアシスタントです。'
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
