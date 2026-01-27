import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  ogImage = '/logo192.png',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogImageAlt,
  ogType = 'website',
  canonicalUrl,
  structuredData,
  noindex = false,
  nofollow = false,
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime,
  articleSection,
  articleTags,
  twitterCard = 'summary_large_image',
  twitterSite = '@brooksidemps',
  twitterCreator,
  lang = 'en',
  alternateLanguages = [],
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
}) => {
  // Detect if we're on EVA page for subdomain support
  const isEvaPage = canonicalUrl && (canonicalUrl === '/eva' || canonicalUrl.startsWith('/eva/'));
  const siteUrl = isEvaPage ? 'https://eva.brooksidemps.com' : 'https://brooksidemps.com';
  const mainSiteUrl = 'https://brooksidemps.com';

  const fullTitle = title.includes('Brookside') ? title : `${title} | Brookside Manpower Services`;
  const defaultDescription = "Brookside Manpower Services connects skilled talents to leading hospitality companies in Metro Manila. Find your next career opportunity in hotels, resorts, and restaurants.";
  const defaultKeywords = "Brookside Manpower, hospitality staffing, hotel jobs, restaurant jobs, manpower services, job placement, career opportunities, Metro Manila, Philippines";

  
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonicalUrl = canonicalUrl || '/';
  const finalOgImage = ogImage.startsWith('http') ? ogImage : `${mainSiteUrl}${ogImage}`;
  const finalRobots = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
    : robots;
  
  // For Open Graph and Twitter, use main site URL to ensure proper sharing across platforms
  const ogUrl = `${mainSiteUrl}${finalCanonicalUrl}`;

  // Combine structured data with default organization data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Brookside Manpower Services",
    "url": siteUrl,
    "logo": `${siteUrl}/logo192.png`,
    "description": "Connecting skilled talents to top hospitality companies in Metro Manila.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, Barangay Tambo",
      "addressLocality": "Paranaque City",
      "addressRegion": "Metro Manila",
      "postalCode": "1701",
      "addressCountry": "PH"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+63-917-157-8874",
      "contactType": "customer service",
      "email": "inquire@brooksidemanpower.com",
      "areaServed": "PH",
      "availableLanguage": ["en", "fil"]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61560528418956",
      "https://www.linkedin.com/company/brookside-manpower-services",
      "https://www.tiktok.com/@brooksidemps"
    ]
  };

  const combinedStructuredData = structuredData 
    ? Array.isArray(structuredData) 
      ? [defaultStructuredData, ...structuredData]
      : [defaultStructuredData, structuredData]
    : defaultStructuredData;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Brookside Manpower Services" />
      <meta name="robots" content={finalRobots} />
      <meta name="googlebot" content={finalRobots} />
      <meta name="bingbot" content={finalRobots} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={lang} />
      {alternateLanguages.map((altLang) => (
        <link key={altLang.hrefLang} rel="alternate" hreflang={altLang.hrefLang} href={altLang.href} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:width" content={ogImageWidth.toString()} />
      <meta property="og:image:height" content={ogImageHeight.toString()} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:site_name" content="Brookside Manpower Services" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : 'en_PH'} />
      
      {/* Article-specific Open Graph tags */}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {ogType === 'article' && articleTags && articleTags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Canonical URL - Use subdomain for EVA pages to optimize for eva.brooksidemps.com */}
      <link rel="canonical" href={`${siteUrl}${finalCanonicalUrl}`} />
      
      {/* Alternate URL for EVA subdomain (helps with SEO and cross-domain linking) */}
      {isEvaPage && (
        <link rel="alternate" href={`${mainSiteUrl}${finalCanonicalUrl}`} />
      )}
      
      {/* Structured Data (JSON-LD) */}
      {Array.isArray(combinedStructuredData) ? (
        combinedStructuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {JSON.stringify(combinedStructuredData)}
        </script>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#f7a61a" />
      <meta name="msapplication-TileColor" content="#f7a61a" />
      <meta name="application-name" content="Brookside Manpower Services" />
      
      {/* Performance and Security Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEO; 