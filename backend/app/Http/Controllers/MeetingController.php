<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

require_once base_path('PHPMailer/Exception.php');
require_once base_path('PHPMailer/PHPMailer.php');
require_once base_path('PHPMailer/SMTP.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MeetingController extends Controller
{
    /**
     * Store a newly created meeting booking and trigger instant asynchronous dual notification emails.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'required|string|max:50',
            'service'          => 'required|string|max:255',
            'staff'            => 'nullable|string|max:255',
            'meeting_date'     => 'required|date',
            'meeting_time'     => 'required|string|max:50',
            'is_custom_time'   => 'nullable|boolean',
            'special_requests' => 'nullable|string|max:2000',
        ]);

        $staff = !empty($validated['staff']) ? $validated['staff'] : 'Anyone';
        $isCustom = !empty($validated['is_custom_time']) ? true : false;
        $specialRequests = $validated['special_requests'] ?? '';

        try {
            $meetingId = DB::table('meetings')->insertGetId([
                'name'             => $validated['name'],
                'email'            => $validated['email'],
                'phone'            => $validated['phone'],
                'service'          => $validated['service'],
                'staff'            => $staff,
                'meeting_date'     => $validated['meeting_date'],
                'meeting_time'     => $validated['meeting_time'],
                'is_custom_time'   => $isCustom,
                'special_requests' => $specialRequests,
                'status'           => 'Confirmed',
                'created_at'       => now(),
                'updated_at'       => now(),
            ]);

            $meeting = DB::table('meetings')->where('id', $meetingId)->first();

            // Trigger ultra-fast background email worker (returns in ~200ms without blocking user)
            $artisanPath = base_path('artisan');
            $cmd = 'cmd /c start /B php ' . escapeshellarg($artisanPath) . ' meetings:send-mail ' . (int)$meetingId . ' > NUL 2>&1';
            
            // Non-blocking background dispatch
            if (function_exists('popen') && function_exists('pclose')) {
                @pclose(@popen($cmd, 'r'));
            } else {
                // Fallback direct dispatch if popen is disabled in php.ini
                self::sendMeetingEmails($meeting);
            }

            return response()->json([
                'success' => true,
                'message' => 'Your meeting has been scheduled successfully! Confirmation email has been sent.',
                'meeting' => $meeting
            ], 201);

        } catch (\Exception $e) {
            Log::error('Meeting Booking Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error'   => 'Failed to schedule meeting: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Dispatch dual emails: Client confirmation and Admin notification.
     * Uses SMTPKeepAlive = true to send BOTH emails on a single authenticated SMTP connection.
     */
    public static function sendMeetingEmails($meeting)
    {
        $formattedDate = date('D, d M Y', strtotime($meeting->meeting_date));
        $adminEmail = 'kk6940033@gmail.com';
        $smtpPass   = 'neczcyxjvvfmvbuv';

        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host          = 'smtp.gmail.com';
            $mail->SMTPAuth      = true;
            $mail->Username      = $adminEmail;
            $mail->Password      = $smtpPass;
            $mail->SMTPSecure    = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port          = 587;
            $mail->Timeout       = 8;
            $mail->CharSet       = 'UTF-8';
            $mail->SMTPKeepAlive = true; // REUSE CONNECTION FOR MAXIMUM SPEED

            // ── 1. SEND CLIENT CONFIRMATION EMAIL (PREMIUM LIGHT THEME) ──
            $mail->setFrom($adminEmail, 'Tafinity AI');
            $mail->addAddress($meeting->email, $meeting->name);
            $mail->addReplyTo($adminEmail, 'Tafinity AI Support');

            $mail->isHTML(true);
            $mail->Subject = 'Confirmed: Meeting with Tafinity AI - ' . $meeting->service;
            
            $clientHtml = '
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Meeting Confirmation - Tafinity AI</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 30px 15px; }
                .email-wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); }
                .brand-bar { height: 6px; background: linear-gradient(90deg, #be185d 0%, #ec4899 50%, #831843 100%); }
                .header { padding: 32px 32px 20px 32px; text-align: center; background: #ffffff; }
                .logo-text { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; margin: 0; }
                .logo-accent { color: #be185d; }
                .tagline { font-size: 13px; color: #64748b; margin-top: 4px; font-weight: 500; }
                .status-badge { display: inline-block; background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 18px; }
                .content { padding: 10px 32px 32px 32px; }
                .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
                .intro-text { font-size: 14.5px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
                .summary-card { background: #fafafa; border: 1px solid #f1f5f9; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
                .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 11px 0; border-bottom: 1px solid #e2e8f0; }
                .summary-row:last-child { border-bottom: none; }
                .summary-label { font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
                .summary-value { font-size: 14px; font-weight: 600; color: #0f172a; text-align: right; }
                .staff-pill { background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-block; }
                .instructions-card { background: #f8fafc; border-left: 4px solid #be185d; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
                .instructions-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
                .instructions-body { font-size: 13.5px; line-height: 1.55; color: #475569; margin: 0; }
                .special-box { background: #fdf2f8; border: 1px dashed #f472b6; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: #831843; }
                .btn-cta { display: inline-block; background: linear-gradient(135deg, #be185d 0%, #9d174d 100%); color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 999px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 12px rgba(190, 24, 93, 0.25); text-align: center; }
                .footer { padding: 24px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6; }
                .footer a { color: #be185d; text-decoration: none; font-weight: 600; }
              </style>
            </head>
            <body>
              <div class="email-wrapper">
                <div class="brand-bar"></div>
                <div class="header">
                  <div class="logo-text">Tafinity<span class="logo-accent">AI</span></div>
                  <div class="tagline">Strategic Technology & AI Consulting</div>
                  <div>
                    <span class="status-badge">&#10003; Appointment Confirmed</span>
                  </div>
                </div>

                <div class="content">
                  <div class="greeting">Hello ' . htmlspecialchars($meeting->name) . ',</div>
                  <p class="intro-text">
                    Your appointment has been confirmed! Our team is excited to meet with you and discuss how we can help elevate your technology, automations, and digital growth.
                  </p>

                  <div class="summary-card">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Service</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 700; text-align: right;">' . htmlspecialchars($meeting->service) . '</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Consultant</td>
                        <td style="padding: 10px 0; text-align: right;"><span class="staff-pill">' . htmlspecialchars($meeting->staff) . '</span></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Date</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">' . $formattedDate . '</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #edf2f7;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Time Slot</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">' . htmlspecialchars($meeting->meeting_time) . ' (30 min)</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase;">Contact Number</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">' . htmlspecialchars($meeting->phone) . '</td>
                      </tr>
                    </table>
                  </div>

                  <div class="instructions-card">
                    <div class="instructions-title">Meeting Mode & Instructions</div>
                    <p class="instructions-body">
                      This session will be conducted online via Video Conference (Google Meet / Zoom). An interactive meeting link will be shared prior to the session, or our representative will directly connect with you at <strong>' . htmlspecialchars($meeting->phone) . '</strong>.
                    </p>
                  </div>

                  ' . (!empty($meeting->special_requests) ? '<div class="special-box"><strong>Your Special Notes:</strong><br>' . nl2br(htmlspecialchars($meeting->special_requests)) . '</div>' : '') . '

                  <div style="text-align: center; margin: 28px 0 10px 0;">
                    <a href="tel:+918005006933" class="btn-cta">&#128222; Need Urgent Assistance? Call Us</a>
                  </div>
                </div>

                <div class="footer">
                  <strong>Tafinity AI</strong> &bull; Building Smarter, Automating Better, Growing Faster<br>
                  Phone: <a href="tel:+918005006933">+91-8005006933</a> &bull; WhatsApp: <a href="https://wa.me/918005006933">+91-8005006933</a><br>
                  Support: <a href="mailto:kk6940033@gmail.com">kk6940033@gmail.com</a>
                </div>
              </div>
            </body>
            </html>';

            $mail->Body = $clientHtml;
            $mail->AltBody = "Hello {$meeting->name},\n\nYour meeting for {$meeting->service} with Tafinity AI is confirmed for {$formattedDate} at {$meeting->meeting_time} with {$meeting->staff}.\n\nContact: +91-8005006933";
            $mail->send();

            // ── 2. SEND ADMIN ALERT ON SAME CONNECTION (PREMIUM LIGHT THEME) ──
            $mail->clearAddresses();
            $mail->clearReplyTos();
            $mail->setFrom($adminEmail, 'Tafinity AI Booking Engine');
            $mail->addAddress($adminEmail, 'Admin');

            $mail->Subject = '⚡ New Meeting Booking: ' . $meeting->name . ' - ' . $meeting->service;

            $cleanPhone = preg_replace('/[^0-9]/', '', $meeting->phone);

            $adminHtml = '
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Meeting Booking Received</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #1e293b; margin: 0; padding: 30px 15px; }
                .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); }
                .top-bar { height: 6px; background: linear-gradient(90deg, #be185d 0%, #ec4899 50%, #831843 100%); }
                .header { padding: 30px 32px 20px 32px; background: #ffffff; }
                .badge { display: inline-block; background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 5px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
                .title { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; letter-spacing: -0.3px; }
                .subtitle { font-size: 13.5px; color: #64748b; margin: 0; }
                .content { padding: 10px 32px 32px 32px; }
                .details-table { width: 100%; border-collapse: collapse; background: #fafafa; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; margin: 20px 0; }
                .details-table td { padding: 13px 18px; border-bottom: 1px solid #edf2f7; font-size: 13.5px; vertical-align: middle; }
                .details-table tr:last-child td { border-bottom: none; }
                .label-col { width: 34%; font-weight: 600; color: #64748b; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
                .val-col { width: 66%; font-weight: 600; color: #0f172a; }
                .pill { display: inline-block; background: #fdf2f8; color: #be185d; border: 1px solid #fbcfe8; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
                .custom-tag { display: inline-block; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; margin-left: 6px; }
                .notes-card { background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #92400e; }
                .actions { margin-top: 28px; text-align: center; }
                .btn { display: inline-block; padding: 11px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; margin: 4px 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
                .btn-call { background: #16a34a; color: #ffffff !important; }
                .btn-wa { background: #25d366; color: #ffffff !important; }
                .btn-mail { background: #be185d; color: #ffffff !important; }
                .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.5; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="top-bar"></div>
                <div class="header">
                  <span class="badge">&#9889; New Booking Notification</span>
                  <h1 class="title">New Meeting Booking Received</h1>
                  <p class="subtitle">A client has scheduled an appointment via Tafinity AI website.</p>
                </div>

                <div class="content">
                  <table class="details-table">
                    <tr>
                      <td class="label-col">Client Name</td>
                      <td class="val-col"><strong style="font-size: 15px; color: #0f172a;">' . htmlspecialchars($meeting->name) . '</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">Service</td>
                      <td class="val-col"><strong style="color: #be185d;">' . htmlspecialchars($meeting->service) . '</strong></td>
                    </tr>
                    <tr>
                      <td class="label-col">Staff Member</td>
                      <td class="val-col"><span class="pill">' . htmlspecialchars($meeting->staff) . '</span></td>
                    </tr>
                    <tr>
                      <td class="label-col">Date</td>
                      <td class="val-col">' . $formattedDate . '</td>
                    </tr>
                    <tr>
                      <td class="label-col">Time</td>
                      <td class="val-col">
                        ' . htmlspecialchars($meeting->meeting_time) . ' (30 min)
                        ' . ($meeting->is_custom_time ? '<span class="custom-tag">Custom Time</span>' : '') . '
                      </td>
                    </tr>
                    <tr>
                      <td class="label-col">Client Email</td>
                      <td class="val-col"><a href="mailto:' . htmlspecialchars($meeting->email) . '" style="color: #be185d; text-decoration: none; font-weight: 600;">' . htmlspecialchars($meeting->email) . '</a></td>
                    </tr>
                    <tr>
                      <td class="label-col">Client Phone</td>
                      <td class="val-col"><a href="tel:' . htmlspecialchars($meeting->phone) . '" style="color: #0284c7; text-decoration: none; font-weight: 600;">' . htmlspecialchars($meeting->phone) . '</a></td>
                    </tr>
                    <tr>
                      <td class="label-col">Booking Time</td>
                      <td class="val-col" style="color: #64748b; font-size: 13px;">' . now()->toDayDateTimeString() . '</td>
                    </tr>
                  </table>

                  ' . (!empty($meeting->special_requests) ? '<div class="notes-card"><strong>Special Client Requests / Notes:</strong><br>' . nl2br(htmlspecialchars($meeting->special_requests)) . '</div>' : '') . '

                  <div class="actions">
                    <a href="tel:' . htmlspecialchars($meeting->phone) . '" class="btn btn-call">&#128222; Call Client</a>
                    <a href="https://wa.me/' . $cleanPhone . '" class="btn btn-wa" target="_blank">&#128172; WhatsApp Client</a>
                    <a href="mailto:' . htmlspecialchars($meeting->email) . '" class="btn btn-mail">&#9993; Email Client</a>
                  </div>
                </div>

                <div class="footer">
                  Tafinity AI Consultation Platform &bull; Automated System Dispatch<br>
                  To view all bookings, check the admin dashboard or database.
                </div>
              </div>
            </body>
            </html>';

            $mail->Body = $adminHtml;
            $mail->AltBody = "New Meeting Booking:\nName: {$meeting->name}\nEmail: {$meeting->email}\nPhone: {$meeting->phone}\nService: {$meeting->service}\nStaff: {$meeting->staff}\nDate: {$formattedDate}\nTime: {$meeting->meeting_time}";
            $mail->send();

            $mail->smtpClose();

        } catch (Exception $e) {
            Log::error('Meeting Email Notification Failed: ' . $e->getMessage());
        }
    }

    /**
     * Admin: Get all meetings list.
     */
    public function index()
    {
        $meetings = DB::table('meetings')->orderBy('meeting_date', 'desc')->orderBy('created_at', 'desc')->get();
        return response()->json($meetings);
    }
}
