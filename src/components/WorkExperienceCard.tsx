import { Calendar } from 'lucide-react'
import React, { ElementType, JSX } from 'react'

const WorkExperienceCard = (
    {
        title,
        subTitle,
        icon: Icon,
        actions,
    }:
        {
            title: string,
            subTitle: string,
            icon: ElementType,
            actions?: JSX.Element,
        }
) => {
    return (
        <div className='w-full flex justify-between items-center gap-5'>
            <div className='flex justify-start items-center gap-5'>
                <div className="bg-foreground/10 rounded-xl p-4">
                    <Icon />
                </div>
                <div className="flex flex-col justify-start">
                    <p className='font-medium text-foreground'>{title}</p>
                    <p className='text-foreground/70'>{subTitle}</p>
                </div>
            </div>
            <div className="flex justify-between items-center gap-2">
                <Calendar />
                {actions}
            </div>
        </div>
    )
}

export default WorkExperienceCard