<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);

        User::create([
            'name' => 'Nico Robin',
            'username' => null,
            'email' => 'robin@gmail.com',
            'password' => bcrypt('password')
        ])->assignRole('admin');
    }
}
