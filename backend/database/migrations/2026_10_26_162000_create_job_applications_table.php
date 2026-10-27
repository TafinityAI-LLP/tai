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
        if (!Schema::hasTable('job_applications')) {
            Schema::create('job_applications', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email');
                $table->string('phone');
                $table->string('role_title');
                $table->string('role_type')->default('job'); // 'job' or 'internship'
                $table->string('resume_url')->nullable();
                $table->string('portfolio_url')->nullable();
                $table->string('experience')->nullable();
                $table->text('message')->nullable();
                $table->string('status')->default('Pending'); // 'Pending', 'Shortlisted', 'Interview', 'Hired', 'Rejected'
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
