import { Filters, defaultFilters } from "@/data/types";
import { getUniqueValues } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const formats = getUniqueValues("format");
const brands = getUniqueValues("brand");
const materials = getUniqueValues("material");
const fixationTypes = getUniqueValues("fixation_type");

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="space-y-1.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <Checkbox
              checked={selected.includes(opt)}
              onCheckedChange={() => onToggle(opt)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function RangeInput({
  label,
  unit,
  minVal,
  maxVal,
  onMinChange,
  onMaxChange,
}: {
  label: string;
  unit: string;
  minVal: number | null;
  maxVal: number | null;
  onMinChange: (v: number | null) => void;
  onMaxChange: (v: number | null) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} ({unit})
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min"
          value={minVal ?? ""}
          onChange={(e) => onMinChange(e.target.value ? Number(e.target.value) : null)}
          className="h-8 text-sm"
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          placeholder="Max"
          value={maxVal ?? ""}
          onChange={(e) => onMaxChange(e.target.value ? Number(e.target.value) : null)}
          className="h-8 text-sm"
        />
      </div>
    </div>
  );
}

const FilterPanel = ({ filters, onChange }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const hasActiveFilters =
    filters.format.length > 0 ||
    filters.brand.length > 0 ||
    filters.material.length > 0 ||
    filters.fixation_type.length > 0 ||
    filters.width_min !== null ||
    filters.width_max !== null ||
    filters.length_min !== null ||
    filters.length_max !== null ||
    filters.hole_distance_min !== null ||
    filters.hole_distance_max !== null;

  const activeCount = [
    filters.format.length,
    filters.brand.length,
    filters.material.length,
    filters.fixation_type.length,
    filters.width_min !== null || filters.width_max !== null ? 1 : 0,
    filters.length_min !== null || filters.length_max !== null ? 1 : 0,
    filters.hole_distance_min !== null || filters.hole_distance_max !== null ? 1 : 0,
  ].reduce((a, b) => a + (b > 0 ? 1 : 0), 0);

  const content = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-foreground">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onChange({ ...defaultFilters, search: filters.search })}
          >
            <X className="mr-1 h-3 w-3" />
            Limpar
          </Button>
        )}
      </div>

      <CheckboxGroup
        label="Formato"
        options={formats}
        selected={filters.format}
        onToggle={(v) => onChange({ ...filters, format: toggleArray(filters.format, v) })}
      />

      <CheckboxGroup
        label="Marca"
        options={brands}
        selected={filters.brand}
        onToggle={(v) => onChange({ ...filters, brand: toggleArray(filters.brand, v) })}
      />

      <CheckboxGroup
        label="Material"
        options={materials}
        selected={filters.material}
        onToggle={(v) => onChange({ ...filters, material: toggleArray(filters.material, v) })}
      />

      <CheckboxGroup
        label="Tipo de Fixação"
        options={fixationTypes}
        selected={filters.fixation_type}
        onToggle={(v) => onChange({ ...filters, fixation_type: toggleArray(filters.fixation_type, v) })}
      />

      <RangeInput
        label="Largura"
        unit="mm"
        minVal={filters.width_min}
        maxVal={filters.width_max}
        onMinChange={(v) => onChange({ ...filters, width_min: v })}
        onMaxChange={(v) => onChange({ ...filters, width_max: v })}
      />

      <RangeInput
        label="Comprimento"
        unit="mm"
        minVal={filters.length_min}
        maxVal={filters.length_max}
        onMinChange={(v) => onChange({ ...filters, length_min: v })}
        onMaxChange={(v) => onChange({ ...filters, length_max: v })}
      />

      <RangeInput
        label="Distância entre furos"
        unit="mm"
        minVal={filters.hole_distance_min}
        maxVal={filters.hole_distance_max}
        onMinChange={(v) => onChange({ ...filters, hole_distance_min: v })}
        onMaxChange={(v) => onChange({ ...filters, hole_distance_max: v })}
      />
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
        {isOpen && (
          <div className="mb-4 rounded-lg border border-border bg-card p-4">
            {content}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
          {content}
        </div>
      </aside>
    </>
  );
};

export default FilterPanel;
