import SEO from "../components/common/SEO";
import { HeroSection } from "../components/home/HeroSection";
import { OurGoals } from "../components/home/OurGoals";
import { Qoute } from "../components/home/Qoute";
import { WhoWeAre } from "../components/home/WhoWeAre";
import Activities from "../components/home/Activities";
import Partners from "../components/home/Partners";

export default function Home() {
  return (
    <>
      <SEO
        title="الرئيسية"
        description="الموقع الرسمي للهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير (PCED) - مبادرات رائدة في حماية البيئة والتنمية المستدامة، والتمكين المجتمعي في فلسطين."
        canonical="https://www.pcedpal.org/"
      />
      <HeroSection />
      <WhoWeAre />
      <OurGoals />
      <Qoute />
      <Activities />
      <Partners />
    </>
  );
}
