import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ruler, Wrench, Box, FileText, CheckCircle2, Info } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Produto não encontrado</h2>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/">Voltar ao catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Largura", value: `${product.width_mm} mm`, icon: Ruler },
    { label: "Comprimento", value: `${product.length_mm} mm`, icon: Ruler },
    { label: "Dist. entre furos", value: `${product.hole_distance_mm} mm`, icon: Ruler },
    { label: "Formato", value: product.format, icon: Box },
    { label: "Tipo de fixação", value: product.fixation_type, icon: Wrench },
    { label: "Material", value: product.material, icon: Box },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-6">
        {/* Breadcrumb */}
        <Button asChild variant="ghost" size="sm" className="mb-4 gap-2 text-muted-foreground hover:text-foreground">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao catálogo
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="rounded-xl border border-border bg-card p-8 lg:p-12">
            <img
              src={product.image_url}
              alt={product.name}
              className="mx-auto h-full max-h-96 w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground border-0">
                  {product.format}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {product.brand}
                </Badge>
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground lg:text-3xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Código interno: <span className="font-mono font-medium text-foreground">{product.internal_code}</span>
              </p>
            </div>

            {/* Dimensions highlight */}
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Ruler className="h-4 w-4 text-primary" />
                Dimensões Principais
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-card p-3 text-center border border-border">
                  <p className="text-xs text-muted-foreground">Largura</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">{product.width_mm}</p>
                  <p className="text-xs text-muted-foreground">mm</p>
                </div>
                <div className="rounded-md bg-card p-3 text-center border border-border">
                  <p className="text-xs text-muted-foreground">Comprimento</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">{product.length_mm}</p>
                  <p className="text-xs text-muted-foreground">mm</p>
                </div>
                <div className="rounded-md bg-card p-3 text-center border border-border">
                  <p className="text-xs text-muted-foreground">Dist. furos</p>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">{product.hole_distance_mm}</p>
                  <p className="text-xs text-muted-foreground">mm</p>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="h-4 w-4 text-primary" />
                Especificações Técnicas
              </h3>
              <div className="space-y-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm odd:bg-muted"
                  >
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <spec.icon className="h-3.5 w-3.5" />
                      {spec.label}
                    </span>
                    <span className="font-medium text-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical notes */}
            {product.technical_notes && (
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Info className="h-4 w-4 text-primary" />
                  Observações Técnicas
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.technical_notes}
                </p>
              </div>
            )}

            {/* Compatibility */}
            {product.compatibility && (
              <div className="rounded-lg border border-border bg-compatibility p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-compatibility-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  Compatibilidade
                </h3>
                <p className="text-sm leading-relaxed text-compatibility-foreground">
                  {product.compatibility}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
