import React, { ReactNode } from "react";
import { Header } from "./Header";

type TPageProps = {
  headerTitle: string;
  body: ReactNode;
};

export const PageLayout: React.FC<TPageProps> = ({ body, headerTitle }) => {
  return (
    <div className="grid grid-rows-[48px_1fr] min-h-screen p-4 gap-4 font-[family-name:var(--font-geist-sans)] bg-gray-800">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full bg-gray-900 p-4 rounded-lg">
        {body}
      </main>
    </div>
  );
};
