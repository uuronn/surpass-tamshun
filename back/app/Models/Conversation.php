<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Conversation extends Model
{
    use HasFactory;

    // プライマリキーを uuid に設定
    protected $keyType = 'string';
    public $incrementing = false;  // 自動増分を無効化

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

    // テーブル名（必要に応じて）
    protected $table = 'conversations';

    // 代入可能なカラム
    protected $fillable = [
        'user_id',
        'message',
        'response',
    ];

    // 日付属性
    protected $dates = [
        'created_at',
        'updated_at',
    ];

    // リレーション：会話はユーザーに属する
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 型キャスト
    protected $casts = [
        'user_id' => 'integer',
    ];
}
