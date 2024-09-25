<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
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

        $user = User::find($request->host_user_id);

        $existingRoom = Room::where('host_user_id', $user->id)->first();

        if ($existingRoom) {
            return response()->json(['error' => '既に部屋が存在します'] );
        }

        $room = Room::create([
                'id' => Str::uuid()->toString(),
                'host_user_id' => $user->id,
                'host_user_name' => $user->name,
                'host_user_attack_power' => $user->attack_power,
                'host_user_guard_power' => $user->guard_power,
                'host_user_speed_power' => $user->speed_power,
                'host_user_max_hit_point' => $user->hit_point,
                'host_user_hit_point' => $user->hit_point,
                'host_user_xp' => $user->total_xp
            ]);


//        var_dump($request->host_user_id);
//        var_dump($request->host_user_attack_power);
//
//        var_dump($request->host_user_guard_power);
//        var_dump($request->host_user_hit_point);

        return response()->json(['room' => $room, 'status' => 201]);
    }

    public function joinRoom(Request $request)
    {

        $room = Room::find($request->room_id);

        if ($room->join_user_id) {
            return response()->json(['error' => '既に参加ユーザーがいます'] );
        }

        $user = User::find($request->join_user_id);
//        $user = User::find($request->host_user_id);
//        var_dump($room);

        $room->update([
            'join_user_id' => $user->id,
            'join_user_name' => $user->name,
            'join_user_attack_power' => $user->attack_power,
            'join_user_guard_power' => $user->guard_power,
            'join_user_max_hit_point' => $user->hit_point,
            'join_user_hit_point' => $user->hit_point,
            'join_user_speed_power' => $user->speed_power,
            'join_user_xp' => $user->total_xp,
        ]);

        // ユーザーをメールで検索
//        $user = Room::where('email', $credentials['email'])->first();

        // ユーザーが存在しない場合
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['room' => $room], 201);
    }

    public function getRoom(Request $request)
    {
        $room = Room::find($request->room_id);

        // if (!$room->is_connect) {
        //     return response()->json(['room' => $room, 'status' => "待機中です"]);
        // }

//        var_dump("test");
//
        if (!$room->is_connect && $room->host_user_id && $room->join_user_id) {
            $room->is_connect = true;


            if($room->host_user_speed_power > $room->join_user_speed_power) {
                $room->currentTurnUser = $room->host_user_id;
            } else {
                $room->currentTurnUser = $room->join_user_id;
            }

            $room->save();

            return response()->json( "対戦開始" );
        }

//        if(!$room->join_user_id) {
//            return response()->json(['error' => '参加ユーザーがいません'] );
//        }
//
//        if(!$room->join_user_id) {
//            return response()->json(['error' => '参加ユーザーがいません'] );
//        }



        if ($room->is_connect) {
            return response()->json(['room' => $room, 'status' => 201]);
        }



//        どちらかのユーザーのHPが0になったら終了
        if ($room->host_user_hit_point <= 0) {
            $room->is_battle_finish = true;
            $room->save();

            return response()->json(['room' => $room,'win' => $room->join_user_id]);
        }

        if ($room->join_user_id && $room->join_user_hit_point <= 0) {
            $room->is_battle_finish = true;
            $room->save();

            return response()->json(['room' => $room,'win' => $room->host_user_id]);
        }
////
//        if (!$room->join_user_id) {
//            return response()->json(['error' => '既に参加ユーザーがいます'] );
//        }

        return response()->json(['room' => $room,'status' => 201]);
    }

    public function deleteRoom(Request $request)
    {
        $room = Room::find($request->room_id);

        $room->delete();
        $room->save();

        return response()->json(['status' => 201]);
    }

    public function getListRoom()
    {
        $room = Room::all();


        return response()->json(['roomList'=> $room,'status' => 201]);
    }


    public function deleteJoinUserRoom(Request $request)
    {
        $room = Room::find($request->room_id);

        $room->update([
            'join_user_id' => "",
            'join_user_name' => "",
            'join_user_attack_power' => 0,
            'join_user_guard_power' => 0,
            'join_user_max_hit_point' => 0,
            'join_user_hit_point' => 0,
            'join_user_speed_power' => 0,
            'join_user_xp' => 0
        ]);

        $room->save();

        return response()->json(['status' => 201]);
    }



}
