import Image from "next/image";
import Link from "next/link";
import Logo from "public/mushroom.svg";

export default function CookingNavbar() {
  return (
    <header className="py-2 px-6 border-b border-white shadow z-30 md:mb-12 mb-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <Link href="/" className="inline-block">
            <Image src={Logo} width={25} height={25} alt="logo" />
          </Link>
          <span className="inline-block text-purple-400 font-extrabold">
            Cooking
          </span>
        </div>
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link
                href="/studio/desk"
                className="hover:text-purple-400 duration-300"
              >
                Sanity Studio
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="hover:text-purple-400 duration-300"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href="/donate"
                className="text-pink-400 hover:text-pink-700 duration-300"
              >
                Donate
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
