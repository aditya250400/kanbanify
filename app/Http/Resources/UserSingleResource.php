<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserSingleResource extends JsonResource
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
            'username' => $this->username,
            'email' => $this->email,
            'avatar' => $this->avatar ? Storage::url($this->avatar) : Storage::url('avatarplaceholder.png'),
            'is_admin' => $this->getRoleNames()->first() == 'Admin' ? true : false,
            'roles' => $this->getRoleNames(),
        ];
    }
}
