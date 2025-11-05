<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class WorkspaceResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'cover' => $this->cover ? Storage::url($this->cover) : null,
            'logo' => $this->logo ? Storage::url($this->logo) : null,
            'visibility' => $this->visibility,
            'user_id' => $this->user_id,
            'members' => MemberResource::collection($this->members),
        ];
    }
}
