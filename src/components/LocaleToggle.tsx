"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export function LocaleToggle() {
  const t = useTranslations("navBar");
  const router = useRouter();

  const changeLocale = (locale: string) => {
    router.replace(`/${locale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("en")}>
          {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("ar")}>
          {t("arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
