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
      <p className="mt-1 text-lg font-medium text-gray-900">{children}</p>
    ),
  },
};

// TODO: dig into image settings vs. css settings + optimize

export default async function AuthorHero() {
  const authors: AuthorType[] = await getAuthors();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Authors</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {authors.map((author) => (
            <a key={author._id} href={author.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  src={builder.image(author.image).width(300).url()}
                  width={200}
                  height={200}
                  alt={author.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{author.name}</h3>
              <PortableText
                value={author.bio}
                components={mySanityComponents}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
