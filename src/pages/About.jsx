import {PageHeader} from "../components/ui/PageHeader";
import {SectionTitle} from "../components/ui/SectionTitle";
import aboutHeroImg from "../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";
import {Container} from "../components/ui/Container";
import { useTranslation } from "../utils/useTranslation";

function About() {
  const { t } = useTranslation();
  return (
<>
  <SectionTitle 
  title={t("about.sectionTitle")} 
  breadcrumbs={[{ label: t("about.breadcrumb") }]}
  align="right"
/>
 <Container>
  <PageHeader 
  variant="light"
  title={ <> {t("about.heroTitle1")} <br /> {t("about.heroTitle2")} </> }
  description={t("about.heroDesc")}
  image={aboutHeroImg}
  imageBadge={t("about.imageBadge")}
/>
</Container>
</>
)
}

export default About;
