import {PageHeader} from "../components/ui/PageHeader";
import { useTranslation } from "../utils/useTranslation";


export default function News() {
  const { t } = useTranslation();
  return (
    // <div>News Page</div>
    <>
    
    <PageHeader 
  variant="light"
  title={t("news.title")}
  description={t("news.desc")}
/></>
  )
}
