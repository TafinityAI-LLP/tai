<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'message' => 'Laravel CMS Backend Running']);
});

Route::post('/auth/login', function (Request $request) {
    try {
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
        return response()->json(['error' => $e->getMessage()], 500);
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

$tables = ['blogs', 'casestudies', 'portfolio', 'testimonials', 'jobs', 'internships'];

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
        'traffic' => $trafficData
    ]);
});

// Open GET Routes
foreach ($tables as $table) {
    Route::get("/{$table}", function () use ($table) {
        return response()->json(DB::table($table)->get());
    });

    Route::get("/{$table}/{id}", function ($id) use ($table) {
        $record = DB::table($table)->where('id', $id)->first();
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
