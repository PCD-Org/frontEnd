/**
 * SEO Component utilizing React 19 native Document Metadata hoisting.
 * React 19 automatically lifts <title>, <meta>, and <link> rendered inside components
 * directly into the document <head>.
 */
const BASE_DOMAIN = "https://www.pcedpal.org";

export default function SEO({
  title,
  description,
  canonical,
  noindex = false,
  image = `${BASE_DOMAIN}/og-image.png`,
  type = "website",
}) {
  const brandSuffix = "الهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير | PCED";
  const fullTitle = title ? `${title} | PCED` : brandSuffix;
  const metaDescription =
    description ||
    "الهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير (PCED) - منظمة أهلية فلسطينية مستقلة تُعنى بحماية البيئة، وتعزيز التنمية المستدامة، والتمكين المجتمعي، والبحث العلمي التطبيقي في فلسطين.";

  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${BASE_DOMAIN}${image.startsWith("/") ? "" : "/"}${image}`
    : `${BASE_DOMAIN}/og-image.png`;

  const pageUrl = canonical || BASE_DOMAIN;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Robots meta tag */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={brandSuffix} />
      <meta property="og:locale" content="ar_AR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={pageUrl} />
      {fullImage && <meta property="og:image" content={fullImage} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {fullImage && <meta name="twitter:image" content={fullImage} />}
    </>
  );
}
