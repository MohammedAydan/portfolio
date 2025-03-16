import React from 'react'
import { Button } from './ui/button'
import NavBar from './NavBar'
import Link from 'next/link'
import { Mail } from 'lucide-react'

const Header = () => {
    return (
        <div className=" px-4 py-3 border-b border-black/10 fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-xs">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                    <div className='font-bold'>My Portfolio</div>
                    <div className="hidden md:block">
                        <NavBar />
                    </div>
                </div>
                <div>
                <Link href={"#contact"}>
                    <Button className='flex justify-center items-center gap-2 py-1 px-2 rounded-lg'><Mail size={16} />Contact</Button>
                </Link>
                    
                </div>
            </div>
            <div className="flex justify-center items-center md:hidden mt-2 md:mt-0">
                <NavBar />
            </div>
        </div>
    )
}

export default Header