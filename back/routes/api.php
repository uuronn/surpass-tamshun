<?php

use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::post('/register', [AuthController::class, 'register'])->withoutMiddleware([VerifyCsrfToken::class]);
