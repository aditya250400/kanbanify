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
            ]
        ]);
    }
}
