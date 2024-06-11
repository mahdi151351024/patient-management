<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Traits\ApiTrait;
use Illuminate\Support\Facades\Validator;

class PatientController extends Controller
{
    use ApiTrait;

    public function index() {
        try {
            $patients = Patient::paginate(10);
            return $this->apiSuccess('Patient list get successfully', $patients);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
    }

    public function store(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required | min:3',
                'phone' => 'required | min:11',
                'address' => 'required | min:3',
                'blood_group' => 'required',
                'weight' => 'required | integer',
                'age' => 'required | integer',
                'dob' => 'required',
                'gender' => 'required'
            ]);
            if($validator->fails()) return $this->apiFailed($validator->errors()->first(), [], 422);
            $patient = Patient::create($request->all());
            if($patient) return $this->apiSuccess('New patient added successfully', $patient);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
        
        
    }

    public function getById($id) {
        try {
            $patient = Patient::find($id);
            if(!$patient) return $this->apiSuccess('Data not found', null, 404);
            return $this->apiSuccess('Patient found successfully', $patient);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
    }

    public function update(Request $request) {
        try {

            $validator = Validator::make($request->all(), [
                'id' => 'required | integer',
                'name' => 'required | min:3',
                'phone' => 'required | min:11',
                'address' => 'required | min:3',
                'blood_group' => 'required',
                'weight' => 'required | integer',
                'age' => 'required | integer',
                'dob' => 'required',
                'gender' => 'required'
            ]);
            if($validator->fails()) return $this->apiFailed($validator->errors()->first(), [], 422);

            $patient = Patient::find($request->id);
            if(!$patient) return $this->apiSuccess('Data not found', null, 404);
            $patientUpdate = Patient::where('id', $request->id)->update($request->all());
            if($patientUpdate) return $this->apiSuccess('Patient updated successfully', $patientUpdate);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
    }

    public function delete($id) {
        try {
            $patient = Patient::find($id);
            if(!$patient) return $this->apiSuccess('Data not found', null, 404);
            if($patient->delete()) return $this->apiSuccess('Patient deleted successfully', null);
        } catch(\Exception $e) {
            return $this->apiFailed($e->getMessage());
        }
    }
}
