import Home from "@/components/Home/Home";
import { PageLayout } from "@/components/ui/PageLayout";

export default function HomePage() {
  return (
    <PageLayout body={<Home />} headerTitle="Home" />
  );
}
