import type { Product } from "@/lib/products";

/*
  Little Strays mock product catalog

  This is the main file to update when changing product content.

  How to edit a product:
  - name: Change the product title shown on product cards and detail pages.
  - price: Use a plain number only. For example, write 86, not "$86".
  - shortDescription: Keep this to one sentence for product cards.
  - description: Use this for the longer product detail page copy.
  - image: Use either a full image URL or a local path from the public folder.
    For local images, place the file in /public/images/products and use a path
    like "/images/products/willow-walk-set.jpg".
  - slug: This controls the product URL. Only use lowercase letters, numbers,
    and hyphens, like "willow-walk-set". If you change it, old links will break.
  - featured: Set to true to show the product on the home page favorites area.

  To add a new product, copy one full product block, paste it before the closing
  bracket, then update each field.
*/

export const mockProducts: Product[] = [
  {
    slug: "sweet-potato-pouch",
    name: "Sweet Potato Pouch",
    category: "Walk",
    price: 32,
    shortDescription: "A soft cotton lead and adjustable collar for slow city loops.",
    description:
      "Made for steady mornings, the Willow Walk Set pairs a woven cotton lead with brass-toned hardware and a gentle adjustable collar.",
    materials: ["Organic cotton webbing", "Brass-finish hardware", "Recycled label"],
    color: "Fern",
    image: "/images/product1.jpg",
    featured: true
  },
  {
    slug: "breakfast-loofah-set",
    name: "Breakfast Loofah Set",
    category: "Play",
    price: 25,
    shortDescription: "A cheerful textured toy set for gentle chewing and everyday play.",
    description:
      "A breakfast-inspired loofah set made for tossing, nosing, and light chewing during slow mornings at home.",
    materials: ["Natural loofah", "Cotton details", "Plant-based dye"],
    color: "Breakfast mix",
    image: "/images/product2.jpg",
    featured: true
  },
  {
    slug: "blue-nest-bed",
    name: "Blue Nest Bed",
    category: "Rest",
    price: 78,
    shortDescription: "A tidy clip-on pouch for training walks and park pockets.",
    description:
      "Cut from sturdy cotton canvas, this pouch keeps treats close without announcing itself. A magnetic top makes one-handed rewards easy.",
    materials: ["Cotton canvas", "Magnetic closure", "Metal belt clip"],
    color: "Clay",
    image: "/images/product3.jpg",
    featured: true
  },
  {
    slug: "kitty-maze-bowl",
    name: "Kitty Maze Bowl",
    category: "Eat + Drink",
    price: 64,
    shortDescription: "A washable throw for favorite chairs, crates, and corners.",
    description:
      "Soft enough for pets and handsome enough to leave out, this blanket protects upholstery while adding an easy layered texture.",
    materials: ["Cotton fleece", "Bound edge", "Low-impact dye"],
    color: "Fig stripe",
    image: "/images/product4.png"
  },
  {
    slug: "cloud-blue-tray",
    name: "Cloud Blue Tray",
    category: "Eat + Drink",
    price: 24,
    shortDescription: "Crinkly, refillable cat toys sewn from sturdy linen remnants.",
    description:
      "A pair of small linen toys with a crisp interior and refillable catnip pocket, made for batting, hiding, and rediscovering.",
    materials: ["Linen remnant shell", "Crinkle insert", "Refillable catnip pocket"],
    color: "Oat and moss",
    image: "/images/product5.png"
  },
  {
    slug: "rose-nap-mat",
    name: "Rose Nap Mat",
    category: "Rest",
    price: 52,
    shortDescription: "A weighted ceramic bowl with a satin glaze and low profile.",
    description:
      "Thrown in a small-batch studio, this low bowl keeps mealtime steady and brings a tableware sensibility to the floor.",
    materials: ["Stoneware clay", "Food-safe satin glaze", "Cork foot"],
    color: "Speckled cream",
    image: "/images/product6.png"
  },
  {
    slug: "sunny-stroll-vest",
    name: "Sunny Stroll Vest",
    category: "Wear",
    price: 46,
    shortDescription: "A light vest for bright walks, easy layering, and soft visibility.",
    description:
      "A sunny little walking vest with a gentle fit, simple fastening, and an easy layer for mild days outside.",
    materials: ["Lightweight cotton blend", "Soft binding", "Adjustable closure"],
    color: "Sunny cream",
    image: "/images/product7.png"
  },
  {
    slug: "everyday-collar",
    name: "Everyday Collar",
    category: "Walk",
    price: 28,
    shortDescription: "A soft adjustable collar made for daily walks and easy wear.",
    description:
      "A lightweight everyday collar with a smooth feel, tidy hardware, and an easy fit for neighborhood loops and sunny errands.",
    materials: ["Cotton webbing", "Metal hardware", "Adjustable buckle"],
    color: "Everyday neutral",
    image: "/images/product8.png"
  },
  {
    slug: "caramel-walk-leash",
    name: "Caramel Walk Leash",
    category: "Walk",
    price: 38,
    shortDescription: "A warm-toned leash for relaxed walks and steady hands.",
    description:
      "A caramel-colored walking leash with a comfortable hand loop, polished hardware, and a simple profile for daily outings.",
    materials: ["Cotton webbing", "Metal clasp", "Reinforced stitching"],
    color: "Caramel",
    image: "/images/product9.png"
  },
  {
    slug: "felt-blue-fish",
    name: "Felt Blue Fish",
    category: "Play",
    price: 18,
    shortDescription: "A soft felt fish toy made for batting, chasing, and carrying.",
    description:
      "A lightweight felt fish with a soft shape and tidy stitched finish, designed for small bursts of play around the house.",
    materials: ["Wool felt", "Cotton stitching", "Soft fiber fill"],
    color: "Blue",
    image: "/images/product10.png"
  },
  {
    slug: "felt-orange-squid",
    name: "Felt Orange Squid",
    category: "Play",
    price: 20,
    shortDescription: "A bright felt squid toy with floppy legs for playful paws.",
    description:
      "A cheerful felt squid with a light, tossable body and soft legs made for batting, pouncing, and supervised play.",
    materials: ["Wool felt", "Cotton stitching", "Soft fiber fill"],
    color: "Orange",
    image: "/images/product11.png"
  }
];
