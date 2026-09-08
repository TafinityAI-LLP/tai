<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization', ''));
        if (!$token || !DB::table('users')->where('api_token', hash('sha256', $token))->exists()) {
            return response()->json(['error' => 'Unauthorized Access'], 401);
        }
        return $next($request);
    }
}
