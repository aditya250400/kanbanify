<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Request;

class MemberCardController extends Controller
{
    public function store(Card $card, Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
        ]);

        $user = User::query()
            ->where('email', $request->email)
            ->first();

        if (!$user) {
            flashMessage('Email is unregistered!', 'error');
            return back();
        }

        if ($card->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User already registered to this card!', 'error');
            return back();
        }

        $card->members()->create([
            'user_id' => $user->id,
            'role' => $user->id == request()->user()->id ? 'Owner' : 'Member',
        ]);

        flashMessage('Member successfully invited!');
        return back();
    }

    public function destroy(Card $card, Member $member)
    {

        $member->delete();

        flashMessage('Member successfully deleted!');

        return back();
    }
}
