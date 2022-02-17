<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategoriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoria1 = \App\Models\Categoria::create([
            'nome'      => 'Grátis',
            'slug'      => 'gratis',
            'user_id'   => 1
        ]);
        $categoria2 = \App\Models\Categoria::create([
            'nome'      => 'Normal',
            'slug'      => 'normal',
            'user_id'   => 1
        ]);
        $categoria3 = \App\Models\Categoria::create([
            'nome'      => 'Prêmio',
            'slug'      => 'premio',
            'user_id'   => 1
        ]);
    }
}
