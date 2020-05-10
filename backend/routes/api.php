<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Auth\LoginController@login')->middleware('web');
Route::post('auth/register', 'Auth\RegisterController@register');

Route::apiResource('categories', 'CategoryController');
Route::apiResource('questions', 'QuestionController');
Route::apiResource('questions.replies', 'ReplyController')->shallow();

Route::middleware('auth')
    ->middleware('web')
    ->get('/user', function (Request $request) {
        var_dump($request->user());
    });

Route::post('auth/logout', 'Auth\LoginController@logout')->middleware('web')->middleware('auth');
