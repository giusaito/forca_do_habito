<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categorias';
    protected $fillable = [
        'nome',
    ];
    public function clientes()
    {
        return $this->hasMany(Cliente::class,'categoria_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
