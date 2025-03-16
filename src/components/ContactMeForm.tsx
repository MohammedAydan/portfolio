import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const ContactMeForm = () => {
    return (
        <section id='contact' className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Contact Me</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">
                <Input placeholder='Your name' className='border-none bg-black/5'/>
                <Input placeholder='Your email address'  className='border-none bg-black/5'/>
                <Textarea placeholder="Write your message here..."  className='border-none bg-black/5'/>
                <Button className='bg-blue-600 w-full'>Send Message</Button>
            </div>
        </section>
    )
}

export default ContactMeForm