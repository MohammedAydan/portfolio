import {
    Code, Server, Wrench, Smartphone, ShoppingCart, Globe, Database, Terminal,
    ShieldCheck, Cpu, Cloud, FlaskConical, Puzzle, Book, LayoutDashboard, FileText, Users,
    PanelsTopLeft,
    Paintbrush
} from "lucide-react";
import { ElementType } from "react";

const GetIconByCategory = (category: string) => {
    const icons: Record<string, ElementType> = {
        "web": PanelsTopLeft,
        "frontend": Code,
        "backend": Server,
        "fullstack": Globe,
        "mobile": Smartphone,
        "ecommerce": ShoppingCart,
        "e-commerce": ShoppingCart,
        "tools": Wrench,
        "database": Database,
        "ui/ux": Paintbrush,
        "cli": Terminal,
        "security": ShieldCheck,
        "ai/ml": Cpu,
        "cloud": Cloud,
        "devops": FlaskConical,
        "plugin": Puzzle,
        "education": Book,
        "dashboard": LayoutDashboard,
        "documentation": FileText,
        "social": Users,
    };

    return icons[category.toLowerCase()] || Code;
};

export default GetIconByCategory;