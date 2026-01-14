import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogImage = '/logo192.png',
  ogType = 'website',
  canonicalUrl
}) => {
  const fullTitle = `${title} | Brookside Manpower Services`;
  const defaultDescription = "Brookside Manpower Services connects skilled talents to leading hospitality companies in Metro Manila. Find your next career opportunity in hotels, resorts, and restaurants.";
  const defaultKeywords = "Brookside Manpower, hospitality staffing, hotel jobs, restaurant jobs, manpower services, job placement, career opportunities, Metro Manila, Philippines";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`https://brooksidemps.com${ogImage}`} />
      <meta property="og:url" content={`https://brooksidemps.com${canonicalUrl || ''}`} />
      

      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://brooksidemps.com${canonicalUrl || ''}`} />
    </Helmet>
  );
};

export default SEO; 