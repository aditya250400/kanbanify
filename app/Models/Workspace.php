<?php

namespace App\Models;

use App\Enums\Workspacevisibility;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    protected $guarded = [];

    protected function casts()
    {
        return [

            'visibility' => Workspacevisibility::class,

        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cards()
    {
        return $this->hasMany(Card::class);
    }


    public function members()
    {
        return $this->morphMany(Member::class, 'memberable');
    }
}
