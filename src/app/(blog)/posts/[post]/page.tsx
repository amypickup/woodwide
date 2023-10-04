import Image from "next/image";
import { Metadata } from "next";
import { getPost } from "../../../../../sanity/sanity.query";
import type { PostType, AuthorType } from "../../../../../types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import fallBackImage from "public/mushroom.svg";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../../../../sanity/sanity.client";
import { getImageDimensions } from "@sanity/asset-utils";

type Props = {
  params: {
    post: string;
  };
};

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await getPost(slug);

  return {
    title: `${post.title} | Post`,
    description: post.description,
    openGraph: {
      images: post.mainImage?.image || "add-a-fallback-project-image-here",
      title: post.title,
      description: post.description,
    },
  };
}

const builder = imageUrlBuilder(client);

const postComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="max-w-xl mx-auto mb-4">{children}</p>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="list-inside list-disc max-w-xl mx-auto mb-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-inside list-decimal max-w-xl mx-auto mb-4">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value, isInline }) => {
      const { width, height } = getImageDimensions(value);
      return (
        <Image
          src={builder
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .url()}
          alt={value.alt || " "}
          loading="lazy"
          className="mb-2"
          width={800}
          height={460}
        />
      );
    },
  },
};

const authorBriefComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-1 text-sm font-light text-gray-900">{children}</p>
    ),
  },
};

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await getPost(slug);

  console.log(post);

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-3">
      <div className="max-w-3xl mx-auto">
        <div className="block">
          <h1 className="font-bold max-w-xl min-w-xl text-3xl mx-auto mb-2">
            {post.title}
          </h1>
          <p className="max-w-xl mx-auto mb-4">{post.description}</p>
          <Image
            className="max-w-3xl mx-auto mb-4"
            width={800}
            height={460}
            src={builder.image(post.mainImage).width(800).url()}
            alt={post.mainImage?.alt || post.name}
          />
          <div className="max-w-xl mx-auto mb-4">
            <Image
              width={40}
              height={40}
              src={builder.image(post.author.image).width(40).height(40).url()}
              alt={post.author.name}
              className="inline-block mr-2 rounded-full"
            />
            <div className="inline-block text-sm align-middle">
              <div>
                By{" "}
                <a
                  href={post.author.slug}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {post.author.name}
                </a>
              </div>
              <div className="font-light text-xs">
                {new Date(post.publishedAt).toLocaleTimeString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <PortableText value={post.body} components={postComponents} />
        </div>
      </div>
    </main>
  );
}
