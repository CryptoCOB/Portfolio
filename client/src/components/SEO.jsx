import { useEffect } from 'react';

/**
 * SEO Component for meta tags and structured data (React 19 compatible)
 */
export const SEO = ({
  title = "Phi's Forge - AI Systems, Web Development & Creative Design",
  description = "Building AI Systems, Web Solutions, and Creative Experiences from Scarborough to the world. Portfolio of Phillip Brown - Full Stack Developer, AI Engineer, and Creative Technologist.",
  keywords = "AI development, web development, React, Node.js, machine learning, blockchain, full stack developer, Toronto developer, Scarborough, creative technology",
  author = "Phillip Brown",
  image = "/og-image.jpg",
  url = "https://phisforge.com",
  type = "website"
}) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', author);
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    
    // Update Twitter tags
    updateMetaTag('property', 'twitter:card', 'summary_large_image');
    updateMetaTag('property', 'twitter:url', url);
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:image', image);
    
    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Phillip Brown",
      "alternateName": "Phi",
      "url": url,
      "image": image,
      "jobTitle": "Full Stack Developer & AI Engineer",
      "worksFor": {
        "@type": "Organization",
        "name": "Phi's Forge"
      },
      "sameAs": [
        "https://github.com/CryptoCOB"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Web Development",
        "Blockchain Technology",
        "React.js",
        "Node.js",
        "Python"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Scarborough",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    };
    
    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [title, description, keywords, author, image, url, type]);

  return null;
};

function updateMetaTag(attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default SEO;
