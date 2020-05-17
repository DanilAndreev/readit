<?php

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

Route::post('auth/login', 'Auth\LoginController@login');
Route::post('auth/register', 'Auth\RegisterController@register');
Route::post('auth/logout', 'Auth\LoginController@logout');

Route::get('users/me', 'UserController@me');
Route::post('users/{user}/avatar', 'UserController@avatar');

Route::apiResource('users', 'UserController');

Route::apiResource('categories', 'CategoryController')->only(['index', 'show']);

Route::get('questions/my', 'QuestionController@my');
Route::get('questions/commented', 'QuestionController@commented');
Route::get('questions/top10', 'QuestionController@top10');
Route::apiResource('questions', 'QuestionController');

Route::apiResource('questions.replies', 'ReplyController')->shallow()->except(['show']);
Route::post('questions/{question}/replies/{reply}/markAsAnswer', 'ReplyController@markAsAnswer');
