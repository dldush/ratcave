"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-1 border border-ink-900 rounded-full hover:bg-ink-900 hover:text-paper transition-colors flex items-center justify-center w-6 h-6"
      title="Toggle Magic (Dark Mode)"
    >
      {theme === "light" ? (
        <Sun className="h-3 w-3" />
      ) : (
        <Moon className="h-3 w-3" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
