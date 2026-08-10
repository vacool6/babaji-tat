import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://babajitravel.com/og-image.jpg",
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    updateMetaTag("name", "description", description);
    updateMetaTag("name", "keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", canonicalUrl);
    updateMetaTag("property", "og:image", ogImage);

    // Update Twitter tags
    updateMetaTag("property", "twitter:title", title);
    updateMetaTag("property", "twitter:description", description);
    updateMetaTag("property", "twitter:url", canonicalUrl);
    updateMetaTag("property", "twitter:image", ogImage);

    // Update canonical URL
    let link = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [title, description, keywords, canonicalUrl, ogImage]);

  return null;
};

function updateMetaTag(
  attribute: string,
  attributeValue: string,
  content: string,
) {
  let tag = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`,
  ) as HTMLMetaElement;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, attributeValue);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export default SEOHead;
