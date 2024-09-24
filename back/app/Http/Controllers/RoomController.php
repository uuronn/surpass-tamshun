<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoomController extends Controller
{
    public function createRoom(Request $request)
    {
//        try {
//            $room = Room::create([
//                'id' => Str::uuid()->toString(),
//                'host_user_id' => $request->host_user_id,
//                'host_user_attack_power' => $request->host_user_attack_power,
//                'host_user_guard_power' => $request->host_user_guard_power,
//                'host_user_hit_point' => $request->host_user_hit_point,
//            ]);
//        } catch (\Throwable $th) {
//            var_dump($th);
//            throw $th;
//        }

        $room = Room::create([
                'id' => Str::uuid()->toString(),
                'host_user_id' => $request->host_user_id,
                'host_user_attack_power' => $request->host_user_attack_power,
                'host_user_guard_power' => $request->host_user_guard_power,
                'host_user_hit_point' => $request->host_user_hit_point,
            ]);


//        var_dump($request->host_user_id);
//        var_dump($request->host_user_attack_power);
//
//        var_dump($request->host_user_guard_power);
//        var_dump($request->host_user_hit_point);

        return response()->json(['room' => $room, 'status' => 201]);
    }

//    public function joinRoom(Request $request)
//    {
//        $room = Room::create([
//            'name' => $request->name,
//            'user_id' => $request->user_id,
//        ]);
//
//        // ユーザーをメールで検索
//        $user = Room::where('email', $credentials['email'])->first();
//
//        // ユーザーが存在しない場合
//        if (!$user) {
//            return response()->json(['error' => 'User not found'], 404);
//        }
//
//        return response()->json(['room' => $room], 201);
//    }
}
