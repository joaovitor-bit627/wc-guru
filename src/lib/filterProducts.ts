import { Product, Filters } from "@/data/types";

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.internal_code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Multi-select filters
    if (filters.format.length > 0 && !filters.format.includes(p.format)) return false;
    if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
    if (filters.material.length > 0 && !filters.material.includes(p.material)) return false;
    if (filters.fixation_type.length > 0 && !filters.fixation_type.includes(p.fixation_type)) return false;

    // Numeric ranges
    if (filters.width_min !== null && p.width_mm < filters.width_min) return false;
    if (filters.width_max !== null && p.width_mm > filters.width_max) return false;
    if (filters.length_min !== null && p.length_mm < filters.length_min) return false;
    if (filters.length_max !== null && p.length_mm > filters.length_max) return false;
    if (filters.hole_distance_min !== null && p.hole_distance_mm < filters.hole_distance_min) return false;
    if (filters.hole_distance_max !== null && p.hole_distance_mm > filters.hole_distance_max) return false;

    return true;
  });
}
