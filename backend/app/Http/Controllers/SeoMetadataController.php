<?php

namespace App\Http\Controllers;

use App\Models\SeoMetadata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SeoMetadataController extends Controller
{
    /**
     * Fetch SEO mapping for a specific frontend path.
     */
    public function getByRoute(Request $request)
    {
        $route = $request->query('route');
        
        if (!$route) {
            return response()->json(['error' => 'Route path is required'], 400);
        }

        // Extremely fast index lookup on a tiny table
        $seo = SeoMetadata::where('route_path', $route)->first();

        if ($seo) {
            return response()->json($seo);
        }

        return response()->json(['message' => 'No custom SEO mapping found'], 404);
    }

    /**
     * Admin: Fetch all mappings.
     */
    public function index()
    {
        $data = SeoMetadata::orderBy('route_path', 'asc')->get();
        return response()->json($data);
    }

    /**
     * Admin: Create or update mapping.
     */
    public function saveRecord(Request $request)
    {
        $request->validate([
            'route_path' => 'required|string',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        $seo = SeoMetadata::updateOrCreate(
            ['route_path' => $request->route_path],
            [
                'title' => $request->title,
                'description' => $request->description,
                'keywords' => $request->keywords,
            ]
        );

        // Cache busted on fetch directly, so no need for explicit Forget

        return response()->json(['message' => 'SEO Metadata saved successfully', 'data' => $seo]);
    }

    /**
     * Admin: Delete mapping.
     */
    public function destroy($id)
    {
        $seo = SeoMetadata::findOrFail($id);
        $seo->delete();

        return response()->json(['message' => 'Record deleted correctly']);
    }
}
