<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\OpenAIController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/login', [AuthController::class, 'authenticate'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/conversation', [ConversationController::class, 'store'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/openai/generate', [OpenAIController::class, 'generateText']);
