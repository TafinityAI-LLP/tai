<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareerRolesSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'id' => 1,
                'title' => 'Senior Full-Stack AI Engineer',
                'type' => 'Full-time',
                'location' => 'Remote / Bengaluru',
                'salary' => '₹18 - ₹28 LPA',
                'description' => 'Lead the architecture and development of scalable AI web applications, autonomous agent workflows, and reactive frontend interfaces using React, Laravel/FastAPI, and distributed vector databases.',
                'status' => 'open'
            ],
            [
                'id' => 2,
                'title' => 'Generative AI & LLM Systems Architect',
                'type' => 'Full-time',
                'location' => 'Remote / Hybrid',
                'salary' => '₹22 - ₹35 LPA',
                'description' => 'Design production-grade Retrieval-Augmented Generation (RAG) pipelines, fine-tuned transformer models, and multi-agent coordination systems for enterprise automation.',
                'status' => 'open'
            ],
            [
                'id' => 3,
                'title' => 'Frontend UI/UX Engineer (React & Tailwind)',
                'type' => 'Full-time',
                'location' => 'Remote',
                'salary' => '₹12 - ₹18 LPA',
                'description' => 'Craft world-class, ultra-responsive digital experiences with micro-animations, glassmorphism, and performance-optimized React component architectures.',
                'status' => 'open'
            ],
            [
                'id' => 4,
                'title' => 'DevOps & AI Infrastructure Engineer',
                'type' => 'Full-time',
                'location' => 'Remote',
                'salary' => '₹15 - ₹22 LPA',
                'description' => 'Manage Kubernetes clusters, high-throughput GPU model serving infrastructure, CI/CD automated deployments, and zero-trust cloud security.',
                'status' => 'open'
            ],
            [
                'id' => 5,
                'title' => 'AI Product Solutions Consultant',
                'type' => 'Full-time',
                'location' => 'Hybrid / Remote',
                'salary' => '₹14 - ₹20 LPA',
                'description' => 'Bridge enterprise business challenges with custom AI/automation architecture. Conduct technical demos, client onboarding, and solution scoping.',
                'status' => 'open'
            ],
            [
                'id' => 6,
                'title' => 'Senior Backend Engineer (Python & PHP)',
                'type' => 'Full-time',
                'location' => 'Remote',
                'salary' => '₹16 - ₹24 LPA',
                'description' => 'Architect high-throughput REST and WebSocket APIs, optimize PostgreSQL query plans, and implement secure asynchronous job queues.',
                'status' => 'open'
            ],
        ];

        foreach ($jobs as $job) {
            DB::table('jobs')->updateOrInsert(['id' => $job['id']], $job);
        }

        $internships = [
            [
                'id' => 1,
                'title' => 'AI & LLM Research Intern',
                'track' => 'Artificial Intelligence',
                'duration' => '3-6 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Hands-on experience with LangChain, LlamaIndex, OpenAI/Claude API integrations, vector embeddings (Pinecone/Milvus), and prompt engineering.',
                'status' => 'active'
            ],
            [
                'id' => 2,
                'title' => 'Full-Stack Web Development Intern',
                'track' => 'Software Engineering',
                'duration' => '3-6 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Build end-to-end web apps with React, Tailwind CSS, Node.js/Laravel, and modern cloud deployment pipelines.',
                'status' => 'active'
            ],
            [
                'id' => 3,
                'title' => 'UI/UX & Product Design Intern',
                'track' => 'Product Design',
                'duration' => '3 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Design modern design systems, interactive Figma prototypes, micro-animations, and conduct usability research for next-gen AI tools.',
                'status' => 'active'
            ],
            [
                'id' => 4,
                'title' => 'Machine Learning & Data Science Intern',
                'track' => 'Data Science',
                'duration' => '3-6 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Data pipeline engineering, synthetic dataset curation, model fine-tuning with PyTorch, and model evaluation metrics.',
                'status' => 'active'
            ],
            [
                'id' => 5,
                'title' => 'Cloud & DevOps Engineering Intern',
                'track' => 'Infrastructure',
                'duration' => '3 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Learn Docker containerization, AWS/GCP infrastructure, GitHub Actions CI/CD workflows, and server monitoring.',
                'status' => 'active'
            ],
            [
                'id' => 6,
                'title' => 'Growth & Technical Content Intern',
                'track' => 'Marketing & Growth',
                'duration' => '3 Months',
                'startDate' => 'Immediate',
                'syllabus' => 'Craft developer-focused tutorials, technical case studies, AI benchmarks, and developer community engagement.',
                'status' => 'active'
            ],
        ];

        foreach ($internships as $intern) {
            DB::table('internships')->updateOrInsert(['id' => $intern['id']], $intern);
        }
    }
}
