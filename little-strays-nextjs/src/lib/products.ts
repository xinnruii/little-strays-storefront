export type Product = {
  slug: string;
  name: string;
  category: "Walk" | "Rest" | "Play" | "Care" | "Home";
  price: number;
  shortDescription: string;
  description: string;
  materials: string[];
  color: string;
  image: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "willow-walk-set",
    name: "Willow Walk Set",
    category: "Walk",
    price: 86,
    shortDescription: "A soft cotton lead and adjustable collar for slow city loops.",
    description:
      "Made for steady mornings, the Willow Walk Set pairs a woven cotton lead with brass-toned hardware and a gentle adjustable collar.",
    materials: ["Organic cotton webbing", "Brass-finish hardware", "Recycled label"],
    color: "Fern",
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    slug: "cloud-nap-bed",
    name: "Cloud Nap Bed",
    category: "Rest",
    price: 148,
    shortDescription: "A low, washable bed with a quilted cotton cover.",
    description:
      "A quietly plush landing spot with a structured rim, removable cover, and resilient fill made for daily naps and evening sprawl.",
    materials: ["Quilted cotton cover", "Recycled fiber fill", "Hidden zipper"],
    color: "Milkweed",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    slug: "pocket-treat-pouch",
    name: "Pocket Treat Pouch",
    category: "Care",
    price: 38,
    shortDescription: "A tidy clip-on pouch for training walks and park pockets.",
    description:
      "Cut from sturdy cotton canvas, this pouch keeps treats close without announcing itself. A magnetic top makes one-handed rewards easy.",
    materials: ["Cotton canvas", "Magnetic closure", "Metal belt clip"],
    color: "Clay",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "window-seat-blanket",
    name: "Window Seat Blanket",
    category: "Home",
    price: 64,
    shortDescription: "A washable throw for favorite chairs, crates, and corners.",
    description:
      "Soft enough for pets and handsome enough to leave out, this blanket protects upholstery while adding an easy layered texture.",
    materials: ["Cotton fleece", "Bound edge", "Low-impact dye"],
    color: "Fig stripe",
    image:
      "https://images.unsplash.com/photo-1537151672256-6caf2e9f8c95?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "linen-mouse-pair",
    name: "Linen Mouse Pair",
    category: "Play",
    price: 24,
    shortDescription: "Crinkly, refillable cat toys sewn from sturdy linen remnants.",
    description:
      "A pair of small linen toys with a crisp interior and refillable catnip pocket, made for batting, hiding, and rediscovering.",
    materials: ["Linen remnant shell", "Crinkle insert", "Refillable catnip pocket"],
    color: "Oat and moss",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    slug: "ceramic-supper-bowl",
    name: "Ceramic Supper Bowl",
    category: "Home",
    price: 52,
    shortDescription: "A weighted ceramic bowl with a satin glaze and low profile.",
    description:
      "Thrown in a small-batch studio, this low bowl keeps mealtime steady and brings a tableware sensibility to the floor.",
    materials: ["Stoneware clay", "Food-safe satin glaze", "Cork foot"],
    color: "Speckled cream",
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1200&q=80"
  }
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
