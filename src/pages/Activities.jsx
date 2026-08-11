
// export default function Activities() {
//   return (
//     <div>Activities Page</div>
//   )
// }

// import SectionTitle from '../components/ui/SectionTitle';
import { PageHeader } from '../components/ui/PageHeader';


export default function Activities() {
  return (
  <div>
  <PageHeader 
  variant="dark"
  title="برامج الدعم والمساندة"
  description="نحن في المركز الفلسطيني للتنمية البيئية نؤمن بأن الصمود يبدأ من تمكين المجتمع. تشمل برامجنا التدخلات
العاجلة والمستدامة لتعزيز قدرة شعبنا على مواجهة التحديات البيئية والاجتماعية من خلال التنمية المدروسة
والدعم المباشر."
  breadcrumbs={[{ label: 'الأنشطة' }]}
/>
</div>
  );
}