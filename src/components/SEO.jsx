import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "TafinityAI - Build Smarter. Automate Better. Grow Faster.",
    description = "TafinityAI helps businesses use technology effectively through custom software, workflow automation, apps, ERPs, and AI integrations.",
    url = "https://tafinityai.com",
    keywords = "TafinityAI, software development, workflow automation, AI, ERP, CRM, mobile apps, website development, React, Laravel"
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://tafinityai.com/og-image.jpg" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://tafinityai.com/og-image.jpg" />
        </Helmet>
    );
};

export default SEO;
