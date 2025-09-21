"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Theme =  "light" | "dark" ;

interface ThemeContextType {
    theme: Theme;
    setTheme : (theme: Theme)=>void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider ({children}:{children: React.ReactNode}){

    // Initialize with undefined to prevent hydration mismatch
    const [currentTheme, setCurrentTheme] = useState<Theme >('light');
     
    const setTheme = (theme: Theme)=>{
        setCurrentTheme(theme);

        if(typeof window !=='undefined'){
            localStorage.setItem("theme", theme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(theme);
        }
    }

    useEffect(()=>{
        if(typeof window !=='undefined'){
            // Get theme from localStorage first, then system preference
            const savedTheme = localStorage.getItem("theme");
            let initialTheme: Theme;
            
            if(savedTheme){
                //if already there then take it
                const theme:Theme =  (savedTheme === 'light' || savedTheme === 'dark')?savedTheme :"light";
                setCurrentTheme(theme);
                // Only apply theme to DOM if it's not already applied (to prevent flash)
                if (!document.documentElement.classList.contains(theme)) {
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(theme);
                }
            } else{
                // Detect from system preference
                const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme = darkThemeMq ? "dark" : "light";
                setCurrentTheme(theme);
                // Only apply theme to DOM if it's not already applied (to prevent flash)
                if (!document.documentElement.classList.contains(theme)) {
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(theme);
                }
            }
            
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
            
            const handleChange = (e:MediaQueryListEvent)=>{
                const theme = e.matches?"dark":"light";
                setCurrentTheme(theme);
                // Apply theme to DOM
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
            }
           
    
            mediaQuery.addEventListener('change', handleChange);
            return ()=>mediaQuery.removeEventListener("change", handleChange);
            // Listen for system theme changes (only if no saved theme)
            
        }
    },[])


    const value = {
        theme: currentTheme!,
        setTheme: setTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(context===undefined){
        throw Error("useTheme must be used where it is wrapped with ThemeProvider")
    }
    return context;
}