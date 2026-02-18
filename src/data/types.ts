export interface Product {
  id: string;
  name: string;
  brand: string;
  internal_code: string;
  width_mm: number;
  length_mm: number;
  hole_distance_mm: number;
  format: string;
  fixation_type: string;
  material: string;
  technical_notes: string;
  compatibility: string;
  image_url: string;
}

export interface Filters {
  search: string;
  format: string[];
  brand: string[];
  material: string[];
  fixation_type: string[];
  width_min: number | null;
  width_max: number | null;
  length_min: number | null;
  length_max: number | null;
  hole_distance_min: number | null;
  hole_distance_max: number | null;
}

export const defaultFilters: Filters = {
  search: "",
  format: [],
  brand: [],
  material: [],
  fixation_type: [],
  width_min: null,
  width_max: null,
  length_min: null,
  length_max: null,
  hole_distance_min: null,
  hole_distance_max: null,
};
