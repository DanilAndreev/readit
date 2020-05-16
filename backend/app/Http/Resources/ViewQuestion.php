<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ViewQuestion extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'answered' => (boolean)$this->answered,
            'replies' => Reply::collection($this->replies),
            'user' => new User($this->user),
            'category' => new Category($this->category),
        ]);
    }
}
