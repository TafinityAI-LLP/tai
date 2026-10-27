<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientLogosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('client_logos')->truncate();

        $logos = [
            [
                'logo_url' => '/logo.png',
                'website_url' => 'https://tafinityai.com',
                'display_order' => 1,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => '/msme.png',
                'website_url' => 'https://msme.gov.in',
                'display_order' => 2,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => '/mca.png',
                'website_url' => 'https://www.mca.gov.in',
                'display_order' => 3,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => '/india.png',
                'website_url' => 'https://www.digitalindia.gov.in',
                'display_order' => 4,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
                'website_url' => 'https://cloud.google.com',
                'display_order' => 5,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
                'website_url' => 'https://aws.amazon.com',
                'display_order' => 6,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
                'website_url' => 'https://azure.microsoft.com',
                'display_order' => 7,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
                'website_url' => 'https://www.docker.com',
                'display_order' => 8,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                'website_url' => 'https://react.dev',
                'display_order' => 9,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'logo_url' => 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
                'website_url' => 'https://nextjs.org',
                'display_order' => 10,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        DB::table('client_logos')->insert($logos);
    }
}
