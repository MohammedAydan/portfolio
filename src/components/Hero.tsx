import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
    return (
        <div className='flex flex-col items-center text-center mt-40 md:mt-32 my-20'>
            <div className=''>
                <p className='text-3xl md:text-4xl font-bold text-blue-600'>Hello, Im Mohamed Aydan</p>
                <p className='text-xl md:text-2xl font-medium mt-2'>Full Stack And Flutter Developer</p>
            </div>
            <div className='mt-6'>
                <p>Building innovative web solutions with modern technologies</p>
            </div>
            <div className='mt-4 flex justify-start items-center gap-4'>
                <Button className='bg-blue-600'>View projects</Button>
                <Button variant="outline" className='text-blue-600 border-blue-600'>Download cv</Button>
            </div>
        </div>
    )
}

export default Hero