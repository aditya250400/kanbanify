<?php

namespace App\Models;

use App\Enums\CardPriority;
use App\Enums\CardStatus;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $guarded = [];

    protected function casts()
    {
        return [
            'status' => CardStatus::class,
            'priority' => CardPriority::class,
        ];
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function members()
    {
        return $this->morphMany(Member::class, 'memberable');
    }
}
