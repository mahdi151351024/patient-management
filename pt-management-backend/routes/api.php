<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {

    Route::get('/logout', [AuthController::class, 'logout']);

    // Patient
    Route::get('/patients', [PatientController::class, 'index']);
    Route::post('/patient/add', [PatientController::class, 'store']);
    Route::get('/patient/{id}', [PatientController::class, 'getById']);
    Route::post('/patient/update', [PatientController::class, 'update']);
    Route::get('/patient/delete/{id}', [PatientController::class, 'delete']);

});