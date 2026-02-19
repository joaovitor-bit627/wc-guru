import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/data/types";

type ProductForm = Omit<Product, "id">;

const emptyForm: ProductForm = {
  name: "",
  brand: "",
  internal_code: "",
  width_mm: 0,
  length_mm: 0,
  hole_distance_mm: 0,
  format: "",
  fixation_type: "",
  material: "",
  technical_notes: "",
  compatibility: "",
  image_url: "/placeholder.svg",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { data: products = [], isLoading } = useProducts();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Acesso negado</h2>
          <p className="mt-2 text-muted-foreground">Você não tem permissão de administrador.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
            Voltar ao catálogo
          </Button>
        </div>
      </div>
    );
  }

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    const { id, ...rest } = product;
    setForm(rest);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      ...form,
      width_mm: Number(form.width_mm),
      length_mm: Number(form.length_mm),
      hole_distance_mm: Number(form.hole_distance_mm),
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) {
        toast.error("Erro ao atualizar: " + error.message);
      } else {
        toast.success("Produto atualizado!");
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        toast.error("Erro ao criar: " + error.message);
      } else {
        toast.success("Produto criado!");
      }
    }

    setSaving(false);
    setDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir: " + error.message);
    } else {
      toast.success("Produto excluído!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const updateField = (field: keyof ProductForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Painel Administrativo</h2>
            <p className="text-sm text-muted-foreground">{products.length} produtos cadastrados</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openNew} className="gap-2">
              <Plus className="h-4 w-4" /> Novo Produto
            </Button>
            <Button variant="outline" onClick={() => { signOut(); navigate("/"); }} className="gap-2">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Formato</TableHead>
                  <TableHead>Dimensões</TableHead>
                  <TableHead className="w-24">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.internal_code}</TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{p.name}</TableCell>
                    <TableCell>{p.brand}</TableCell>
                    <TableCell>{p.format}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.width_mm}×{p.length_mm} mm
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2 space-y-2">
              <Label>Nome</Label>
              <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Marca</Label>
              <Input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Código Interno</Label>
              <Input value={form.internal_code} onChange={(e) => updateField("internal_code", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Formato</Label>
              <Input value={form.format} onChange={(e) => updateField("format", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Material</Label>
              <Input value={form.material} onChange={(e) => updateField("material", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Fixação</Label>
              <Input value={form.fixation_type} onChange={(e) => updateField("fixation_type", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>URL da Imagem</Label>
              <Input value={form.image_url} onChange={(e) => updateField("image_url", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Largura (mm)</Label>
              <Input type="number" value={form.width_mm} onChange={(e) => updateField("width_mm", Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Comprimento (mm)</Label>
              <Input type="number" value={form.length_mm} onChange={(e) => updateField("length_mm", Number(e.target.value))} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Distância entre furos (mm)</Label>
              <Input type="number" value={form.hole_distance_mm} onChange={(e) => updateField("hole_distance_mm", Number(e.target.value))} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Observações Técnicas</Label>
              <Textarea value={form.technical_notes} onChange={(e) => updateField("technical_notes", e.target.value)} />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Compatibilidade</Label>
              <Textarea value={form.compatibility} onChange={(e) => updateField("compatibility", e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
