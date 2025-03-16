
import React from 'react'
import WorkExperienceCard from './WorkExperienceCard'
import { BriefcaseBusiness } from 'lucide-react'

const WorkExperienceSection = () => {
    return (
        <section className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Work Experience</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">
                <WorkExperienceCard
                    title='Joiner Frontend Developer'
                    subTitle='My Projects'
                    // subTitle='Tech Innovations | 2020 - present'
                    icon={BriefcaseBusiness}
                />
                <WorkExperienceCard
                    title='Joiner Backend Developer'
                    subTitle='My Projects'
                    // subTitle='Tech Innovations | 2020 - present'
                    icon={BriefcaseBusiness}
                />
                <WorkExperienceCard
                    title='Joiner Flutter Developer'
                    subTitle='My Projects'
                    // subTitle='Tech Innovations | 2019 - 2020'
                    icon={BriefcaseBusiness}
                />
            </div>
        </section>
    )
}

export default WorkExperienceSection