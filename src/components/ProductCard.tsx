import { Product } from "@/data/types";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ruler } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-primary/30">
      {/* Image */}
      <div className="relative aspect-square bg-muted p-6">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className="absolute left-3 top-3 bg-tag text-tag-foreground border-0 text-[11px] font-medium">
          {product.format}
        </Badge>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-primary">{product.brand}</p>
        <h3 className="mt-1 font-display text-sm font-semibold leading-snug text-card-foreground line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Ruler className="h-3.5 w-3.5" />
          <span>
            {product.width_mm} × {product.length_mm} mm
          </span>
        </div>

        <div className="mt-auto pt-4">
          <Button asChild variant="outline" size="sm" className="w-full gap-2 text-xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
            <Link to={`/produto/${product.id}`}>
              Ver detalhes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
