<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistroRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'senha' => 'required|string|min:8',
            'pais' => 'required|string',
            'estado' => 'required|string',
            'cidade' => 'required|string',
            'data_nascimento' => 'required|date',
            'genero' => 'required|in:masculino,feminino,outro',
            'imagem_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'imagem_capa' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
