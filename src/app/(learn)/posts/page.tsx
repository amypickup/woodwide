import { getPosts } from "../../../../sanity/sanity.query";
import type { PostType } from "../../../../types";
import client from "../../../../sanity/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

// TODO: dig into image settings vs. css settings + optimize

export default async function Posts() {
  const posts: PostType[] = await getPosts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <a
              key={post._id}
              href={`posts/${post.slug.current}`}
              className="group"
            >
              <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                {post.mainImage ? (
                  <Image
                    src={builder.image(post.mainImage).width(300).url()}
                    width={300}
                    height={300}
                    alt={post.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
              <p className="text-sm font-light">{post.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
