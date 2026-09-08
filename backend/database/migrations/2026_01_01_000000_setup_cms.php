<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('role')->default('admin');
            $table->string('api_token', 80)->unique()->nullable()->default(null);
            $table->timestamps();
        });
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('snippet')->nullable();
            $table->text('content');
            $table->string('author')->nullable();
            $table->text('imageUrl')->nullable();
            $table->string('status')->default('draft');
            $table->timestamp('publishedAt')->useCurrent();
            $table->timestamps();
        });
        Schema::create('casestudies', function (Blueprint $table) {
            $table->id();
            $table->string('client');
            $table->string('title');
            $table->text('challenge')->nullable();
            $table->text('solution')->nullable();
            $table->string('result')->nullable();
            $table->text('imageUrl')->nullable();
            $table->text('tags')->nullable();
            $table->timestamps();
        });
        Schema::create('portfolio', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('link')->nullable();
            $table->text('imageUrl')->nullable();
            $table->text('techStack')->nullable();
            $table->timestamps();
        });
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role')->nullable();
            $table->text('imageUrl')->nullable();
            $table->text('text');
            $table->integer('rating')->default(5);
            $table->timestamps();
        });
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type')->nullable();
            $table->string('location')->nullable();
            $table->string('salary')->nullable();
            $table->text('description');
            $table->string('status')->default('open');
            $table->timestamp('postedAt')->useCurrent();
            $table->timestamps();
        });
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('track')->nullable();
            $table->string('duration')->nullable();
            $table->string('startDate')->nullable();
            $table->text('syllabus')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });

        // Insert default admin
        DB::table('users')->insert([
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);
    }

    public function down() {
        Schema::dropIfExists('internships');
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('portfolio');
        Schema::dropIfExists('casestudies');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('users');
    }
};
