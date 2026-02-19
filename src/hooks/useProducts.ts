import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/types";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");
      if (error) throw error;
      return (data ?? []).map((p) => ({
        ...p,
        width_mm: Number(p.width_mm),
        length_mm: Number(p.length_mm),
        hole_distance_mm: Number(p.hole_distance_mm),
      }));
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["products", id],
    enabled: !!id,
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        ...data,
        width_mm: Number(data.width_mm),
        length_mm: Number(data.length_mm),
        hole_distance_mm: Number(data.hole_distance_mm),
      };
    },
  });
}
