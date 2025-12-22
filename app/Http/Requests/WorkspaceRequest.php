<?php

namespace App\Http\Requests;

use App\Enums\Workspacevisibility;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class WorkspaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:255|string',
            'cover' => [
                Rule::when($this->routeIs('workspaces.store'), ['required', 'mimes:png,jpg,svg', 'max:2048']),
                Rule::when($this->routeIs('workspaces.update'), ['nullable', 'mimes:png,jpg,svg', 'max:2048']),
            ],
            'logo' => [
                Rule::when($this->routeIs('workspaces.store'), ['required', 'mimes:png,jpg,svg', 'max:2048']),
                Rule::when($this->routeIs('workspaces.update'), ['nullable', 'mimes:png,jpg,svg', 'max:2048']),
            ],
            'visibility' => [
                'required',
                new Enum(Workspacevisibility::class),
            ]
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Workspace Name',
            'cover' => 'Cover',
            'logo' => 'Logo',
            'visibility' => 'Visibility'
        ];
    }
}
