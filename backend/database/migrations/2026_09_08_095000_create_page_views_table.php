<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->string('session_id');
            $table->string('page_url');
            $table->date('view_date');
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('page_views');
    }
};
