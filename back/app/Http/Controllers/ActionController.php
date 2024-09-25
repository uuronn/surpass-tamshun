<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function attack(Request $request)
    {
        $room = Room::find($request->room_id);

        if ($room->host_user_id === $request->user_id) {
//          ホスト側の攻撃
            $damage = $room->host_user_attack_power;
            $room->join_user_hit_point -= $damage;

            $room->save();

            return response()->json(['room' => $room, 'status' => 204]);
        } else if ($room->join_user_id === $request->user_id) {
//          参加者の方の攻撃
            $damage = $room->join_user_attack_power;
            $room->host_user_hit_point -= $damage;

            $room->save();

            return response()->json(['room' => $room, 'status' => 204]);
        }

//        $hostUser = User::find($room->host_user_id);
//        $joinUser = User::find($room->join_user_id);

//        $damage = $hostUser->attack_power - $joinUser->guard_power;
//        $joinUser->hit_point -= $damage;
//        $joinUser->save();
//
//        return response()->json(['joinUser' => $joinUser, 'status' => 200]);
    }
}
