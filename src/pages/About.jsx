import {PageHeader} from "../components/ui/PageHeader";
import {SectionTitle} from "../components/ui/SectionTitle";
import aboutHeroImg from "../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";
import {Container} from "../components/ui/Container";
function About() {
  return (
<>
  <SectionTitle 
  title="الرئيسية" 
  breadcrumbs={[{ label: 'من نحن' }]}
  align="right"
/>
 <Container>
  <PageHeader 
  variant="light"
  title={ <> جذورنا في التميز <br /> الأكاديمي </> }
  description="نحن مؤسسة رائدة تكرس جهودها لتعزيز التنمية البيئية في فلسطين من خلال البحث
العلمي المتخصص والعمل الميداني الملتزم بمعايير الاستدامة العالمية."
  breadcrumbs={[{ label: 'من نحن' }]}
  image={aboutHeroImg}
  imageBadge="تأسيس المركز 2023"
/>
</Container>
</>
)
}

export default About;