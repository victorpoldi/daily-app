import Category from "@/components/Category/Category";
import { PageLayout } from "@/components/ui/PageLayout";

export default function CategoryPage() {
  return (
    <PageLayout body={<Category />} headerTitle="Category" />
  );
}
