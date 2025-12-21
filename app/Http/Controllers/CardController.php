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
use Doctrine\Inflector\Rules\Word;
use Illuminate\Http\Request;
use Illuminate\Queue\Worker;

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

    public function edit(Workspace $workspace, Card $card)
    {
        return inertia('Cards/Edit', [
            'card' => new CardSingleResource($card->load(['members', 'user', 'tasks', 'attachments'])),
            'page_settings' => [
                'title' => 'Edit Card',
                'subtitle' => 'Fill this form to edit card',
                'method' => 'PUT',
                'action' => route('cards.update', [$workspace, $card])
            ],
            'statuses' => CardStatus::options(),
            'priorities' => CardPriority::options(),
            'workspace' => $workspace->only('slug'),
        ]);
    }

    public function update(Workspace $workspace, Card $card, CardRequest $request)
    {
        $last_status = $card->status->value;

        $card->update([
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status' => $status = $request->status,
            'priority' => $request->priority,
            'order' => $this->ordering($workspace, $status),
        ]);


        $this->adjustOrdering($workspace, $last_status);

        flashMessage('Card saved successfully updated');

        return back();
    }

    public function adjustOrdering(Workspace $workspace, $status)
    {
        $order = 1;

        return Card::where('workspace_id', $workspace->id)
            ->where('status', $status)
            ->orderBy('order')
            ->get()
            ->each(function ($card) use (&$order) {
                $card->order = $order;
                $card->save();
                $order++;
            });
    }

    public function destroy(Workspace $workspace, Card $card)
    {
        $last_status = $card->status->value;
        $card->delete();

        $this->adjustOrdering($workspace, $last_status);

        flashMessage('Card successfully deleted!');

        return to_route('workspaces.show', $workspace);
    }
}
