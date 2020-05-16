<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index', 'show');
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \App\Http\Resources\User::collection(User::paginate());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     */
    public function show(User $user)
    {
        return new \App\Http\Resources\ViewUser($user);
    }

    /**
     * Show currently authenticated user.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function me(Request $request)
    {
        return new \App\Http\Resources\ViewUser($request->user());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     */
    public function update(Request $request, User $user)
    {
        $user->update($request->only([
            'email',
            'name',
            'password',
        ]));

        return new \App\Http\Resources\ViewUser($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
