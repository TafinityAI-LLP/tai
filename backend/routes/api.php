<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Schema;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'message' => 'Laravel CMS Backend Running']);
});

// Dynamic SEO Endpoints
use App\Http\Controllers\SeoMetadataController;
use App\Http\Controllers\MeetingController;

Route::get('/seo', [SeoMetadataController::class, 'getByRoute']);
Route::post('/meetings', [MeetingController::class, 'store']);
Route::get('/meetings', [MeetingController::class, 'index']);

Route::post('/contact', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'phone' => 'nullable|string|max:50',
        'enquiry_type' => 'nullable|string|max:100',
        'message' => 'nullable|string'
    ]);
    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()->first()], 422);
    }
    return response()->json([
        'success' => true,
        'message' => 'Thank you for reaching out! Our team will contact you within 2 hours.'
    ]);
});

use App\Http\Middleware\CheckAdminToken;

Route::middleware([CheckAdminToken::class])->group(function () {
    Route::get('/admin/seo', [SeoMetadataController::class, 'index']);
    Route::post('/admin/seo', [SeoMetadataController::class, 'saveRecord']);
    Route::put('/admin/seo/{id}', [SeoMetadataController::class, 'saveRecord']);
    Route::delete('/admin/seo/{id}', [SeoMetadataController::class, 'destroy']);
});

Route::post('/auth/login', function (Request $request) {
    try {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:100',
            'password' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Please provide valid credentials'], 422);
        }

        $user = DB::table('users')->where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        
        $plainToken = bin2hex(random_bytes(32));
        DB::table('users')->where('id', $user->id)->update(['api_token' => hash('sha256', $plainToken)]);
        
        return response()->json([
            'token' => $plainToken,
            'username' => $user->username
        ]);
    } catch(\Exception $e) {
        return response()->json(['error' => 'Authentication service error: ' . $e->getMessage()], 500);
    }
});

Route::post('/upload', function (Request $request) {
    $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
    if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $url = url('/uploads/' . $filename);
        return response()->json(['url' => $url]);
    }
    return response()->json(['error' => 'No file uploaded'], 400);
});

$tables = ['blogs', 'casestudies', 'portfolio', 'testimonials', 'jobs', 'internships', 'recent_projects', 'client_logos', 'job_applications'];

Route::post('/track', function (Request $request) {
    if (!$request->input('session_id')) return response()->json(['error' => 'Missing session id']);
    
    DB::table('page_views')->insert([
        'session_id' => $request->input('session_id'),
        'page_url' => $request->input('url', '/'),
        'view_date' => now()->toDateString(),
        'created_at' => now(),
        'updated_at' => now()
    ]);
    return response()->json(['status' => 'tracked']);
});

Route::get('/stats', function (Request $request) {
    $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
    if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    
    $durationStr = $request->query('duration', '7d');
    $days = 7;
    if ($durationStr === '30d') $days = 30;
    if ($durationStr === '1y') $days = 365;
    if ($durationStr === 'all') $days = 3650;
    
    $startDate = now()->subDays($days)->toDateString();
    
    $trafficDataRaw = DB::table('page_views')
        ->where('view_date', '>=', $startDate)
        ->selectRaw('view_date as date, COUNT(*) as pageviews, COUNT(DISTINCT session_id) as visitors')
        ->groupBy('view_date')
        ->orderBy('view_date', 'asc')
        ->get();
        
    $trafficData = $trafficDataRaw->map(function ($row) use ($durationStr) {
        $dateObj = \Carbon\Carbon::parse($row->date);
        return [
            'date' => ($durationStr === '1y' || $durationStr === 'all') ? $dateObj->format('M Y') : $dateObj->format('M d'),
            'visitors' => $row->visitors,
            'pageviews' => $row->pageviews
        ];
    });

    if ($durationStr === '1y' || $durationStr === 'all') {
        $trafficData = $trafficData->groupBy('date')->map(function ($items, $key) {
            return [
                'date' => $key,
                'visitors' => $items->sum('visitors'),
                'pageviews' => $items->sum('pageviews'),
            ];
        })->values();
    }
    
    return response()->json([
        'blogs' => DB::table('blogs')->where('status', 'published')->count(),
        'casestudies' => DB::table('casestudies')->count(),
        'portfolio' => DB::table('portfolio')->count(),
        'testimonials' => DB::table('testimonials')->count(),
        'jobs' => DB::table('jobs')->where('status', 'open')->count(),
        'internships' => DB::table('internships')->where('status', 'active')->count(),
        'applications' => DB::table('job_applications')->count(),
        'applications_pending' => DB::table('job_applications')->where('status', 'Pending')->count(),
        'traffic' => $trafficData
    ]);
});

// Open GET Routes
Route::get('/public/recent-projects', function () {
    $projects = DB::table('recent_projects')
        ->where('status', 'Active')
        ->orderBy('display_order', 'asc')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($proj) {
            if (!empty($proj->sections) && is_string($proj->sections)) {
                $decoded = json_decode($proj->sections, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $proj->sections = $decoded;
                }
            }
            return $proj;
        });
    return response()->json($projects);
});

Route::get('/public/client-logos', function () {
    $logos = DB::table('client_logos')
        ->where('status', 'active')
        ->orderBy('display_order', 'asc')
        ->orderBy('created_at', 'desc')
        ->get();
    return response()->json($logos);
});

Route::post('/careers/apply', function (Request $request) {
    try {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'role_title' => 'required|string|max:255',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:15360'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 422);
        }

        $resumeUrl = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filename = time() . '_' . preg_replace('/[^a-zA-Z0-9_\.-]/', '_', $file->getClientOriginalName());
            $uploadPath = public_path('uploads/resumes');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }
            $file->move($uploadPath, $filename);
            $resumeUrl = url('/uploads/resumes/' . $filename);
        }

        $id = DB::table('job_applications')->insertGetId([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'role_title' => $request->input('role_title'),
            'role_type' => $request->input('role_type', 'job'),
            'resume_url' => $resumeUrl,
            'portfolio_url' => $request->input('portfolio_url'),
            'experience' => $request->input('experience'),
            'message' => $request->input('message'),
            'status' => 'Pending',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Application submitted successfully!',
            'id' => $id,
            'resume_url' => $resumeUrl
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

foreach ($tables as $table) {
    Route::get("/{$table}", function () use ($table) {
        $records = DB::table($table)->get();
        if ($table === 'recent_projects') {
            $records = $records->map(function ($row) {
                if (!empty($row->sections) && is_string($row->sections)) {
                    $decoded = json_decode($row->sections, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $row->sections = $decoded;
                    }
                }
                return $row;
            });
        }
        return response()->json($records);
    });

    Route::get("/{$table}/{id}", function ($id) use ($table) {
        $record = DB::table($table)->where('id', $id)->first();
        if ($record && $table === 'recent_projects' && !empty($record->sections) && is_string($record->sections)) {
            $decoded = json_decode($record->sections, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $record->sections = $decoded;
            }
        }
        return $record ? response()->json($record) : response()->json(['error' => 'Not found'], 404);
    });
}

// Protected Modification Routes
Route::group([], function () use ($tables) {
    foreach ($tables as $table) {
        Route::post("/{$table}", function (Request $request) use ($table) {
            $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
            if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            try {
                $data = $request->all();
                unset($data['id']);
                if (isset($data['sections']) && is_array($data['sections'])) {
                    $data['sections'] = json_encode($data['sections']);
                }
                if (Schema::hasColumn($table, 'created_at') && !isset($data['created_at'])) {
                    $data['created_at'] = now();
                }
                if (Schema::hasColumn($table, 'updated_at') && !isset($data['updated_at'])) {
                    $data['updated_at'] = now();
                }
                $id = DB::table($table)->insertGetId($data);
                $data['id'] = $id;
                return response()->json($data);
            } catch(\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        });

        Route::put("/{$table}/{id}", function (Request $request, $id) use ($table) {
            $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
            if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            try {
                $data = $request->all();
                unset($data['id']);
                if (isset($data['sections']) && is_array($data['sections'])) {
                    $data['sections'] = json_encode($data['sections']);
                }
                if (Schema::hasColumn($table, 'updated_at')) {
                    $data['updated_at'] = now();
                }
                DB::table($table)->where('id', $id)->update($data);
                $data['id'] = $id;
                return response()->json($data);
            } catch(\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        });

        Route::delete("/{$table}/{id}", function (Request $request, $id) use ($table) {
            $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
            if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            try {
                DB::table($table)->where('id', $id)->delete();
                return response()->json(['success' => true, 'id' => $id]);
            } catch(\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        });
    }
});
