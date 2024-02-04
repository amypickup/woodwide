import { createClient, type ClientConfig } from "@sanity/client";
import type { RecipeImportType } from "@/types";

const writeConfig: ClientConfig = {
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: "2023-07-16",
  token: process.env.SANITY_STUDIO_IMPORT_API_KEY,
  useCdn: false,
};

const config: ClientConfig = {
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: "2023-07-16",
  useCdn: false,
};

// update config to writeConfig if writing to Sanity in development
const client = createClient(writeConfig);

export async function createRecipe(recipe: RecipeImportType) {
  const result = client.createIfNotExists(recipe).then((res) => {
      console.log(`Recipe was created, document ID is ${res._id}`)
    })
  return result;
}

export default client;

/*
createRecipe({
  _id: "123sef",
  _type: "recipe",
  title: "Test Import Recipe",
  description:
    "A recipe for Cordyceps Chicken Soup that combines the potential health benefits of Cordyceps militaris with the comfort of a classic chicken soup.",
  story:
    "This tutorial does not attempt to be comprehensive and cover every single feature, or even every commonly used feature. Instead, it introduces many of Python’s most noteworthy features, and will give you a good idea of the language’s flavor and style.",
  slug: {
    current: "test-recipe",
    _type: "slug",
  },
  time: "50 hours",
  ingredientsImport: [
    {
      _key: "1235",
      sectionTitle: "For the Test",
      sectionIngredients: ["10-15 tests", "1 expects"],
    },
    {
      _key: "345qtwresfdg",
      sectionTitle: "For the Import",
      sectionIngredients: ["1 whole import", "10 cups hot water"],
    },
  ],
  instructions: [
    "Python is an easy to learn, powerful programming language. It has efficient high-level data structures and a simple but effective approach to object-oriented programming. Python’s elegant syntax and dynamic typing, together with its interpreted nature, make it an ideal language for scripting and rapid application development in many areas on most platforms.",
    "The Python interpreter and the extensive standard library are freely available in source or binary form for all major platforms from the Python web site, https://www.python.org/, and may be freely distributed. The same site also contains distributions of and pointers to many free third party Python modules, programs and tools, and additional documentation.",
    "The Python interpreter is easily extended with new functions and data types implemented in C or C++ (or other languages callable from C). Python is also suitable as an extension language for customizable applications.",
    "This tutorial introduces the reader informally to the basic concepts and features of the Python language and system. It helps to have a Python interpreter handy for hands-on experience, but all examples are self-contained, so the tutorial can be read off-line as well.",
  ],
}); */