import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({
    title = "TafinityAI - Build Smarter. Automate Better. Grow Faster.",
    description = "TafinityAI helps businesses use technology effectively through custom software, workflow automation, apps, ERPs, and AI integrations.",
    url = "https://tafinityai.com",
    keywords = "TafinityAI, software development, workflow automation, AI, ERP, CRM, mobile apps, website development, React, Laravel"
}) => {
    const location = useLocation();
    const [dynamicSeo, setDynamicSeo] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchSeo = async () => {
            try {
                const res = await fetch(`/api/seo?route=${location.pathname}`, { cache: 'no-store' });
                if (res.ok && isMounted) {
                    const data = await res.json();
                    if (data && !data.error && !data.message) {
                        setDynamicSeo(data);
                        return;
                    }
                }
            } catch (err) { }
            if (isMounted) setDynamicSeo(null);
        };
        fetchSeo();

        return () => { isMounted = false; };
    }, [location.pathname]);

    // Priority chain: Dynamic DB -> Prop Fallback -> Hardcoded Default
    const finalTitle = dynamicSeo?.title || title;
    const finalDesc = dynamicSeo?.description || description;
    const finalKeywords = dynamicSeo?.keywords || keywords;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDesc} />
            <meta name="keywords" content={finalKeywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDesc} />
            <meta property="og:image" content="https://tafinityai.com/og-image.jpg" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDesc} />
            <meta name="twitter:image" content="https://tafinityai.com/og-image.jpg" />
        </Helmet>
    );
};

export default SEO;
