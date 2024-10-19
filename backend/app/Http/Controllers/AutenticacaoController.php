<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Http\Requests\RegistroRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AutenticacaoController extends Controller
{
    public function registrar(RegistroRequest $request)
    {
        $dados = $request->validated();
        $dados['senha'] = Hash::make($dados['senha']);

        $usuario = Usuario::create($dados);

        $token = $usuario->createToken('token_autenticacao')->accessToken;

        return response()->json([
            'usuario' => $usuario,
            'token' => $token
        ], 201);
    }

    public function entrar(LoginRequest $request)
    {
        $credenciais = $request->validated();

        if (!Auth::attempt($credenciais)) {
            return response()->json(['mensagem' => 'Credenciais inválidas'], 401);
        }

        $usuario = Auth::user();
        $token = $usuario->createToken('token_autenticacao')->accessToken;

        return response()->json([
            'usuario' => $usuario,
            'token' => $token
        ]);
    }

    public function sair()
    {
        Auth::user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json(['mensagem' => 'Logout realizado com sucesso']);
    }
}
