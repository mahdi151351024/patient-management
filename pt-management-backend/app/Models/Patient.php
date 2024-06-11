<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
                'name',
                'phone',
                'address',
                'blood_group',
                'weight',
                'age',
                'dob',
                'gender'
            ];
}
