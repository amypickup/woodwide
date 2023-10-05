import { getDocuments } from "../../../sanity/sanity.query";
import client from "../../../sanity/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import type { DocumentType } from "../../../types";

const builder = imageUrlBuilder(client);

export default async function Home() {
  const docs: DocumentType[] = await getDocuments();

  return (
    <main className="max-w-3xl mx-auto">
      {docs.map((doc) => (
        <a
          key={doc._id}
          href={`${doc._type}s/${doc.slug.current}`}
          className="group md:flex"
        >
          <div className="mb-4 md:basis-1/2">
            {doc.mainImage ? (
              <Image
                src={builder.image(doc.mainImage).width(500).url()}
                width={500}
                height={500}
                alt={doc.title}
                className="object-contain w-500 h-500 group-hover:invert"
              />
            ) : null}
          </div>
          <div className="md:basis-1/2 px-3 mb-4">
            <h3 className="mt-4 text-xl md:text-2xl font-bold group-hover:text-indigo-700">
              {doc.title}
            </h3>
            <p className="text-sm font-light group-hover:text-indigo-700">
              {doc.description}
            </p>
          </div>
        </a>
      ))}
    </main>
  );
}
