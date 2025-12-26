<?php

namespace App\Http\Controllers;

use App\Enums\CardStatus;
use App\Http\Resources\MyTaskResource;
use App\Models\Card;
use App\Models\Member;
use App\Models\User;
use App\Models\Workspace;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {

        $tasks = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph(
                'memberable',
                Card::class,
                fn($query) => $query->where('status', CardStatus::INPROGRESS->value)
            )
            ->latest()
            ->limit(10)
            ->get();





        return inertia('Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Summary of the information'
            ],
            'tasks' => MyTaskResource::collection($tasks),
            'productivity_chart' => $this->productivityChart(),
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
                'inProgress' => Member::query()
                    ->where('members.user_id', request()->user()->id)
                    ->whereHasMorph('memberable', Card::class, fn($query) => $query->where('status', CardStatus::INPROGRESS->value))
                    ->count(),
                'done' => Member::query()
                    ->where('members.user_id', request()->user()->id)
                    ->whereHasMorph('memberable', Card::class, fn($query) => $query->where('status', CardStatus::DONE->value))
                    ->count(),

            ]
        ]);
    }

    public function productivityChart()
    {
        $currentDate = Carbon::now();
        $sixMonthsAgo = $currentDate->copy()->addMonth(-5);

        $labels = [];
        $datasets = [
            [
                'label' => 'To Do',
                'data' => [],
                'backgroundColor' => 'rgba(239, 68, 68, 1)',
            ],
            [
                'label' => 'In Progress',
                'data' => [],
                'backgroundColor' => 'rgba(59, 130, 246, 1)',
            ],
            [
                'label' => 'Done',
                'data' => [],
                'backgroundColor' => 'rgba(34, 197, 94, 1)',
            ],
        ];

        for ($i = 0; $i < 6; $i++) {
            $month = $sixMonthsAgo->format('F');
            $labels[] = $month;

            $taskCountTodo = Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph(
                    'memberable',
                    Card::class,
                    fn($query) => $query->where('status', CardStatus::TODO->value)
                )
                ->whereMonth('created_at', $sixMonthsAgo->month)
                ->count();

            $taskCountInProgress = Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph(
                    'memberable',
                    Card::class,
                    fn($query) =>
                    $query->where('status', CardStatus::INPROGRESS->value)

                )
                ->whereMonth('created_at', $sixMonthsAgo->month)
                ->count();

            $taskCountDone = Member::query()
                ->where('members.user_id', request()->user()->id)
                ->whereHasMorph(
                    'memberable',
                    Card::class,
                    fn($query) =>
                    $query->where('status', CardStatus::DONE->value)

                )
                ->whereMonth('created_at', $sixMonthsAgo->month)
                ->count();

            $datasets[0]['data'][] = $taskCountTodo;
            $datasets[1]['data'][] = $taskCountInProgress;
            $datasets[2]['data'][] = $taskCountDone;


            $sixMonthsAgo->addMonth();
        }
        return [
            'labels' => $labels,
            'datasets' => $datasets,
        ];
    }
}
