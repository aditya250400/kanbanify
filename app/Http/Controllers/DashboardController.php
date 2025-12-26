<?php

namespace App\Http\Controllers;

use App\Enums\CardStatus;
use App\Models\Card;
use App\Models\Member;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Summary of the information'
            ],
            'count' => [
                'users' => User::count(),
                'workspaces' => Member::query()
                    ->where('members.user_id', request()->user()->id)
                    ->whereHasMorph('memberable', Workspace::class)
                    ->count(),
                'tasks' => Member::query()
                    ->where('members.user_id', request()->user()->id)
                    ->whereHasMorph('memberable', Card::class)
                    ->count(),
                'done' => Member::query()
                    ->where('members.user_id', request()->user()->id)
                    ->whereHasMorph('memberable', Card::class, fn($query) => $query->where('status', CardStatus::DONE->value))
                    ->count(),

            ]
        ]);
    }
}
