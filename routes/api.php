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

Route::post('js-ra-tokens-api/auth/login.php', [IndexController::class, 'Auth']);
Route::post('js-ra-tokens-api/auth/check.php', [IndexController::class, 'Check']);
Route::post('js-ra-tokens-api/auth/refresh.php', [IndexController::class, 'Refresh']);
Route::get('js-ra-tokens-api/articles.php', [IndexController::class, 'load']);
Route::delete('js-6-api/articles.php', [IndexController::class, 'delete']);
