import React from 'react'
import EducationAndCCard from './EducationAndCCard'
import { GraduationCap, ShieldCheck } from 'lucide-react'
import { useDeveloperData } from '@/contexts/PortfolioContext';

const EducationAndCertificationsSection = () => {
    const { developerData } = useDeveloperData();

    return (
        <section className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Education & Certifications</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">


                {developerData?.educationAndCertifications?.map((eOrc) => (
                    <EducationAndCCard
                        key={eOrc.title}
                        title={eOrc.title}
                        subTitle={eOrc.subTitle}
                        icon={eOrc.type.toLocaleLowerCase().includes("certification") ? ShieldCheck : GraduationCap}
                    />
                ))}
            </div>
        </section>
    )
}

export default EducationAndCertificationsSection