<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'username' => 'nullable',
            'email' => [
                'required',
                'email',
                'min:4',
                'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
            'password' => Rule::when($this->routeIs('users.store'), ['required', 'min:8', 'max:255', 'confirmed']),
            Rule::when($this->routeIs('users.update'), ['nullable', 'min:8', 'max:255', 'confirmed']),
            'avatar' => 'nullable|mimes:png,jpg,svg|max:2048'

        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Name',
            'email' => 'Email',
            'password' => 'Password',
            'avatar' => 'Avatar',
        ];
    }
}
