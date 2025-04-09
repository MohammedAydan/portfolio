import React from "react";
import HeaderDashboard from "../_components/header-dashboard";
import Sidebar from "../_components/side-bar";
import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth-action";
import { getUserData } from "@/lib/firebase/auth";

const layout = async ({ children }: { children: React.ReactNode }) => {
  await AuthorizationChecker();

  return (
    <div className="bg-background h-screen">
      {/* Header dashboard */}
      <HeaderDashboard />

      <div className="flex w-full" style={{ height: "calc(100vh - 64px)" }}>
        {/* Left Menu */}
        <Sidebar />

        {/* Right Data Section */}
        <div className="w-full overflow-auto flex-1 bg-background p-5 border-l border-t rounded-tl-4xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;

const AuthorizationChecker = async () => {
  const session = await getSession();

  if (!session) {
    return redirect("/auth");
  }

  const origin =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${origin}/api/admin/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return redirect("/auth");
    }

    const data = await res.json();

    if (!data || !data?.uid) {
      return redirect("/auth");
    }

    const user = await getUserData(data.uid);

    if (!user || user.role !== "admin") {
      return redirect("/");
    }

    return;
  } catch (err) {
    return redirect("/auth");
  }
};
