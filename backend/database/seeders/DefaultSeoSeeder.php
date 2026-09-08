<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultSeoSeeder extends Seeder
{
    public function run(): void
    {
        $seoData = [
            ['route_path' => '/', 'title' => 'TafinityAI - Build Smarter. Automate Better. Grow Faster.', 'description' => 'Transforming ideas, challenges, and manual processes into practical, scalable digital solutions for Startups, SMBs, and Enterprises.', 'keywords' => 'custom software development, business automation, AI integrations, startup tech partner, ERP, CRM, mobile apps'],
            ['route_path' => '/about', 'title' => 'About Us - TafinityAI', 'description' => 'We make technology practical and accessible. TafinityAI is a trusted partner for businesses looking to automate operations, adopt intelligent workflows, and build scalable software.', 'keywords' => 'about TafinityAI, tech partnership, workflow automation agency, custom software India, enterprise IT consulting'],
            ['route_path' => '/services', 'title' => 'Our Services - TafinityAI', 'description' => 'Explore our core capabilities: Website Development, Mobile Apps, Custom Business Software, ERP, CRM, Web Applications, POS Systems and IT Consulting.', 'keywords' => 'software development services, mobile app development, CRM development, custom ERP solutions, e-commerce platforms, web development agency'],
            ['route_path' => '/automation', 'title' => 'AI & Automations - TafinityAI', 'description' => 'Stop doing repetitive tasks manually. We orchestrate n8n workflows and deploy intelligent, autonomous AI Agents tailored to your enterprise systems.', 'keywords' => 'n8n automation, AI agents, enterprise workflow automation, custom AI solutions, repetitive task automation'],
            ['route_path' => '/portfolio', 'title' => 'Our Portfolio - TafinityAI Projects', 'description' => 'Explore our proven track record of shipping highly reliable custom software systems, apps, and B2B platforms for multiple industries.', 'keywords' => 'TafinityAI portfolio, software case studies, web application examples, recent projects'],
            ['route_path' => '/careers', 'title' => 'Careers & Internships - TafinityAI', 'description' => 'Join the vision. TafinityAI is hiring driven engineers and designers to build autonomous systems. We also offer immersive Web dev Internship programs.', 'keywords' => 'TafinityAI careers, software engineering jobs, React internship, node js internship, work at tech startup'],
            ['route_path' => '/contact', 'title' => "Contact Us - Let's Talk | TafinityAI", 'description' => 'Get in touch with TafinityAI. We are ready to transform your ideas into reality. Drop us a message for software consultation.', 'keywords' => 'contact TafinityAI, tech consultant, software development agency quote'],
        ];

        foreach ($seoData as $data) {
            DB::table('seo_metadata')->updateOrInsert(['route_path' => $data['route_path']], $data);
        }
    }
}
