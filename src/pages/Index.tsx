import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { defaultFilters, Filters } from "@/data/types";
import { filterProducts } from "@/lib/filterProducts";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { data: products = [], isLoading } = useProducts();

  const filtered = useMemo(() => filterProducts(products, filters), [filters, products]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search bar */}
      <div className="border-b border-border bg-surface-raised">
        <div className="container py-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, código ou marca..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="h-12 pl-11 text-base bg-background border-border shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-6">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <FilterPanel filters={filters} onChange={setFilters} products={products} />
            <main className="flex-1 min-w-0">
              <ProductGrid products={filtered} totalCount={products.length} />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
