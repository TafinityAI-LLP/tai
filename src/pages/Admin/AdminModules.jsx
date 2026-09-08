import React from 'react';
import GenericCrudManager from './GenericCrudManager';

export const AdminBlogs = () => (
    <GenericCrudManager
        title="Manage Blogs & Insights"
        endpoint="blogs"
        columns={[
            { key: 'title', label: 'Article Title' },
            { key: 'author', label: 'Author' },
            { key: 'status', label: 'State' },
            { key: 'publishedAt', label: 'Date' }
        ]}
        formFields={[
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'slug', label: 'URL Slug (e.g. my-post-name)', type: 'text', required: true },
            { key: 'snippet', label: 'Short Snippet (Shown on lists)', type: 'textarea' },
            { key: 'imageUrl', label: 'Featured Image URL', type: 'image' },
            { key: 'content', label: 'Full Markdown / Text Content', type: 'textarea', required: true },
            { key: 'author', label: 'Author Name', type: 'text' },
            { key: 'status', label: 'Visibility Status', type: 'select', options: ['published', 'draft'] }
        ]}
    />
);

export const AdminCaseStudies = () => (
    <GenericCrudManager
        title="Manage Case Studies"
        endpoint="casestudies"
        columns={[
            { key: 'client', label: 'Client' },
            { key: 'title', label: 'Study Title' },
            { key: 'result', label: 'Key Result' }
        ]}
        formFields={[
            { key: 'client', label: 'Client / Company Name', type: 'text', required: true },
            { key: 'title', label: 'Headline / Title', type: 'text', required: true },
            { key: 'imageUrl', label: 'Hero Image URL', type: 'image' },
            { key: 'challenge', label: 'The Challenge', type: 'textarea' },
            { key: 'solution', label: 'Our Solution', type: 'textarea' },
            { key: 'result', label: 'Impact / Result Metric', type: 'text' },
            { key: 'tags', label: 'Technology Tags (Comma separated)', type: 'text' }
        ]}
    />
);

export const AdminPortfolio = () => (
    <GenericCrudManager
        title="Manage Portfolio Projects"
        endpoint="portfolio"
        columns={[
            { key: 'title', label: 'Project Name' },
            { key: 'techStack', label: 'Tech Stack' },
            { key: 'link', label: 'External Link' }
        ]}
        formFields={[
            { key: 'title', label: 'Project Title', type: 'text', required: true },
            { key: 'description', label: 'Project Description', type: 'textarea' },
            { key: 'imageUrl', label: 'Project Image URL', type: 'image' },
            { key: 'link', label: 'Live Site (URL)', type: 'text' },
            { key: 'techStack', label: 'Tech Stack (Comma separated)', type: 'text' }
        ]}
    />
);

export const AdminTestimonials = () => (
    <GenericCrudManager
        title="Manage Testimonials"
        endpoint="testimonials"
        columns={[
            { key: 'name', label: 'Client Name' },
            { key: 'role', label: 'Position / Company' },
            { key: 'rating', label: 'Rating (1-5)' }
        ]}
        formFields={[
            { key: 'name', label: 'Client Name', type: 'text', required: true },
            { key: 'role', label: 'Position / Company', type: 'text' },
            { key: 'imageUrl', label: 'Avatar Image URL (Optional)', type: 'image' },
            { key: 'text', label: 'Review Text', type: 'textarea', required: true },
            { key: 'rating', label: 'Rating (Max 5)', type: 'number' }
        ]}
    />
);

export const AdminJobs = () => (
    <GenericCrudManager
        title="Manage Active Jobs"
        endpoint="jobs"
        columns={[
            { key: 'title', label: 'Role Title' },
            { key: 'type', label: 'Job Type' },
            { key: 'status', label: 'Status' }
        ]}
        formFields={[
            { key: 'title', label: 'Role Title', type: 'text', required: true },
            { key: 'type', label: 'Type (e.g. Full-time, Remote)', type: 'text' },
            { key: 'location', label: 'Location Base', type: 'text' },
            { key: 'salary', label: 'Salary Range (Optional)', type: 'text' },
            { key: 'status', label: 'Publishing Status', type: 'select', options: ['open', 'closed'] },
            { key: 'description', label: 'Full Job Description', type: 'textarea', required: true }
        ]}
    />
);

export const AdminInternships = () => (
    <GenericCrudManager
        title="Manage Internship Cohorts"
        endpoint="internships"
        columns={[
            { key: 'title', label: 'Cohort Title' },
            { key: 'track', label: 'Tech Track' },
            { key: 'status', label: 'Status' }
        ]}
        formFields={[
            { key: 'title', label: 'Cohort Name (e.g. Winter 2026)', type: 'text', required: true },
            { key: 'track', label: 'Technology Track (e.g. MERN Stack)', type: 'text' },
            { key: 'duration', label: 'Duration Frame (e.g. 3 Months)', type: 'text' },
            { key: 'startDate', label: 'Start Date Text', type: 'text' },
            { key: 'status', label: 'Admissions Status', type: 'select', options: ['active', 'closed'] },
            { key: 'syllabus', label: 'Syllabus Description', type: 'textarea' }
        ]}
    />
);
