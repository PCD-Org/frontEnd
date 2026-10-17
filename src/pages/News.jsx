import SEO from "../components/common/SEO";
import { PageHeader } from "../components/ui/PageHeader";
import { useTranslation } from "../utils/useTranslation";

export default function News() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="الأخبار والبيانات"
        description="تابع آخر أخبار، فعاليات، وبيانات المركز الفلسطيني للديمقراطية وحل النزاعات (PCED) وتغطية أنشطته المجتمعية الميدانية."
        canonical="https://www.pcedpal.org/news"
      />
      <PageHeader
        variant="light"
        title={t("news.title")}
        description={t("news.desc")}
      />
    </>
  );
}

