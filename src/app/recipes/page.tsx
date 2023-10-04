import { getRecipes } from "../../../sanity/sanity.query";
import type { RecipeType } from "../../../types";
import { PortableTextComponents } from "@portabletext/react";
import client from "../../../sanity/sanity.client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

export default async function Recipes() {
  const recipes: RecipeType[] = await getRecipes();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Recipes</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recipes.map((recipe) => (
            <a
              key={recipe._id}
              href={`recipes/${recipe.slug.current}`}
              className="group"
            >
              <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                {recipe.mainImage ? (
                  <Image
                    src={builder.image(recipe.mainImage).width(300).url()}
                    width={300}
                    height={300}
                    alt={recipe.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm font-light">{recipe.author.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
