<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/login', [AuthController::class, 'authenticate'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/room', [RoomController::class, 'createRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::put('/joinRoom', [RoomController::class, 'joinRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/getRoom', [RoomController::class, 'getRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::get('/getListRoom', [RoomController::class, 'getListRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/deleteRoom', [RoomController::class, 'deleteRoom'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/action', [ActionController::class, 'attack'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::get('/users/{userId}', [UserController::class, 'currentUser'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/conversation', [ConversationController::class, 'store'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/openai/generate', [OpenAIController::class, 'generateText'])->withoutMiddleware([VerifyCsrfToken::class]);

Route::post('/openai/training', [OpenAIController::class, 'training'])->withoutMiddleware([VerifyCsrfToken::class]);
