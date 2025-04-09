"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname().split("/admin")[1];
    const menuItems = [
        { href: '', label: 'Dashboard' },
        { href: '/users', label: 'Users' },
        { href: '/portfolios', label: 'Portfolios' },
        { href: '/messages', label: 'Messages' },
        { href: '/settings', label: 'Settings' },
    ];

    return (
        <div className="w-64 bg-background text-foreground shadow-xl p-5">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul>
                {menuItems.map((item) => (
                    <Link href={"/admin/" + item.href} key={item.href}>

                        <li
                            className={`mb-2 cursor-pointer py-3 px-4 rounded-2xl ${pathname === item.href
                                ? 'bg-foreground text-background'
                                : 'hover:bg-foreground/10 border'
                                }`}
                        >
                            {item.label}
                        </li>

                    </Link>

                ))}
            </ul>
        </div>
    );
};

export default Sidebar;