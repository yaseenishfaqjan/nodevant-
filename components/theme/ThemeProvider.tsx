"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

/** Wraps the app; keeps React state in sync with the <html data-theme> attribute
 *  that the no-flash inline script set before paint. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("nodevant-theme", next);
      } catch {
        /* storage unavailable — session-only */
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta)
        meta.setAttribute("content", next === "light" ? "#FAFAFC" : "#0C0C0F");
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

/** Inline string run before paint to prevent a flash of the wrong theme. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('nodevant-theme');var t=s||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#FAFAFC':'#0C0C0F');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
