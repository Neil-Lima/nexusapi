<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutenticacaoController;

Route::post('/registrar', [AutenticacaoController::class, 'registrar']);
Route::post('/entrar', [AutenticacaoController::class, 'entrar']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/sair', [AutenticacaoController::class, 'sair']);
    Route::get('/usuario', function (Request $request) {
        return $request->user();
    });
});

Route::post('/register', [AutenticacaoController::class, 'registrar']);
