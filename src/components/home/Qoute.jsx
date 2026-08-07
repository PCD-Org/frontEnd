import { Quote } from "lucide-react"

export const Qoute = () => {
    return (
        <section className="py-16 px-4 -mt-15 md:px-8 bg-primary-dark  mb-12">
            <div className="flex flex-col gap-3 justify-center items-center ">
                <Quote className="w-10 h-10 text-primary" />
                <h2 className="text-white font-bold text-3xl">"نلتزم بنشر الوعي البيئي والتصدي للتغير المناخي لخلق
                    بيئة سليمة للأجيال الحالية والمستقبلية."</h2>

                <p className="text-primary ">__________ رؤيتنا للمستقبل __________</p>
            </div>


        </section>
    )
}
