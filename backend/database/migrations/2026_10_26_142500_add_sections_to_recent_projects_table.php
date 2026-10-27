<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('recent_projects', function (Blueprint $table) {
            if (!Schema::hasColumn('recent_projects', 'sections')) {
                $table->longText('sections')->nullable()->after('summary');
            }
            if (!Schema::hasColumn('recent_projects', 'project_type')) {
                $table->string('project_type')->nullable()->default('website')->after('category');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recent_projects', function (Blueprint $table) {
            if (Schema::hasColumn('recent_projects', 'sections')) {
                $table->dropColumn('sections');
            }
            if (Schema::hasColumn('recent_projects', 'project_type')) {
                $table->dropColumn('project_type');
            }
        });
    }
};
