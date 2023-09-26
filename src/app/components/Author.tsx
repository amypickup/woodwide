// app/page.tsx

import { getAuthors } from "../../../sanity/sanity.query";
import type { AuthorType } from "../../../types";
import { PortableText } from "@portabletext/react";
import client from "../../../sanity/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

export default async function Author() {
  const authors: AuthorType[] = await getAuthors();

  return (
    <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
      {authors &&
        authors.map((author) => (
          <div key={author._id} className="lg:max-w-2xl max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
              {author.name}
            </h1>
            <Image
              src={builder.image(author.image).width(200).url()}
              width={200}
              height={200}
              alt={author.name}
            />
            <PortableText value={author.bio} />
          </div>
        ))}
    </section>
  );
}
