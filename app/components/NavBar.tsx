"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const routesList = {
    index: {path: '/', title: 'Palette Builder'},
    saved: {path: '/saved', title: 'Saved Palettes'},
}

export const NavBar = () => {
    const pathname = usePathname();
    return(
    <nav className="w-full flex flex-1 items-baseline justify-between bg-stone-600/30 sticky backdrop-blur z-40 top-0 px-5 py-3 border-b border-stone-200/[0.06]">
      <div>
        <Link
          href={'/'}
          className="navbar-brand text-2xl"
        >
          My Painter's Palette
        </Link>
      </div>
      <div className="flex gap-4">
      {Object.keys(routesList).map((routeObj, index) => {
        const {title, path} = routesList[routeObj as keyof typeof routesList]
        return (
            <Link
                href={path}
                className={`${pathname === path && 'text-rose-500'}`}
                key={`nav-item-${index}`}
            >
            {title}
            </Link>
        )
      })}
      </div>
    </nav>
    );
}