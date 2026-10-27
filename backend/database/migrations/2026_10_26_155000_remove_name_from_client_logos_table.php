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
        Schema::table('client_logos', function (Blueprint $table) {
            if (Schema::hasColumn('client_logos', 'name')) {
                $table->dropColumn('name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('client_logos', function (Blueprint $table) {
            if (!Schema::hasColumn('client_logos', 'name')) {
                $table->string('name')->nullable();
            }
        });
    }
};
