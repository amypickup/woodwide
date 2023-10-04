import { getAuthors } from "../../../sanity/sanity.query";
import type { AuthorType } from "../../../types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import client from "../../../sanity/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { Inter } from "next/font/google";

const builder = imageUrlBuilder(client);
const mySanityComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-1 text-sm font-light text-gray-900">{children}</p>
    ),
  },
};

// TODO: dig into image settings vs. css settings + optimize

export default async function AuthorHero() {
  const authors: AuthorType[] = await getAuthors();

  return (
    <div className="bg-gray-100 rounded-lg">
      <div className="mx-auto max-w-2xl px-3 py-12 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Authors</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10">
          {authors.map((author) => (
            <a
              key={author._id}
              href={author.slug}
              className="group grid grid-cols-2 gap-x-6 xs:grid-cols-1"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <Image
                  src={builder.image(author.image).width(300).url()}
                  width={200}
                  height={200}
                  alt={author.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mx-2">
                <h3 className="text-xl text-gray-700">{author.name}</h3>
                <PortableText
                  value={author.bio}
                  components={mySanityComponents}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
