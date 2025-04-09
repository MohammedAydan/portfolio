import React, { useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendMessage, MessageFields } from '@/lib/firebase/SendMessage'
import { useParams } from 'next/navigation'

const ContactMeForm = () => {
    const params = useParams();
    const { message, setMessage, loading, error, success, saveMessage } = useSendMessage({
        name: params.name?.toString()
    });

    return (
        <section id='contact' className="mt-9 w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-center">Contact Me</h2>
            <div className="flex flex-col justify-center items-start gap-5 m-5 mt-5">
                <Input
                    placeholder='Your name'
                    className='bg-foreground/10'
                    value={message.name}
                    onChange={(e) => setMessage({ ...message, name: e.target.value })}
                />
                <Input
                    placeholder='Your email address'
                    className='bg-foreground/10'
                    value={message.email}
                    onChange={(e) => setMessage({ ...message, email: e.target.value })}
                />
                <Textarea
                    placeholder="Write your message here..."
                    className='bg-foreground/10'
                    value={message.message}
                    onChange={(e) => setMessage({ ...message, message: e.target.value })}
                />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">Message sent successfully!</p>}
                <Button
                    className='w-full'
                    onClick={saveMessage}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Message"}
                </Button>
            </div>
        </section>
    )
}

export default ContactMeForm;



const useSendMessage = ({ name }: { name?: string } = {}) => {
    const [message, setMessage] = useState<MessageFields>({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const saveMessage = async () => {
        setSuccess(false);
        setError(null);
        if (loading) return;
        if (!message.name || !message.email || !message.message) {
            setError("All fields are required");
            return;
        }
        if (message.name.length < 3) {
            setError("Name must be at least 3 characters long");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(message.email)) {
            setError("Invalid email address");
            return;
        }
        if (message.message.length < 10) {
            setError("Message must be at least 10 characters long");
            return;
        }
        if (message.message.length > 500) {
            setError("Message must be less than 500 characters long");
            return;
        }

        setError(null);
        setLoading(true);
        try {
            await SendMessage({ ...message, portfolioName: name ?? "" });
            setMessage({ name: "", email: "", message: "" });
            setSuccess(true);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Failed to send message");
            }
        } finally {
            setLoading(false);
        }
    };


    return {
        message,
        setMessage,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess,
        saveMessage,
    }
}