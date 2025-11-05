<?php

namespace App\Http\Controllers;

use App\Enums\Workspacevisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
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
        $workspace = $request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name, str()->uuid(10)),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'),
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace saved successfully');

        return to_route('workspaces.show', $workspace);
    }

    public function show(Workspace $workspace)
    {
        return inertia('Workspaces/Show', [
            'workspace' => new WorkspaceResource($workspace),
        ]);
    }

    public function edit(Workspace $workspace)
    {
        return inertia('Workspaces/Setting', [
            'workspace' => new WorkspaceResource($workspace),
            'page_settings' => [
                'title' => 'Edit Workspace',
                'subtitle' => 'Fill out this form to edit workspace',
                'method' => 'PUT',
                'action' => route('workspaces.update', $workspace)
            ],
            'visibilities' => Workspacevisibility::options(),
        ]);
    }

    public function update(WorkspaceRequest $request, Workspace $workspace)
    {
        $workspace->update([
            'name' => $name = $request->name,
            'slug' => str()->slug($name, str()->uuid(10)),
            'cover' => $request->hasFile('cover') ? $this->update_file($request, $workspace, 'cover', 'workspaces/cover') : $workspace->cover,
            'logo' => $request->hasFile('logo') ? $this->update_file($request, $workspace, 'logo', 'workspaces/logo') : $workspace->logo,
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace updated successfully');

        return to_route('workspaces.show', $workspace);
    }
}
