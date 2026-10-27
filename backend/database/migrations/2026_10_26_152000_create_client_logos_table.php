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
        if (!Schema::hasTable('client_logos')) {
            Schema::create('client_logos', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('logo_url');
                $table->string('website_url')->nullable();
                $table->integer('display_order')->default(0);
                $table->string('status')->default('active');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_logos');
    }
};
