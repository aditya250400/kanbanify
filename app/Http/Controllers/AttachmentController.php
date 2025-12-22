<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttachmentRequest;
use App\Models\Attachment;
use App\Models\Card;
use App\Traits\HasFile;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    use HasFile;

    public function store(Card $card, AttachmentRequest $request)
    {
        $request->user()->attachments()->create([
            'card_id' => $card->id,
            'file' => $this->upload_file($request, 'file', 'attachments'),
            'link' => $request->link,
            'name' => $request->name,
        ]);

        flashMessage('Attachment saved successfully');

        return back();
    }

    public function destroy(Card $card, Attachment $attachment)
    {

        $this->delete_file($attachment, 'file');

        $attachment->delete();

        flashMessage('The Attachment sucessfully deleted!');

        return back();
    }
}
