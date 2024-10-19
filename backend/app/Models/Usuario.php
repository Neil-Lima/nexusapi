<?php

namespace App\Models;

use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Usuario extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $connection = 'mongodb';
    protected $collection = 'usuarios';

    protected $fillable = [
        'nome', 'sobrenome', 'email', 'senha', 'pais', 'estado', 'cidade',
        'data_nascimento', 'genero', 'imagem_perfil', 'imagem_capa'
    ];

    protected $hidden = [
        'senha', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'data_nascimento' => 'date',
    ];
}
