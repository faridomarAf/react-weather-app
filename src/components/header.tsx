import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-provider"
import ThemeToggle from "./theme-toggle";


export default function Header() {
    const {theme} = useTheme();
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2'>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to={"/"}>
                <h1 className={theme === "dark" ? "text-yellow-400" : "text-neutral-700"}>Home</h1>
                </Link>
                <div className="flex gap-4">
                    <h1>CitySearch</h1>
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    )
}
