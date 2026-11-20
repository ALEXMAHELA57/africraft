import { Globe } from "lucide-react";
import AuthStatus from "./AuthStatus";

export default function TopBar() {
  return (
    <div className="bg-ink text-xs text-white">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4">
        <p className="flex items-center gap-3">
          <Globe size={14} aria-hidden />
          <span>Explore Africa</span>
          <span aria-hidden className="text-white/30">|</span>
          <span>Support Local</span>
          <span aria-hidden className="hidden text-white/30 sm:inline">|</span>
          <span className="hidden sm:inline">Experience More</span>
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">English</span>
          <AuthStatus />
        </div>
      </div>
    </div>
  );
}
