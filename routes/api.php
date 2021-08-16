<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;

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

Route::post('js-6-api/auth.php', [IndexController::class, 'Auth']);
Route::get('js-6-api/articles.php', [IndexController::class, 'load']);
Route::delete('js-6-api/articles.php', [IndexController::class, 'delete']);
