import React from 'react'
import EducationAndCCard from './EducationAndCCard'
import { GraduationCap, ShieldCheck } from 'lucide-react'

const EducationAndCertificationsSection = () => {
    return (
        <section className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Education & Certifications</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">
                <EducationAndCCard
                    title='Bachelor of Computer Science'
                    subTitle='University of Mansoura | 2022 - 2027'
                    icon={GraduationCap}
                />
                <EducationAndCCard
                    title='Ezzsteel Internship Program 2024'
                    subTitle='Held from august 4 to august 15'
                    icon={ShieldCheck}
                />
            </div>
        </section>
    )
}

export default EducationAndCertificationsSection