<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\ViewCategory;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(Category::orderBy('name')->get());
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Category $category
     */
    public function show(Category $category)
    {
        return new ViewCategory($category);
    }
}
