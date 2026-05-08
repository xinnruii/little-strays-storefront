export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  pet_names: string | null;
  delivery_address: string | null;
  delivery_notes: string | null;
  is_admin?: boolean | null;
  created_at?: string;
  updated_at?: string;
};

export const blankProfile = {
  full_name: "",
  phone: "",
  pet_names: "",
  delivery_address: "",
  delivery_notes: ""
};
