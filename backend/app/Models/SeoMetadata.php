<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoMetadata extends Model
{
    use HasFactory;

    protected $fillable = [
        'route_path',
        'title',
        'description',
        'keywords'
    ];
}
