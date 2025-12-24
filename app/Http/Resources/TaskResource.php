<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'card_id' => $this->card_id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'is_complete' => $this->is_complete,
            'parent_id' => $this->parent_id,
            'children' => self::collection($this->children),
            'percentage' => $this->children->count() > 0
                ? ($this->children->where('is_complete', true)->count() / $this->children->count()) * 100
                : 0,
        ];
    }
}
