import { Code, Home, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const t = useTranslations("navBar");
    return (
        <div className='ml-6 flex justify-start items-center gap-2'>
            <ul className='flex justify-start items-center gap-4'>
                <Link href={"/"}>
                    <li className='flex justify-center items-center gap-2 text-foreground/90 bg-foreground/10 hover:bg-foreground/20 transition py-1 px-2 rounded-lg'><Home size={16} /> {t("home")}</li>
                </Link>
                <Link href={"#my-projects"}>
                    <li className='flex justify-center items-center gap-2 text-foreground/90 bg-foreground/10 hover:bg-foreground/20 transition py-1 px-2 rounded-lg'><Code size={16} /> {t("projects")}</li>
                </Link>
                <Link href={"#skills"}>
                    <li className='flex justify-center items-center gap-2 text-foreground/90 bg-foreground/10 hover:bg-foreground/20 transition py-1 px-2 rounded-lg'><Star size={16} /> {t("skills")}</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar