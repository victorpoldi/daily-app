// import Auth from "@/components/Auth";

import Category from "@/components/Category";

export default function CategoryPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>CATEGORY PAGE</header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Category />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
