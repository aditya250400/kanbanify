<?php

namespace App\Http\Controllers;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use App\Http\Requests\CardRequest;
use App\Http\Resources\CardResource;
use App\Http\Resources\CardSingleResource;
use App\Http\Resources\WorkspaceResource;
use App\Models\Card;
use App\Models\Workspace;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function create(Workspace $workspace)
    {
        return inertia('Cards/Create', [
            'page_settings' => [
                'title' => 'Create Card',
                'subtitle' => 'Fill out this form to add a new card',
                'method' => 'POST',
                'action' => route('cards.store', $workspace)
            ],
            'status' => request()->status ?? 'To Do',
            'statuses' => CardStatus::options(),
            'priority' => request()->priority ?? CardPriority::UNKNOWN->value,
            'priorities' => CardPriority::options(),
            'workspace' => $workspace->only('slug'),
        ]);
    }

    public function store(Workspace $workspace, CardRequest $request)
    {

        $card = $request->user()->cards()->create([
            'workspace_id' => $workspace->id,
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $request->status,
            'order' => $this->ordering($workspace, $request->status),
            'priority' => $request->priority,
        ]);




        flashMessage('Card saved successfully');

        return to_route('workspaces.show', [$workspace]);
    }

    public function ordering(Workspace $workspace, $status)
    {



        $last_card = Card::query()
            ->where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderByDesc('order')
            ->first();



        if (!$last_card) return 1;

        return $last_card->order + 1;
    }

    public function show(Workspace $workspace, Card $card)
    {
        return inertia('Cards/Show', [
            'card' => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
            'page_settings' => [
                'title' => 'Detail Card',
                'subtitle' => 'You can see the detail card information'
            ]
        ]);
    }
}
