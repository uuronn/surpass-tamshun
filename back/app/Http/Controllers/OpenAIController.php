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

        $user = User::find($request->userId);

//        $hotWordsString = implode(', ', $user->hot_words);

        // $hotWordsJson = json_encode( $user->hot_words, JSON_UNESCAPED_UNICODE);
        $hotWordsString = (is_array($user->hot_words) && !empty($user->hot_words))
            ? implode(', ', $user->hot_words)
            : '';

        $hotWordsString = (is_array($user->hot_words) && !empty($user->hot_words))
            ? implode(', ', $user->hot_words)
            : '';

        $prompt = $request->input('prompt');

        $messages = [];

// $hotWordsString が空でない場合、システムメッセージを追加
        if ($hotWordsString !== '') {
            $messages[] = [
                'role' => 'system',
                'content' => "
            あなたはこの【熱い言葉】投げられて、育ちました。これらを\"部分的\"に参考に会話してください。
            そのまま使うのはNGです。

            【熱い言葉】
            {$hotWordsString}"
            ];
        }

// ユーザーメッセージを追加
        $messages[] = [
            'role' => 'user',
            'content' => $prompt
        ];

        $client = new Client();

        try {
            $response = $client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'gpt-3.5-turbo', // 正しいモデル名
                    'messages' => $messages,
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

        $user = User::where('id', $request['userId'])->first();

//        var_dump($user->level);

        // ユーザーが存在しない場合
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

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
                            'content' => '僕から熱い言葉やエネルギッシュな言葉があったら、それを10点満点で以下の項目ごとに採点して、英語の変数名を使用したJSON形式で数値のみを出力して欲しいです。

採点基準は以下の通りです：
1. 元気を与える度合い
2. 攻撃力（言葉の強さや影響力）
3. 防御力（ネガティブな影響から守る力）
4. 素早さ（立ち直る速さ）
5. 体力（言葉の持続力や安定性）

各項目について厳しく判定してください。判定できない場合は最低点数（0点）を出力してください。

出力形式は以下のようにしてください（英語の変数名を使用）：

```json
{
  "heat_power": 数値,
  "attack_power": 数値,
  "guard_power": 数値,
  "speed_power": 数値,
  "hit_point": 数値
}'
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




//            $data = json_decode($generatedText, true);

            // JSON部分を抽出
            if (preg_match('/\{.*\}/s', $generatedText, $matches)) {
                $jsonString = $matches[0];
                $scores = json_decode($jsonString, true);

                if (json_last_error() === JSON_ERROR_NONE) {


//            var_dump($generatedText->json());
//            $resultScore = preg_replace('/\D/', '', $generatedText);

            // hot_words に prompt を追加
            // hot_words が null の場合は空配列として扱う
            $hotWords = $user->hot_words ?? [];

//            var_dump($hotWords);
            $hotWords[] = $prompt;
            $user->hot_words = $hotWords;
            $user->attack_power += $scores['attack_power'];
            $user->guard_power += $scores['guard_power'];
            $user->speed_power += $scores['speed_power'];
            $user->hit_point += $scores['hit_point'];

            $user->total_xp = $user->attack_power + $user->guard_power + $user->speed_power + $user->hit_point;
//            var_dump($generatedText->json());
//            $resultScore = preg_replace('/\D/', '', $generatedText);

                    // hot_words に prompt を追加
                    // hot_words が null の場合は空配列として扱う
                    $hotWords = $user->hot_words ?? [];

//            var_dump($hotWords);
                    $hotWords[] = $prompt;
                    $user->hot_words = $hotWords;
                    $user->attack_power += $scores['attack_power'];
                    $user->guard_power += $scores['guard_power'];
                    $user->speed_power += $scores['speed_power'];
                    $user->hit_point += $scores['hit_point'];

                    $user->total_xp = $user->attack_power + $user->guard_power + $user->hit_point;

                    $user->last_training_time = now();


                    $user->save();



                    return response()->json([
                        'success' => true,
                        'result' => [
                            'attackPower' => $user->attack_power,
                            'guardPower' => $user->guard_power,
                            'hitPoint' => $user->hit_point,
                            'speedPower' => $user->speed_power,
                            'totalXp' => $user->total_xp,
                            'lastTrainingTime' => $user->last_training_time
                        ],
                    ]);

            $user->last_training_time = now();


            $user->save();



                    return response()->json([
                'success' => true,
                'result' => [
                    'attackPower' => $user->attack_power,
                    'guardPower' => $user->guard_power,
                    'hitPoint' => $user->hit_point,
                    'speedPower' => $user->speed_power,
                    'totalXp' => $user->total_xp,
                    'lastTrainingTime' => $user->last_training_time
                ],
            ]);
                }
            }


        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'APIリクエストに失敗しました: ' . $e->getMessage(),
            ], 500);
        }
    }

}
