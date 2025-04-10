import Home from "@/components/Home";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-8 gap-8 font-[family-name:var(--font-geist-sans)]">
      <header>HOMEPAGE</header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Home />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
