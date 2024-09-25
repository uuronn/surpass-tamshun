<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Room extends Model
{
    use HasFactory;

    // プライマリキーを uuid に設定
    protected $table = 'rooms';
    protected $keyType = 'string';

    public $incrementing = false;

    // UUID を自動生成
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'host_user_id',
        'host_user_hit_point',
        'host_user_attack_power',
        'host_user_guard_power',
        'host_user_speed_power',
        'host_user_skills',

        'join_user_id',
        'join_user_hit_point',
        'join_user_attack_power',
        'join_user_guard_power',
        'join_user_speed_power',
        'join_user_skills',

        'is_connect',
        'is_battle_finish'
    ];

}
