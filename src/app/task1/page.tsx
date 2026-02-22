import ProductPage from "@/pages/task1/productPage";
import Loading from "@/templates/loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loading/>}>
      <ProductPage />
    </Suspense>
  );
}
