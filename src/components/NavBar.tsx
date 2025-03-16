import { Code, Home, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='ml-6 flex justify-start items-center gap-2'>
            <ul className='flex justify-start items-center gap-4'>
                <Link href={"#home"}>
                    <li className='flex justify-center items-center gap-2 text-black/90 bg-black/5 hover:bg-black/10 transition py-1 px-2 rounded-lg'><Home size={16} /> Home</li>
                </Link>
                <Link href={"#my-projects"}>
                    <li className='flex justify-center items-center gap-2 text-black/90 bg-black/5 hover:bg-black/10 transition py-1 px-2 rounded-lg'><Code size={16} /> Projects</li>
                </Link>
                <Link href={"#skills"}>
                    <li className='flex justify-center items-center gap-2 text-black/90 bg-black/5 hover:bg-black/10 transition py-1 px-2 rounded-lg'><Star size={16} /> Skills</li>
                </Link>
            </ul>
        </div>
    )
}

export default NavBar