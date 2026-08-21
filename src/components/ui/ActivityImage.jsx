import { useState } from "react";
import orgLogo from "../../assets/Logo.png";
import { useTranslation } from "../../utils/useTranslation";

export default function ActivityImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  fallbackClassName = "",
  loading = "lazy",
}) {
  const { t } = useTranslation();
  const rawUrl =
    typeof src === "object" && src !== null ? src.url : typeof src === "string" ? src.trim() : null;

  const [failedUrl, setFailedUrl] = useState(null);

  const showFallback = !rawUrl || failedUrl === rawUrl;

  if (showFallback) {
    const logoAlt = t("common.orgLogo") || "Organization Logo";
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-[#F4F8F5] ${containerClassName}`}
      >
        <img
          src={orgLogo}
          alt={logoAlt}
          className={`h-full w-full object-contain p-2 transition-transform duration-300 ${fallbackClassName || className}`}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <img
        src={rawUrl}
        alt={alt || t("admin.nav.activities") || "Activity"}
        onError={() => setFailedUrl(rawUrl)}
        className={`h-full w-full object-cover transition-transform duration-300 ${className}`}
        loading={loading}
      />
    </div>
  );
}
