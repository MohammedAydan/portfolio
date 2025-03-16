import { Calendar } from 'lucide-react'
import React, { ElementType } from 'react'

const WorkExperienceCard = (
    {
        title,
        subTitle,
        icon: Icon,
    }:
        {
            title: string,
            subTitle: string,
            icon: ElementType,
        }
) => {
    return (
        <div className='w-full flex justify-between items-center gap-5'>
            <div className='flex justify-start items-center gap-5'>
                <div className="bg-black/5 rounded-xl p-4">
                    <Icon />
                </div>
                <div className="flex flex-col justify-start">
                    <p className='font-medium'>{title}</p>
                    <p className='text-black/50'>{subTitle}</p>
                </div>
            </div>
            <div className="">
                <Calendar />
            </div>
        </div>
    )
}

export default WorkExperienceCard