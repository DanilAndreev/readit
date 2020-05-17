<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAvatar extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'avatar' => 'required|image|mimes:jpeg,png|max:2048|dimensions:min_width=30,min_height=30,max_width=700,max_height=700',
        ];
    }
}
