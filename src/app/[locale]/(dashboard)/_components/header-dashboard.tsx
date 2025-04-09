import AuthButton from '@/components/AuthButton'
import React from 'react'

const HeaderDashboard = () => {
    return (
        <div className="w-full h-16 bg-background text-foreground px-5 flex items-center justify-between">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <AuthButton />
        </div>)
}

export default HeaderDashboard