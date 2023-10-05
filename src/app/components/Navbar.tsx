import Image from "next/image";
import Link from "next/link";
import Logo from "public/mushroom.svg";

export default function Navbar() {
  return (
    <header className="py-2 px-6 border-b border-white shadow z-30 md:mb-12 mb-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} width={25} height={25} alt="logo" />
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link
                href="/studio/desk"
                className="hover:text-red-400 duration-300"
              >
                Sanity Studio
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-slate-400 duration-300">
                Posts
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="text-indigo-700 hover:text-indigo-400 duration-300"
              >
                Recipes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
