
import React from 'react'
import WorkExperienceCard from './WorkExperienceCard'
import { BriefcaseBusiness } from 'lucide-react'
import { useDeveloperData } from '@/contexts/PortfolioContext';

const WorkExperienceSection = () => {
    const { developerData } = useDeveloperData();

    return (
        <section className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Work Experience</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">


                {developerData?.workExperience.map((w) => (
                    <WorkExperienceCard
                        key={w.title}
                        title={w.title}
                        subTitle={w.company}
                        icon={BriefcaseBusiness}
                    />
                ))}

            </div>
        </section>
    )
}

export default WorkExperienceSection