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
  image = `${BASE_DOMAIN}/favicon.svg`,
  type = "website",
}) {
  const brandSuffix = "المركز الفلسطيني للديمقراطية وحل النزاعات (PCED)";
  const fullTitle = title ? `${title} | PCED` : brandSuffix;
  const metaDescription =
    description ||
    "المركز الفلسطيني للديمقراطية وحل النزاعات (PCED) - منظمة أهلية فلسطينية غير ربحية تسعى لتعزيز السلم الأهلي وسيادة القانون وتمكين الفئات الهشة وحل النزاعات المجتمعية.";

  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${BASE_DOMAIN}${image.startsWith("/") ? "" : "/"}${image}`
    : `${BASE_DOMAIN}/favicon.svg`;

  const pageUrl = canonical || BASE_DOMAIN;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Robots meta tag for Admin and non-indexable routes */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
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
