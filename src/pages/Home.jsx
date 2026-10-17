import SEO from "../components/common/SEO";
import { HeroSection } from "../components/home/HeroSection";
import { OurGoals } from "../components/home/OurGoals";
import { Qoute } from "../components/home/Qoute";
import { WhoWeAre } from "../components/home/WhoWeAre";
import Activities from "../components/home/Activities";

export default function Home() {
  return (
    <>
      <SEO
        title="الرئيسية"
        description="المركز الفلسطيني للديمقراطية وحل النزاعات (PCED) - منظمة مجتمع مدني تعمل على تعزيز ثقافة السلم الأهلي، حماية حقوق الفئات الهشة، وحل النزاعات عبر الحوار وسيادة القانون."
        canonical="https://www.pcedpal.org/"
      />
      <HeroSection />
      <WhoWeAre />
      <OurGoals />
      <Qoute />
      <Activities />
    </>
  );
}

