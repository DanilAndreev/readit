<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvatar;
use App\Http\Resources\ViewUser;
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
     * @param User $user
     */
    public function show(User $user)
    {
        return new ViewUser($user);
    }

    /**
     * Show currently authenticated user.
     *
     * @param Request $request
     */
    public function me(Request $request)
    {
        return new ViewUser($request->user());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param User $user
     */
    public function update(Request $request, User $user)
    {
        $fields = $request->only([
            'email',
            'name',
            'password',
            'about_me',
            'is_admin',
        ]);

        if (isset($fields['is_admin']) && !$request->user()->isAdmin()) {
            unset($fields['is_admin']);
        }

        $user->update($fields);

        return new ViewUser($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreAvatar $request
     * @param User $user
     */
    public function avatar(StoreAvatar $request, User $user)
    {
        $request
            ->file('avatar')
            ->storeAs('avatars', $user->id . '.jpg');

        return response()->json(null, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
