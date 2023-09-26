// app/page.tsx
import AuthorHero from "../../components/AuthorHero";

export default async function Authors() {
  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      <AuthorHero />
    </main>
  );
}
