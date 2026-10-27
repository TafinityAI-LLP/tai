import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar as CalendarIcon, 
    Clock, 
    User, 
    Mail, 
    Phone, 
    Check, 
    Globe, 
    ChevronLeft, 
    ChevronRight, 
    CheckCircle2, 
    ArrowRight, 
    Sparkles, 
    X,
    CalendarCheck,
    MessageSquare,
    ExternalLink,
    Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

// 11 Services from user requirements
const SERVICES = [
    { id: 'web-dev', name: 'Web Design & Development', duration: '30 min' },
    { id: 'mobile-app', name: 'Mobile App Development', duration: '30 min' },
    { id: 'software-dev', name: 'Software Development', duration: '30 min' },
    { id: 'digital-marketing', name: 'Digital Marketing', duration: '30 min' },
    { id: 'social-media', name: 'Social Media Marketing', duration: '30 min' },
    { id: 'content-marketing', name: 'Content Marketing', duration: '30 min' },
    { id: 'seo', name: 'SEO Optimization', duration: '30 min' },
    { id: 'crm', name: 'CRM Software', duration: '30 min' },
    { id: 'hrms', name: 'HRMS System', duration: '30 min' },
    { id: 'lms', name: 'LMS Software', duration: '30 min' },
    { id: 'ecommerce', name: 'Ecommerce Platforms', duration: '30 min' },
];

// Staff members as requested
const STAFF_MEMBERS = [
    'Anyone',
    'Krishn Kumar Soni',
    'Ameesha',
    'Isha',
    'Pallavi'
];

// Predefined Time Slots
const TIME_SLOTS = [
    '9:00 AM', '9:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM',
    '1:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM',
    '5:30 PM', '6:00 PM'
];

const ScheduleMeeting = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    // Current date helpers
    const today = new Date();
    
    // Sequential State Management:
    // Step 1: Option 1 - Select Service (must be selected first)
    const [selectedService, setSelectedService] = useState('');
    const [selectedStaff, setSelectedStaff] = useState('Anyone');
    
    // Calendar Navigation State
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed
    
    // Step 2: Option 2 - Date & Time (must be selected after Option 1)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [isCustomTime, setIsCustomTime] = useState(false);
    
    // Clock Watch Modal State
    const [showClockModal, setShowClockModal] = useState(false);
    const [clockHour, setClockHour] = useState(10);
    const [clockMinute, setClockMinute] = useState(30);
    const [clockPeriod, setClockPeriod] = useState('AM');

    // Client Form State (must be filled after Option 1 & Option 2)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
    });

    // Submission State
    const [loading, setLoading] = useState(false);
    const [submittedBooking, setSubmittedBooking] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Step Completion Status
    const isStep1Done = Boolean(selectedService);
    const isStep2Done = Boolean(isStep1Done && selectedDate && selectedTime);

    // Calendar Calculations
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const prevMonth = () => {
        if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) return;
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonth(prev => prev - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(prev => prev + 1);
        } else {
            setCurrentMonth(prev => prev + 1);
        }
    };

    // Step 1 Selection Handler
    const handleServiceSelect = (serviceName) => {
        setSelectedService(serviceName);
        setErrorMessage('');
        // Smoothly auto-scroll to Step 2
        setTimeout(() => {
            const el = document.getElementById('step-2-section');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 150);
    };

    // Step 2 Date Selection Handler
    const handleDateClick = (day) => {
        if (!isStep1Done) return;
        const target = new Date(currentYear, currentMonth, day);
        const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (target < todayZero) return; // Disable past dates
        setSelectedDate(target);
        setErrorMessage('');
        // If time is already picked, auto scroll to Form
        if (selectedTime) {
            setTimeout(() => {
                const el = document.getElementById('step-3-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    };

    // Step 2 Time Selection Handler
    const handleTimeSelect = (slot) => {
        if (!isStep1Done) return;
        setSelectedTime(slot);
        setIsCustomTime(false);
        setErrorMessage('');
        // If date is selected, auto scroll to Form
        if (selectedDate) {
            setTimeout(() => {
                const el = document.getElementById('step-3-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    };

    // Format helper: YYYY-MM-DD
    const formatDateForApi = (date) => {
        if (!date) return '';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Readable date: e.g. "Wednesday, 28 Oct 2026"
    const formatReadableDate = (date) => {
        if (!date) return 'Select Date';
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Clock modal apply
    const handleApplyCustomTime = () => {
        const formattedHour = clockHour.toString();
        const formattedMin = clockMinute.toString().padStart(2, '0');
        const customTimeStr = `${formattedHour}:${formattedMin} ${clockPeriod}`;
        setSelectedTime(customTimeStr);
        setIsCustomTime(true);
        setShowClockModal(false);
        setErrorMessage('');
        if (selectedDate) {
            setTimeout(() => {
                const el = document.getElementById('step-3-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    };

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!selectedService) {
            setErrorMessage('Please complete Option 1: Select Service first.');
            const el = document.getElementById('step-1-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (!selectedDate || !selectedTime) {
            setErrorMessage('Please complete Option 2: Select Date and Time Slot first.');
            const el = document.getElementById('step-2-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
            setErrorMessage('Please fill in all required fields (Name, Email, Mobile Number).');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                service: selectedService,
                staff: selectedStaff,
                meeting_date: formatDateForApi(selectedDate),
                meeting_time: selectedTime,
                is_custom_time: isCustomTime,
                special_requests: formData.specialRequests.trim()
            };

            const response = await fetch('/api/meetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmittedBooking(data.meeting || payload);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage(data.error || 'Failed to confirm booking. Please try again or reach out directly.');
            }
        } catch (err) {
            setErrorMessage('Network error occurred. Please verify your connection or call us at +91-8005006933.');
        } finally {
            setLoading(false);
        }
    };

    // Analog clock angle helpers
    const hourAngle = ((clockHour % 12) + clockMinute / 60) * 30; // 360 / 12 = 30 deg
    const minuteAngle = clockMinute * 6; // 360 / 60 = 6 deg

    return (
        <div className="min-h-screen bg-[#fcf9fb] text-slate-800 font-sans pb-24">
            <Helmet>
                <title>Schedule a Meeting | Tafinity AI Consultation</title>
                <meta name="description" content="Book a one-on-one strategy session with Tafinity AI experts. Select your service, date, and time for instant confirmation." />
            </Helmet>

            {/* Top Hero / Header with Deep Magenta Accents & Safe Navbar Spacing */}
            <div 
                className="relative pt-24 sm:pt-32 md:pt-36 pb-8 sm:pb-12 px-3.5 sm:px-6 lg:px-8 overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, #fdf2f8 0%, #fbf4f9 55%, #fcf9fb 100%)',
                    borderBottom: '1px solid rgba(190, 24, 93, 0.08)'
                }}
            >
                {/* Background decorative glows */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] rounded-full bg-pink-400/10 blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-[#be185d] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-[#be185d]" />
                        Direct Consultation Booking
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-2.5 sm:mb-3 text-slate-900 leading-tight">
                        Schedule Your Strategy <span style={{ background: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Meeting</span>
                    </h1>
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed px-2">
                        Reserve a 30-minute high-impact session with our tech & growth specialists. Choose your domain, pick your preferred slot, and get instant calendar confirmation.
                    </p>

                    {/* Quick Contacts Bar */}
                    <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                        <a 
                            href="tel:+918005006933" 
                            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-pink-50 text-slate-700 transition-all border border-pink-200 shadow-xs font-medium text-xs sm:text-sm"
                        >
                            <Phone className="w-3.5 h-3.5 text-[#be185d]" />
                            +91-8005006933
                        </a>
                        <a 
                            href="https://wa.me/918005006933" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 transition-all border border-emerald-200 text-emerald-700 shadow-xs font-medium text-xs sm:text-sm"
                        >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            WhatsApp Direct
                        </a>
                        <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-pink-200 text-slate-600 shadow-xs text-xs sm:text-sm">
                            <Clock className="w-3.5 h-3.5 text-[#be185d]" />
                            Instant Email Confirmation
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mt-5 sm:mt-8">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-pink-950/5 border border-pink-100 overflow-hidden">
                    
                    {/* SUCCESS CONFIRMATION VIEW */}
                    {submittedBooking ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="p-6 sm:p-12 text-center"
                        >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-pink-50 border-4 border-pink-100 flex items-center justify-center mb-5 sm:mb-6">
                                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#be185d]" />
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-100 text-[#be185d] mb-2">
                                Booking Confirmed
                            </span>

                            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                                Your Meeting is Confirmed!
                            </h2>
                            <p className="text-gray-600 max-w-lg mx-auto text-xs sm:text-base mb-6 sm:mb-8 px-2">
                                A confirmation with meeting details and video link has been sent to <strong className="text-gray-900 break-all">{submittedBooking.email}</strong>.
                            </p>

                            {/* Booking Summary Card */}
                            <div className="max-w-md mx-auto bg-gradient-to-br from-pink-50/50 to-white border border-pink-200/80 rounded-xl p-4 sm:p-6 text-left shadow-sm mb-6 sm:mb-8 space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
                                <div className="flex justify-between items-center border-b border-pink-100 pb-2.5">
                                    <span className="text-gray-500 font-medium">Service</span>
                                    <span className="font-semibold text-gray-900 text-right">{submittedBooking.service}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-pink-100 pb-2.5">
                                    <span className="text-gray-500 font-medium">Consultant</span>
                                    <span className="font-semibold text-[#be185d] bg-pink-100/60 px-2 py-0.5 rounded text-xs">
                                        {submittedBooking.staff}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-pink-100 pb-2.5">
                                    <span className="text-gray-500 font-medium">Date</span>
                                    <span className="font-semibold text-gray-900">
                                        {formatReadableDate(selectedDate)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-b border-pink-100 pb-2.5">
                                    <span className="text-gray-500 font-medium">Time</span>
                                    <span className="font-semibold text-gray-900">{submittedBooking.meeting_time} (30 min)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-medium">Attendee</span>
                                    <span className="font-semibold text-gray-900">{submittedBooking.name}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
                                <a
                                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Tafinity AI Meeting: ' + submittedBooking.service)}&dates=${formatDateForApi(selectedDate).replace(/-/g, '')}/${formatDateForApi(selectedDate).replace(/-/g, '')}&details=${encodeURIComponent('Consultation for ' + submittedBooking.service + ' with ' + submittedBooking.staff + '. Contact: +91-8005006933')}&location=Google+Meet`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 sm:px-6 py-3 rounded-full text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #be185d 0%, #9d174d 100%)'
                                    }}
                                >
                                    <CalendarCheck className="w-4 h-4" />
                                    Add to Google Calendar
                                </a>

                                <a
                                    href="https://wa.me/918005006933"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 sm:px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Message Us on WhatsApp
                                </a>

                                <Link
                                    to="/"
                                    className="px-5 sm:px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs sm:text-sm transition-all text-center"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </motion.div>
                    ) : (
                        <div>
                            {/* SEQUENTIAL STEPPER BAR */}
                            <div className="bg-gradient-to-r from-pink-50/70 via-slate-50 to-pink-50/70 border-b border-pink-100 px-3 sm:px-8 py-3 sm:py-3.5">
                                <div className="max-w-3xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
                                    {/* Step 1 Pill */}
                                    <div 
                                        onClick={() => {
                                            const el = document.getElementById('step-1-section');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`flex items-center gap-1.5 sm:gap-2.5 cursor-pointer transition-all ${
                                            isStep1Done ? 'text-emerald-700 font-bold' : 'text-[#be185d] font-bold'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                            isStep1Done ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200' : 'bg-[#be185d] text-white shadow-sm'
                                        }`}>
                                            {isStep1Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider block font-bold leading-tight">
                                                Option 1
                                            </span>
                                            <span className="text-xs text-slate-700 font-semibold truncate max-w-[110px] sm:max-w-[160px] hidden sm:block">
                                                {selectedService || 'Select Service'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Connector 1-2 */}
                                    <div className={`flex-1 h-0.5 mx-1 sm:mx-3 transition-colors ${
                                        isStep1Done ? 'bg-emerald-400' : 'bg-gray-200'
                                    }`} />

                                    {/* Step 2 Pill */}
                                    <div 
                                        onClick={() => {
                                            if (isStep1Done) {
                                                const el = document.getElementById('step-2-section');
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        className={`flex items-center gap-1.5 sm:gap-2.5 transition-all ${
                                            !isStep1Done 
                                                ? 'text-gray-400 cursor-not-allowed opacity-40' 
                                                : isStep2Done 
                                                ? 'text-emerald-700 font-bold cursor-pointer' 
                                                : 'text-[#be185d] font-bold cursor-pointer'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                            !isStep1Done 
                                                ? 'bg-gray-200 text-gray-500' 
                                                : isStep2Done 
                                                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-200' 
                                                : 'bg-[#be185d] text-white shadow-sm ring-2 ring-pink-200'
                                        }`}>
                                            {isStep2Done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider block font-bold leading-tight">
                                                Option 2
                                            </span>
                                            <span className="text-xs text-slate-700 font-semibold truncate max-w-[110px] sm:max-w-[170px] hidden sm:block">
                                                {isStep2Done 
                                                    ? `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()].slice(0, 3)} · ${selectedTime}`
                                                    : 'Date & Time'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Connector 2-3 */}
                                    <div className={`flex-1 h-0.5 mx-1 sm:mx-3 transition-colors ${
                                        isStep2Done ? 'bg-emerald-400' : 'bg-gray-200'
                                    }`} />

                                    {/* Step 3 Pill */}
                                    <div 
                                        onClick={() => {
                                            if (isStep2Done) {
                                                const el = document.getElementById('step-3-section');
                                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        className={`flex items-center gap-1.5 sm:gap-2.5 transition-all ${
                                            !isStep2Done 
                                                ? 'text-gray-400 cursor-not-allowed opacity-40' 
                                                : 'text-[#be185d] font-bold cursor-pointer'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                                            !isStep2Done ? 'bg-gray-200 text-gray-500' : 'bg-[#be185d] text-white shadow-sm ring-2 ring-pink-200'
                                        }`}>
                                            3
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider block font-bold leading-tight">
                                                Step 3
                                            </span>
                                            <span className="text-xs text-slate-700 font-semibold hidden sm:block">
                                                Your Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* STEPPED BOOKING FORM */}
                            <form onSubmit={handleSubmit} className="p-3.5 sm:p-7 md:p-10 divide-y divide-gray-100">
                                
                                {/* SECTION 1: SERVICES (OPTION 1) */}
                                <div id="step-1-section" className="pb-8 sm:pb-10 scroll-mt-24">
                                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 transition-all ${
                                            isStep1Done ? 'bg-emerald-600 text-white' : 'bg-pink-100 text-[#be185d]'
                                        }`}>
                                            {isStep1Done ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" /> : '1'}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-base sm:text-xl font-bold text-gray-900">
                                                    Option 1: Select Service
                                                </h2>
                                                {isStep1Done ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                        Completed ✓
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-pink-100 text-[#be185d]">
                                                        Required First
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 11 Service Cards Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                        {SERVICES.map((srv) => {
                                            const isSelected = selectedService === srv.name;
                                            return (
                                                <div
                                                    key={srv.id}
                                                    onClick={() => handleServiceSelect(srv.name)}
                                                    className={`relative p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                                                        isSelected
                                                            ? 'bg-pink-50/60 border-[#be185d] shadow-md shadow-pink-600/10 ring-2 ring-[#be185d]'
                                                            : 'bg-white border-pink-200 hover:border-pink-400 hover:shadow-sm'
                                                    }`}
                                                >
                                                    {/* Top Row: Service Name & Radio Check Circle */}
                                                    <div className="flex items-start justify-between gap-3">
                                                        <span className={`text-xs sm:text-sm font-semibold leading-snug ${
                                                            isSelected ? 'text-[#be185d] font-bold' : 'text-gray-800'
                                                        }`}>
                                                            {srv.name}
                                                        </span>

                                                        <div className="shrink-0 mt-0.5">
                                                            {isSelected ? (
                                                                <div className="w-5 h-5 rounded-full bg-[#be185d] flex items-center justify-center text-white shadow-sm">
                                                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full border-2 border-pink-300" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Bottom Row: Globe icon + duration */}
                                                    <div className="mt-3.5 sm:mt-4 flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                                                            <span>{srv.duration}</span>
                                                        </div>
                                                        {isSelected && (
                                                            <span className="text-[10px] sm:text-[11px] font-bold text-[#be185d]">
                                                                Selected ✓
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* SECTION 2: DATE & TIME (OPTION 2) */}
                                <div id="step-2-section" className="py-8 sm:py-10 scroll-mt-24 relative">
                                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 transition-all ${
                                            isStep2Done 
                                                ? 'bg-emerald-600 text-white' 
                                                : isStep1Done 
                                                ? 'bg-pink-100 text-[#be185d]' 
                                                : 'bg-gray-200 text-gray-400'
                                        }`}>
                                            {isStep2Done ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" /> : '2'}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-base sm:text-xl font-bold text-gray-900">
                                                    Option 2: Select Date & Time
                                                </h2>
                                                {isStep2Done ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                        Completed ✓
                                                    </span>
                                                ) : isStep1Done ? (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-pink-100 text-[#be185d]">
                                                        In Progress
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Container for Step 2 with smooth opacity transition */}
                                    <div className={`transition-opacity duration-300 ${!isStep1Done ? 'opacity-25 pointer-events-none select-none' : 'opacity-100 pointer-events-auto'}`}>
                                        {/* STAFF SELECTION DROPDOWN */}
                                        <div className="max-w-md mb-6 sm:mb-8">
                                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                                                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                                                <span className="text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                    SELECT STAFF <span className="text-gray-400 font-normal">(OPTIONAL)</span>
                                                </span>
                                                <span className="text-[10px] sm:text-xs font-semibold text-[#be185d] ml-auto">
                                                    &bull; SUGGESTED: KRISHN KUMAR SONI
                                                </span>
                                            </div>
                                            <select
                                                value={selectedStaff}
                                                disabled={!isStep1Done}
                                                onChange={(e) => setSelectedStaff(e.target.value)}
                                                className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] shadow-sm cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                {STAFF_MEMBERS.map((staff) => (
                                                    <option key={staff} value={staff}>
                                                        {staff}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* 2-COLUMN GRID: CALENDAR (LEFT) & TIME SLOTS (RIGHT) - Fully Responsive for Tablet & Mobile */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                                            
                                            {/* Left: Monthly Calendar (7 cols on tablet, 6 on desktop) */}
                                            <div className="md:col-span-7 lg:col-span-6 bg-gray-50/70 border border-gray-200/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-sm">
                                                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                                                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                        <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#be185d]" />
                                                        <span>DATE</span>
                                                    </div>
                                                    {selectedDate && (
                                                        <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                                            {formatReadableDate(selectedDate)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Month Header with Navigation */}
                                                <div className="flex items-center justify-between mb-3 sm:mb-4 px-1 sm:px-2">
                                                    <button
                                                        type="button"
                                                        disabled={!isStep1Done}
                                                        onClick={prevMonth}
                                                        className="p-1 sm:p-1.5 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200 disabled:opacity-40"
                                                        aria-label="Previous Month"
                                                    >
                                                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>

                                                    <span className="text-sm sm:text-base font-bold text-gray-800">
                                                        {monthNames[currentMonth]} {currentYear}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        disabled={!isStep1Done}
                                                        onClick={nextMonth}
                                                        className="p-1 sm:p-1.5 rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200 disabled:opacity-40"
                                                        aria-label="Next Month"
                                                    >
                                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                </div>

                                                {/* Days of Week Header */}
                                                <div className="grid grid-cols-7 text-center mb-1.5 sm:mb-2">
                                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                                        <div key={idx} className="text-[10px] sm:text-xs font-semibold text-gray-400 py-1">
                                                            {day}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Calendar Days Grid */}
                                                <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                                                    {/* Empty filler cells before 1st day of month */}
                                                    {Array.from({ length: firstDayIndex }).map((_, idx) => (
                                                        <div key={`empty-${idx}`} className="h-8 sm:h-9" />
                                                    ))}

                                                    {/* Days of the month */}
                                                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                                                        const dayNum = idx + 1;
                                                        const thisDate = new Date(currentYear, currentMonth, dayNum);
                                                        const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                                        const isPast = thisDate < todayZero;
                                                        const isToday = thisDate.getTime() === todayZero.getTime();
                                                        const isSelected = selectedDate && 
                                                            selectedDate.getDate() === dayNum && 
                                                            selectedDate.getMonth() === currentMonth && 
                                                            selectedDate.getFullYear() === currentYear;

                                                        return (
                                                            <button
                                                                key={dayNum}
                                                                type="button"
                                                                disabled={!isStep1Done || isPast}
                                                                onClick={() => handleDateClick(dayNum)}
                                                                className={`h-8 sm:h-9 rounded-lg text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center relative ${
                                                                    isSelected
                                                                        ? 'bg-[#be185d] text-white shadow-md shadow-pink-600/30 font-bold ring-2 ring-pink-300'
                                                                        : isToday
                                                                        ? 'border-2 border-[#be185d] text-[#be185d] bg-pink-50/50 hover:bg-pink-100/50'
                                                                        : isPast
                                                                        ? 'text-gray-300 cursor-not-allowed'
                                                                        : 'text-gray-700 hover:bg-white hover:text-gray-900 hover:shadow-xs cursor-pointer'
                                                                }`}
                                                            >
                                                                {dayNum}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Right: Time Slots & Custom Clock Watch (5 cols on tablet, 6 on desktop) */}
                                            <div className="md:col-span-5 lg:col-span-6">
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4">
                                                    <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">
                                                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#be185d]" />
                                                        <span>TIME</span>
                                                    </div>

                                                    {/* Custom Time Option Button */}
                                                    <button
                                                        type="button"
                                                        disabled={!isStep1Done}
                                                        onClick={() => setShowClockModal(true)}
                                                        className={`text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                                                            isCustomTime
                                                                ? 'bg-pink-100 text-[#be185d] border-[#be185d]'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#be185d] hover:text-[#be185d]'
                                                        }`}
                                                    >
                                                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                        <span>Custom Time Watch</span>
                                                        {isCustomTime && (
                                                            <span className="w-2 h-2 rounded-full bg-[#be185d]" />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Standard Time Slots Grid: 2 cols on mobile, 3 cols on tablet/desktop */}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                                                    {TIME_SLOTS.map((slot) => {
                                                        const isSelected = !isCustomTime && selectedTime === slot;
                                                        return (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                disabled={!isStep1Done}
                                                                onClick={() => handleTimeSelect(slot)}
                                                                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer ${
                                                                    isSelected
                                                                        ? 'bg-[#be185d] text-white border-[#be185d] shadow-md shadow-pink-600/30 ring-2 ring-pink-300 font-bold'
                                                                        : 'bg-white text-gray-800 border-gray-200 hover:border-pink-300 hover:bg-pink-50/30 shadow-xs'
                                                                }`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Active Selected Time Note */}
                                                <div className="mt-3.5 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-pink-50/70 border border-pink-200/60 flex items-center justify-between text-[11px] sm:text-xs">
                                                    <span className="text-gray-600 leading-snug">
                                                        Selected: <strong className="text-gray-900">{selectedDate ? formatReadableDate(selectedDate) : 'Date pending'}</strong> at <strong className="text-[#be185d]">{selectedTime || 'Time pending'}</strong>
                                                    </span>
                                                    {isCustomTime && (
                                                        <span className="bg-[#be185d] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ml-2">
                                                            Custom
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                {/* SECTION 3: ADD YOUR DETAILS (THE FORM) */}
                                <div id="step-3-section" className="pt-8 sm:pt-10 scroll-mt-24 relative">
                                    <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
                                        <div className="inline-flex items-center gap-2 mb-2">
                                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${
                                                isStep2Done ? 'bg-[#be185d] text-white shadow-sm' : 'bg-gray-200 text-gray-400'
                                            }`}>
                                                3
                                            </div>
                                            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                                                Add Your Details
                                            </h2>
                                        </div>
                                        <p className="text-[11px] sm:text-sm text-gray-500">
                                            Please provide your contact information so our experts can connect with you.
                                        </p>
                                    </div>

                                    {errorMessage && (
                                        <div className="max-w-2xl mx-auto mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
                                            {errorMessage}
                                        </div>
                                    )}

                                    {/* Relative container for Step 3 form with smooth opacity transition */}
                                    <div className="relative">
                                        <div className={`max-w-2xl mx-auto space-y-4 sm:space-y-5 transition-opacity duration-300 ${!isStep2Done ? 'opacity-25 pointer-events-none select-none' : 'opacity-100 pointer-events-auto'}`}>
                                            {/* Name & Email Row */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                                        Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        disabled={!isStep2Done}
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="Enter your full name"
                                                        className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] shadow-sm transition-all disabled:cursor-not-allowed"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        disabled={!isStep2Done}
                                                        value={formData.email}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                        placeholder="Enter your email"
                                                        className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] shadow-sm transition-all disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                            {/* Mobile Number */}
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                                    Mobile Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    disabled={!isStep2Done}
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="Enter your mobile number"
                                                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] shadow-sm transition-all disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            {/* Any Special Requests */}
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                                    Any Special Requests
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    disabled={!isStep2Done}
                                                    value={formData.specialRequests}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                                                    placeholder="Tell us anything special you'd like us to know..."
                                                    className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] shadow-sm transition-all resize-y disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            {/* Confirm Booking Submit Button */}
                                            <div className="pt-3 sm:pt-4 text-center">
                                                <button
                                                    type="submit"
                                                    disabled={loading || !isStep2Done}
                                                    className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #be185d 0%, #9d174d 60%, #831843 100%)',
                                                        boxShadow: isStep2Done ? '0 8px 25px rgba(190, 24, 93, 0.4)' : 'none'
                                                    }}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            <span>Confirming Booking...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Confirm Booking</span>
                                                            <ArrowRight className="w-4 h-4" />
                                                        </>
                                                    )}
                                                </button>
                                                <p className="mt-2 text-[10px] sm:text-[11px] text-gray-400">
                                                    Immediate email confirmation will be sent to your inbox upon booking.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* CUSTOM TIME CLOCK WATCH MODAL (Interactive Analog + Digital Clock) */}
            <AnimatePresence>
                {showClockModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl max-w-sm w-full p-4 sm:p-6 shadow-2xl border border-pink-200 relative overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                                <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
                                    <Clock className="w-5 h-5 text-[#be185d]" />
                                    <span>Select Custom Time</span>
                                </div>
                                <button
                                    onClick={() => setShowClockModal(false)}
                                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Digital Clock Display */}
                            <div className="bg-pink-50/70 border border-pink-200/60 rounded-xl p-3 text-center mb-5">
                                <div className="text-3xl font-extrabold text-[#be185d] font-mono tracking-wider">
                                    {clockHour.toString().padStart(2, '0')} : {clockMinute.toString().padStart(2, '0')}{' '}
                                    <span className="text-base text-gray-600 font-sans ml-1">{clockPeriod}</span>
                                </div>
                                <span className="text-[11px] text-gray-500">Pick any custom hour & minute</span>
                            </div>

                            {/* Interactive Analog Watch Face */}
                            <div className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-pink-50/40 via-white to-pink-100/50 border-4 border-pink-200/80 shadow-inner flex items-center justify-center mb-5">
                                {/* Clock Center Pivot */}
                                <div className="w-3.5 h-3.5 rounded-full bg-[#be185d] z-20 shadow-xs" />

                                {/* Hour Hand */}
                                <div
                                    className="absolute w-1.5 bg-gray-800 rounded-full z-10 origin-bottom transition-transform duration-300"
                                    style={{
                                        height: '42px',
                                        bottom: '50%',
                                        transform: `rotate(${hourAngle}deg)`
                                    }}
                                />

                                {/* Minute Hand */}
                                <div
                                    className="absolute w-1 bg-[#be185d] rounded-full z-10 origin-bottom transition-transform duration-300"
                                    style={{
                                        height: '60px',
                                        bottom: '50%',
                                        transform: `rotate(${minuteAngle}deg)`
                                    }}
                                />

                                {/* Hour markings 1 through 12 arranged radially */}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                                    const angle = (num * 30 - 90) * (Math.PI / 180);
                                    const radius = 70; // px
                                    const x = Math.round(radius * Math.cos(angle));
                                    const y = Math.round(radius * Math.sin(angle));
                                    const isSelected = clockHour === num;

                                    return (
                                        <button
                                            key={num}
                                            type="button"
                                            onClick={() => setClockHour(num)}
                                            style={{
                                                transform: `translate(${x}px, ${y}px)`
                                            }}
                                            className={`absolute w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? 'bg-[#be185d] text-white font-bold scale-110 shadow-xs'
                                                    : 'text-gray-600 hover:text-pink-600 hover:font-bold'
                                            }`}
                                        >
                                            {num}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Minute Selector & AM/PM Controls */}
                            <div className="space-y-3 mb-5">
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                                        <span>Minute:</span>
                                        <span className="font-mono text-[#be185d] font-bold">{clockMinute.toString().padStart(2, '0')}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={55}
                                        step={5}
                                        value={clockMinute}
                                        onChange={(e) => setClockMinute(parseInt(e.target.value))}
                                        className="w-full accent-[#be185d] cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                                        <span>:00</span>
                                        <span>:15</span>
                                        <span>:30</span>
                                        <span>:45</span>
                                        <span>:55</span>
                                    </div>
                                </div>

                                {/* AM / PM Toggle */}
                                <div className="flex rounded-lg bg-gray-100 p-1">
                                    <button
                                        type="button"
                                        onClick={() => setClockPeriod('AM')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                                            clockPeriod === 'AM'
                                                ? 'bg-[#be185d] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        AM
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setClockPeriod('PM')}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                                            clockPeriod === 'PM'
                                                ? 'bg-[#be185d] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                    >
                                        PM
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowClockModal(false)}
                                    className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleApplyCustomTime}
                                    className="flex-1 py-2.5 rounded-lg bg-[#be185d] hover:bg-[#9d174d] text-white text-xs font-bold shadow-md transition-colors"
                                >
                                    Set Custom Time
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScheduleMeeting;
