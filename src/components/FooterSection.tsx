import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const FooterSection = () => {
  return (
    <footer className="text-center py-9 px-2 bg-foreground/10 text-foreground/90">

      <Link href={"/create-portfolio"} >
        <Button className="w-full mb-4 max-w-3xs" variant={"outline"}>Create Portfolio</Button>
      </Link>

      <p>&copy; {new Date().getFullYear()} Mohammed Aydan. All rights reserved.</p>
    </footer>
  );
};

export default FooterSection;
