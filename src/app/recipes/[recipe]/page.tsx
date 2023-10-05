import Image from "next/image";
import { Metadata } from "next";
import { getRecipe } from "../../../../sanity/sanity.query";
import type { RecipeType } from "../../../../types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../../../sanity/sanity.client";

type Props = {
  params: {
    recipe: string;
  };
};

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.recipe;
  const recipe: RecipeType = await getRecipe(slug);

  return {
    title: `${recipe.title} | Recipe`,
    description: recipe.description,
    openGraph: {
      images: recipe.mainImage?.image || "add-a-fallback-project-image-here",
      title: recipe.title,
      description: recipe.description,
    },
  };
}

const builder = imageUrlBuilder(client);

const authorBriefComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-1 text-sm font-light text-gray-900">{children}</p>
    ),
  },
};

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="">{children}</p>,
  },
};

const ingredientsComponents: PortableTextComponents = {
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

export default async function Recipe({ params }: Props) {
  const slug = params.recipe;
  const recipe: RecipeType = await getRecipe(slug);

  return (
    <main className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-8 md:gap-x-8 md:gap-y-3">
        <div className="col-span-3">
          <h1 className="font-semibold text-4xl mb-2 px-3 md:px-0">
            {recipe.title}
          </h1>
          {/* Author Section, TODO: build out author detail page, recipe.author.slug.current */}
          <div className="mb-4 px-3 md:px-0">
            <Image
              width={40}
              height={40}
              src={builder
                .image(recipe.author.image)
                .width(120)
                .height(120)
                .url()}
              alt={recipe.author.name}
              className="inline-block mr-2 rounded-full"
            />
            <div className="inline-block text-sm align-middle">
              <div>
                By{" "}
                <a
                  href={"/authors"}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {recipe.author.name}
                </a>
              </div>
              <div className="font-light text-xs">
                {new Date(recipe.publishedAt).toLocaleTimeString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-5">
          <Image
            src={builder
              .image(recipe.mainImage)
              .width(800)
              .fit("max")
              .auto("format")
              .url()}
            width={800}
            height={460}
            alt={recipe.mainImage?.alt || recipe.name}
          />
        </div>

        <div className="col-span-3 mx-3 md:mx-0">{recipe.time}</div>

        <div className="col-span-5 mb-3 md:mb-0 mx-3 md:mx-0">
          {recipe.story}
        </div>

        <div className="col-span-3 border-black border-t-4 mx-3 md:mx-0">
          <div className="uppercase font-bold text-lg mb-6">Ingredients</div>
          <PortableText
            value={recipe.ingredients}
            components={ingredientsComponents}
          />
        </div>

        <div className="col-span-5 border-black border-t-4 mx-3 md:mx-0">
          <div className="uppercase font-bold text-lg mb-6">Preparation</div>
          {recipe.instructions.map((instruction, index) => (
            <div>
              <div className="font-bold">Step {index + 1}</div>
              <div className="mb-4">{instruction}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
