"use client"
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import { Button } from './ui/button';
import { LogIn, LogOut, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';

const AuthButton = () => {
    const { user, loading, handleSignInWithGoogle, handleSignOut } = useAuth();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {user ? (
                        <Button variant="outline" size="icon">
                            <div className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
                                {loading ?
                                    <div className="w-5 h-5 rounded-full border-4 border-foreground border-r-transparent animate-spin"></div>
                                    : user.photoURL ? <Image
                                        src={user.photoURL}
                                        width={40}
                                        height={40}
                                        alt={user.email ?? "User Image"}
                                        className="rounded-full"
                                    />:(
                                        <div className="flex justify-center items-center w-full h-full">
                                            <UserCircle className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                                        </div>
                                    )
                                }

                            </div>
                        </Button>
                    ) : (
                        <Button variant="outline" size="icon">
                            <UserCircle className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                        </Button>
                    )}
                </DropdownMenuTrigger>
                {user ? (
                    <DropdownMenuContent align='end'>

                        <Link href={"profile"}>
                            <DropdownMenuItem >
                                <UserCircle /> Profile
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className='text-red-800' onClick={handleSignOut}>
                            <LogOut className='text-red-800' /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                ) : (
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem onClick={handleSignInWithGoogle}>
                            <LogIn /> Login
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                )}

            </DropdownMenu>
        </div>
    )
}

export default AuthButton