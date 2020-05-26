<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvatar;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\ViewUser;
use App\User;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\UnauthorizedException;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index', 'show');
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     */
    public function index(Request $request)
    {
        return UserResource::collection(
            User::when(!$request->user() || $request->user()->is_admin === false,
                function ($query) {
                    return $query->where('is_deleted', false);
                })
                ->paginate()
        );
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
            'old_password',
            'about_me',
            'is_admin',
            'is_deleted',
        ]);

        if (isset($fields['is_admin']) && !$request->user()->isAdmin()) {
            unset($fields['is_admin']);
        }

        if (isset($fields['is_deleted']) && !$request->user()->isAdmin()) {
            unset($fields['is_deleted']);
        }

        if (isset($fields['password'])) {
            if (Hash::make($fields['old_password']) !== $user->password && !$request->user()->is_admin) {
                return response()->json([
                    'errors' => [
                        'old_password' => 'Old password does not match',
                    ],
                ], 422);
            }

            $fields['password'] = Hash::make($fields['password']);
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
     * @param Request $request
     * @param User $user
     * @throws Exception
     */
    public function destroy(Request $request, User $user)
    {
        if ($request->user()->is_admin) {
            $user->delete();
        } else {
            $user->update([
                'is_deleted' => true,
            ]);
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json(null, 204);
    }
}
