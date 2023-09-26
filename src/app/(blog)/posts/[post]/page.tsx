// app/projects/[project]/page.tsx

import Image from "next/image";
import { Metadata } from "next";
import { getPost } from "../../../../../sanity/sanity.query";
import type { PostType } from "../../../../../types";
import { PortableText } from "@portabletext/react";
import fallBackImage from "public/mushroom.svg";
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

export default async function Post({ params }: Props) {
  const slug = params.post;
  const post: PostType = await getPost(slug);

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-bold lg:text-5xl text-3xl lg:leading-tight mb-4">
            {post.title}
          </h1>
        </div>

        <Image
          className="rounded-xl border border-zinc-800"
          width={800}
          height={460}
          src={builder.image(post.mainImage).width(800).url()}
          alt={post.mainImage?.alt || post.name}
        />

        <PortableText value={post.body} />
      </div>
    </main>
  );
}
