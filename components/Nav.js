import React from "react";
import { useRouter } from "next/router";
import { Building2, LogOut } from "lucide-react";
import { clearAuthenticated } from "@/lib/auth";

const Nav = () => {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthenticated();
    router.push("/");
  };

  return (
    <div className="sticky top-0 z-30 h-20 flex items-center justify-between px-6 md:px-10 bg-neutral text-neutral-content shadow-soft">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <Building2 size={20} />
        </div>
        <span className="ml-3 leading-tight">
          <span className="block text-xl md:text-2xl font-bold tracking-tight">
            Bibek <span className="text-primary">NextGen</span>
          </span>
          <span className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-content/60">
            Technologies
          </span>
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-sm btn-outline text-neutral-content border-neutral-content/30 hover:bg-neutral-content/10 hover:border-neutral-content/30 gap-2"
      >
        <LogOut size={16} />
        <span className="hidden sm:inline">Log out</span>
      </button>
    </div>
  );
};

export default Nav;
