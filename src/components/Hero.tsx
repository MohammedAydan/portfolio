import React from 'react'
import { Button } from './ui/button'
import { useDeveloperData } from '@/contexts/PortfolioContext';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Hero = () => {
    const { developerData } = useDeveloperData();
    const t = useTranslations("hero");

    return (
        <div className='flex flex-col items-center text-center mt-50 md:mt-48 my-20'>
            <div className=''>
                <p className='text-3xl md:text-4xl font-bold text-blue-600'>{t("hello")} {developerData?.name}</p>
                <p className='text-xl md:text-2xl font-medium mt-2'>{developerData?.title}</p>
            </div>
            <div className='mt-6'>
                <p>{developerData?.description}</p>
            </div>
            <div className='mt-4 flex justify-start items-center gap-4'>
                {developerData?.actions?.viewProjects &&
                    <Link
                        href={developerData?.actions?.viewProjects ?? ""}
                        target='_blank'>
                        <Button>{t("viewProjects")}</Button>
                    </Link>
                }
                {developerData?.actions?.viewProjects &&
                    <Link
                        href={developerData?.actions?.downloadCV ?? ""}
                        download={true} target='_blank'>
                        <Button variant="outline">{t("downloadCv")}</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Hero