"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import NavBar from './NavBar'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { ModeToggle } from './ModeToggle'
import { useTranslations } from 'next-intl'
import { LocaleToggle } from './LocaleToggle'
import AuthButton from './AuthButton'

const Header = () => {
    const [showDialog, setShowDialog] = useState<boolean>(true);
    const t = useTranslations("navBar");

    return (
        <div>
            <div className=" px-4 py-3 border-b border-foreground/10 fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-xs">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                        <Link href={"/"} >
                            <div className='font-bold'>My Portfolio</div>
                        </Link>
                        <div className="hidden md:block">
                            <NavBar />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Link href={"#contact"}>
                            <Button className='flex justify-center items-center gap-2 py-1 px-2' variant={"outline"}><Mail size={16} /> {t("contact")}</Button>
                        </Link>

                        <ModeToggle />

                        <LocaleToggle />

                        <AuthButton />

                    </div>
                </div>
                <div className="flex justify-center items-center md:hidden mt-2 md:mt-0">
                    <NavBar />
                </div>
            </div>

            {showDialog && <div className="fixed z-50 top-28 md:top-20 left-10 md:left-20 right-10 md:right-20 p-3 border border-foreground/10 rounded-2xl bg-background/5 backdrop-blur-sm">
                <div className="w-full flex justify-between items-center">
                    <Link href={"/create-portfolio"} >
                        <Button>Create Portfolio</Button>

                    </Link>
                    <Button variant={"destructive"} onClick={() => setShowDialog(false)}>Close</Button>
                </div>
            </div>}

        </div>
    )
}

export default Header