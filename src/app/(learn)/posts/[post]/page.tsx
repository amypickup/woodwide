import Image from "next/image";
import { Metadata } from "next";
import { getPost } from "../../../../../sanity/sanity.query";
import type { PostType } from "../../../../../types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../../../../sanity/sanity.client";

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
      <p className="max-w-xl mx-auto mb-4 px-3 md:px-0">{children}</p>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="list-inside list-disc max-w-xl mx-auto mb-4 px-3 md:px-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-inside list-decimal max-w-xl mx-auto mb-4 px-3 md:px-0">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value, isInline }) => {
      return (
        <Image
          className="mb-2"
          src={builder
            .image(value)
            .width(isInline ? 100 : 800)
            .fit("max")
            .auto("format")
            .url()}
          width={800}
          height={460}
          alt={value.alt || " "}
          loading="lazy"
        />
      );
    },
  },
};

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await getPost(slug);
  const publishedTime = new Date(post.publishedAt).toLocaleTimeString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="max-w-6xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="block">
          <h1 className="font-bold max-w-xl min-w-xl text-4xl mx-auto mb-2 px-3 md:px-0">
            {post.title}
          </h1>
          <p className="max-w-xl mx-auto mb-4 px-3 md:px-0">
            {post.description}
          </p>
          <div className="max-w-3xl mb-4">
            <Image
              src={builder
                .image(post.mainImage)
                .width(800)
                .fit("max")
                .auto("format")
                .url()}
              width={800}
              height={460}
              alt={post.mainImage?.alt || post.name}
            />
          </div>
          {/* Author Section */}
          <div className="max-w-xl mx-auto mb-4 pl-3 md:pl-0">
            <Image
              width={40}
              height={40}
              src={builder
                .image(post.author.image)
                .width(120)
                .height(120)
                .url()}
              alt={post.author.name}
              className="inline-block mr-2 rounded-full"
            />
            <div className="inline-block text-sm align-middle">
              <div>
                By{" "}
                <a
                  href={"/authors"}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {post.author.name}
                </a>
              </div>
              <div className="font-light text-xs">{publishedTime}</div>
            </div>
          </div>
          {/* Body */}
          <PortableText value={post.body} components={postComponents} />
        </div>
      </div>
    </main>
  );
}
