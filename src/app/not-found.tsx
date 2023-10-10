import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-indigo-700 text-center">
      <div className="text-7xl text-bold mt-24">404</div>
      <div className="text-md">there&apos;s nothing here</div>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 hover:bg-gray-100"
      >
        Head home
      </Link>
    </div>
  );
}
