<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('host_user_id');
            $table->integer('host_user_hit_point');
            $table->integer('host_user_attack_power');
            $table->integer('host_user_guard_power');
            $table->integer('host_user_speed_power');
            $table->json('host_user_skills')->nullable();

            $table->uuid('join_user_id')->nullable();
            $table->integer('join_user_hit_point')->nullable();
            $table->integer('join_user_attack_power')->nullable();
            $table->integer('join_user_guard_power')->nullable();
            $table->integer('join_user_speed_power')->nullable();
            $table->json('join_user_skills')->nullable();

            $table->uuid('currentTurnUser')->nullable();

            $table->boolean('is_connect')->default(false);
            $table->boolean('is_battle_finish')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room');
    }
};
