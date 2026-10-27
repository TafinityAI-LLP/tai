<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('meetings:send-mail {id}', function ($id) {
    $meeting = \Illuminate\Support\Facades\DB::table('meetings')->where('id', $id)->first();
    if ($meeting) {
        \App\Http\Controllers\MeetingController::sendMeetingEmails($meeting);
        $this->info("Emails dispatched for meeting ID {$id}");
    }
})->purpose('Send instant dual emails for scheduled meeting');
