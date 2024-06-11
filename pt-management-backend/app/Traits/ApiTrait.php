<?php

namespace App\Traits;

trait ApiTrait {

    public function apiSuccess($message = '', $data = [], $status_code = 200) {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
            'status_code' => $status_code
        ]);
    }

    public function apiFailed($message = 'Something went wrong', $data = [], $status_code = 500) {
        return response()->json([
            'status' => false,
            'message' => $message,
            'data' => $data,
            'status_code' => $status_code
        ]);
    }
}