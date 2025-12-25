<?php

namespace App\Http\Controllers;

use App\Http\Resources\MyTaskResource;
use App\Models\Card;
use App\Models\Member;
use Illuminate\Http\Request;

class MyTaskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $tasks = Member::query()
            ->where('members.user_id', request()->user()->id)
            ->whereHasMorph('memberable', Card::class)
            ->when(request()->search, function ($query, $value) {
                return $query->whereHasMorph('memberable', Card::class, function ($subquery) use ($value) {
                    $subquery->where('title', 'REGEXP', $value);
                });
            })
            ->paginate(10);


        return inertia('Tasks/Index', [

            'tasks' => MyTaskResource::collection($tasks)->additional([
                'meta' => [
                    'has_pages' => $tasks->hasPages(),
                ]
            ]),
            'page_settings' => [
                'title' => 'Tasks',
                'subtitle' => 'List all task in your platform'
            ],
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
            ]
        ]);
    }
}
