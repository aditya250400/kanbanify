<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Card $card, Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);

        $request->user()->tasks()->create([
            'card_id' => $card->id,
            'title' => $request->title,
        ]);

        flashMessage('Task saved successfully');

        return back();
    }

    public function destroy(Card $card, Task $task)
    {
        $task->delete();

        flashMessage('Task successfully deleted');
        return back();
    }

    public function item(Card $card, Task $task, Request $request)
    {
        $request->validate(['item' => 'required|string|max:255']);

        $task->children()->create([
            'card_id' => $card->id,
            'user_id' => $request->user()->id,
            'title' => $request->item,
        ]);

        flashMessage("Success added item to task $task->title");

        return back();
    }
}
