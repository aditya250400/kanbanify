<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HasFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    use HasFile;

    public function index()
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'username', 'avatar', 'created_at'])
            ->when(request()->search, function ($query, $value) {
                $query->whereAny([
                    'name',
                    'username',
                    'email'
                ], 'REGEXP', $value);
            })
            ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Users/Index', [
            'users' => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages()
                ],
            ]),
            'page_settings' => [
                'title' => 'Peoples',
                'subtitle' => 'List all peoples in your workspace or cards'
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ]
        ]);
    }

    public function create()
    {
        return inertia('Users/Create', [
            'page_settings' => [
                'title' => 'Add Peoples',
                'subtitle' => 'Fill this form to save the user',
                'method' => 'POST',
                'action' => route('users.store')
            ]
        ]);
    }


    public function store(UserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $this->upload_file($request, 'avatar', 'users'),
        ])->assignRole('member');

        flashMessage('User saved successfully');

        return to_route('users.index');
    }


    public function edit(User $user)
    {
        return inertia('Users/Edit', [
            'page_settings' => [
                'title' => 'Edit Peoples',
                'subtitle' => 'Fill this form to save the user',
                'method' => 'PUT',
                'action' => route('users.update', $user)
            ],
            'user' => $user
        ]);
    }


    public function update(UserRequest $request, User $user)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'avatar' => $this->update_file($request, $user, 'avatar', 'users')
        ]);

        flashMessage('User saved successfully');

        return to_route('users.index');
    }

    public function destroy(User $user)
    {
        $this->delete_file($user, 'avatar');

        $user->delete();

        flashMessage('User has been successfully deleted!');

        return to_route('users.index');
    }
}
