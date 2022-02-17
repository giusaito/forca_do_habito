<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Categoria extends Model
{
    use HasFactory;
    protected $table = 'categorias';
    protected $fillable = [
        'nome',
        'slug'
    ];
    protected static function boot()
    {
        parent::boot();
        static::created(function ($categoria) {
            $categoria->slug = $categoria->generateSlug($categoria->nome);
            $categoria->save();
        });
    }
    public function clientes()
    {
        return $this->hasMany(Cliente::class,'categoria_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    private function generateSlug($name)
    {
        if (static::whereSlug($slug = Str::slug($name))->exists()) {
            $max = static::whereNome($name)->latest('id')->skip(1)->value('slug');
            if (isset($max[-1]) && is_numeric($max[-1])) {
                return preg_replace_callback('/(\d+)$/', function($mathces) {
                    return $mathces[1] + 1;
                }, $max);
            }
            return "{$slug}-2";
        }
        return $slug;
    }
}
