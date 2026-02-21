"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                router.push("/login");
                return;
            }

            const { data: userData } = await supabase
                .from("users")
                .select("role")
                .eq("id", session.user.id)
                .single();

            const role = userData?.role || "CUSTOMER";

            switch (role) {
                case "RESTAURANT":
                    router.push("/restaurant/dashboard");
                    break;
                case "DRIVER":
                    router.push("/driver/dashboard");
                    break;
                case "ADMIN":
                    router.push("/admin/dashboard");
                    break;
                default:
                    router.push("/customer/dashboard");
            }
        };

        checkUserAndRedirect();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600 dark:text-slate-400">Redirecting to your dashboard...</p>
            </div>
        </div>
    );
}
