<?php

namespace App\Http\Controllers;

use App\Enums\Workspacevisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Member;
use App\Models\User;
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

        $workspace->members()->create([
            'user_id' => $request->user()->id,
            'role' => $workspace->user_id == $request->user()->id ? 'Owner' : 'Member'
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
            'workspace' => new WorkspaceResource($workspace->load('members')),
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

    public function member_store(Workspace $workspace, Request $request)
    {
        $request->validate([
            'email' => 'required|email|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            flashMessage('User not found', 'error');
            return back();
        }

        if ($workspace->members()->where('user_id', $user->id)->exists()) {
            flashMessage('User is already registered to this workspace', 'error');
            return back();
        }

        $workspace->members()->create([
            'user_id' => $user->id,
            'role' => 'Member'
        ]);

        flashMessage('Member successfully invited');

        return back();
    }

    public function member_destroy(Workspace $workspace, Member $member)
    {
        $member->delete();

        flashMessage('Member successfully deleted!');

        return back();
    }

    public function destroy(Workspace $workspace)
    {
        $this->delete_file($workspace, 'cover');
        $this->delete_file($workspace, 'logo');

        $workspace->members()->delete();
        $workspace->delete();

        flashMessage('Workspace has been successfully deleted!');

        return to_route('dashboard');
    }
}
