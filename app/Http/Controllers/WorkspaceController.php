<?php

namespace App\Http\Controllers;

use App\Enums\Workspacevisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Traits\HasFile;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    use HasFile;
    public function create()
    {
        return inertia('Workspaces/Create', [
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'Fill out this form to add a new workspace',
                'method' => 'POST',
                'action' => route('workspaces.store')
            ],
            'visibilities' => Workspacevisibility::options(),
        ]);
    }

    public function store(WorkspaceRequest $request)
    {
        $request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name, str()->uuid(10)),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'),
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace saved successfully');

        return back();
    }
}
