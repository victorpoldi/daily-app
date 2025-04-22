import Auth from "@/components/Auth";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen p-4 gap-4 font-[family-name:var(--font-geist-sans)] bg-gray-800">
      <main className="h-auto flex flex-col gap-[32px] row-start-2 items-center justify-center w-full bg-gray-900 p-4 rounded-lg">
        <Auth />
      </main>
    </div>
  );
}
