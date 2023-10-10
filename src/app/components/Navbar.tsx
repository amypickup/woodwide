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
              <Link href="/shop" className="hover:text-slate-400 duration-300">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/posts" className="hover:text-slate-400 duration-300">
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="/recipes"
                className="text-indigo-700 hover:text-indigo-400 duration-300"
              >
                Cook
              </Link>
            </li>
            {/*<li>
              <Link
                href="/support"
                className="text-pink-400 hover:text-pink-700 duration-300"
              >
                Support
              </Link>
  </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
