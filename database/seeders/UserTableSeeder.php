<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\Models\User::create([
            'name' => 'Giuliano',
            'email' => 'admin@https://www.grautecnico.com.br/',
            'password' => bcrypt('admin')
        ]);
    }
}
