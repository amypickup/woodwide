import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-44">
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16 text-zinc-400">
        <ul className="text-sm">
          <li>
            <Link href="/studio/desk">Sanity Studio</Link>
          </li>
        </ul>
        <small className=" duration-200 font-mono">
          All rights reserved &copy; {new Date().getFullYear()}
        </small>
        <small className="hover:text-white duration-200">
          <a
            href="https://github.com/amypickup/woodwide"
            target="_blank"
            rel="noreferrer noopener"
          >
            By <span className="text-green-400">Amy Pickup</span>
          </a>
        </small>
      </div>
    </footer>
  );
}
