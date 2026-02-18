import { Product } from "@/data/types";
import ProductCard from "./ProductCard";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  totalCount: number;
}

const ProductGrid = ({ products, totalCount }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageSearch className="h-12 w-12 text-muted-foreground/40" />
        <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
          Nenhum produto encontrado
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente ajustar os filtros ou o termo de busca.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        Exibindo <span className="font-medium text-foreground">{products.length}</span> de{" "}
        <span className="font-medium text-foreground">{totalCount}</span> produtos
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, i) => (
          <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
