import type { Product, ProductCategory } from "@/lib/products";

function product(
  slug: string,
  name: string,
  brand: string,
  category: ProductCategory,
  shortDescription: string,
  materials: string[],
  image: string,
  images?: string[]
): Product {
  return {
    slug,
    name,
    brand,
    category,
    price: null,
    shortDescription,
    description: shortDescription,
    materials,
    image,
    images,
    featured: [
      "sweet-potato-poop-bag-dispenser",
      "breakfast-bites-cat-toy-set",
      "nest-basket-cat-bed",
      "petal-pet-bowl"
    ].includes(slug)
  };
}

const numberedImages = (name: string, count: number, extension = "jpg") =>
  Array.from({ length: count }, (_, index) =>
    `/images/${name}_${index + 1}.${extension}`
  );

const catalog: Product[] = [
  product("sweet-potato-poop-bag-dispenser", "Sweet Potato Poop Bag Dispenser", "LATMOS", "Walk", "A playful silicone dispenser that keeps waste bags tidy and close at hand.", ["Premium silicone", "Vegan leather strap", "HDPE + EP waste bags"], "/images/sweet_potato_poop_bag_dispenser_1.jpg", numberedImages("sweet_potato_poop_bag_dispenser", 3)),
  product("soft-switch-bandana-cocoa-sky", "Soft Switch Bandana — Cocoa Sky", "Pēnut Life", "Wear", "A lightweight reversible cotton bandana with two easy-to-style sides.", ["100% cotton"], "/images/soft_switch_bandana_cocoa_sky_1.jpg", numberedImages("soft_switch_bandana_cocoa_sky", 3)),
  ...[
    ["cupid-swallowtail", "Cupid Swallowtail", "attachment_cupid_swallowtail"],
    ["moon-swallowtail", "Moon Swallowtail", "attachment_moon_swallowtail"],
    ["ember-butterfly", "Ember Butterfly", "attachment_ember_butterfly"],
    ["emerald-birdwing", "Emerald Birdwing", "attachment_emerald_birdwing"],
    ["blossom-flutter", "Blossom Flutter", "attachment_blossom_flutter"],
    ["moonlight-morpho", "Moonlight Morpho", "attachment_moonlight_morpho"]
  ].map(([slug, name, file]) => {
    const attachmentImage = `/images/${file}.jpg`;

    return product(
      slug,
      name,
      "Zhenshang",
      "Play",
      "A fluttering teaser-wand attachment made to awaken your cat's natural hunting instincts.",
      ["Natural feathers", "Flexible spring wire", "Built-in bell"],
      attachmentImage,
      [
        attachmentImage,
        "/images/teaser_wand_attachments_1.jpg",
        "/images/teaser_wand_attachments_2.jpg"
      ]
    );
  }),
  product("red-cottage-sisal-scratcher", "Red Cottage Sisal Scratcher", "O!CUTE", "Home", "A cottage-shaped natural sisal scratcher for floors or smooth surfaces.", ["Natural woven sisal", "Non-woven backing", "Hook-and-loop fasteners"], "/images/red_cottage_sisal_scratcher_1.jpg", numberedImages("red_cottage_sisal_scratcher", 5)),
  product("breakfast-bites-cat-toy-set", "Breakfast Bites Cat Toy Set", "Kingdom of Cats", "Play", "Three loofah and silvervine toys inspired by favorite comfort foods.", ["Natural loofah fiber", "Silvervine filling", "Cotton rope accents"], "/images/breakfast_bites_cat_toy_set_1.jpg", numberedImages("breakfast_bites_cat_toy_set", 2)),
  product("under-the-sea-wool-toy-set", "Under the Sea Wool Toy Set", "moral force", "Play", "Two handcrafted wool sea creatures for chasing, batting, and interactive play.", ["100% natural wool", "Stainless steel clasp"], "/images/under_the_sea_wool_toy_set_1.jpg", numberedImages("under_the_sea_wool_toy_set", 3)),
  product("ready-set-eat-mat", "Ready, Set, Eat! Mat", "Needoog", "Eat + Drink", "A waterproof, scratch-resistant mat for happier and tidier mealtimes.", ["Waterproof PVC"], "/images/ready_set_eat_mat_1.jpg", numberedImages("ready_set_eat_mat", 4)),
  product("wide-pet-placemat", "Wide Pet Placemat", "Keevii", "Eat + Drink", "A spacious non-slip placemat with raised edges to contain crumbs and spills.", ["Food-grade polypropylene (PP)"], "/images/wide_pet_placemat_1.jpg", numberedImages("wide_pet_placemat", 2)),
  product("polka-dot-elevated-pet-bowl", "Polka Dot Elevated Pet Bowl", "LISENPET", "Eat + Drink", "A charming hand-painted ceramic bowl raised for comfortable feeding.", ["Premium glazed ceramic"], "/images/polka_dot_elevated_pet_bowl_1.jpg", numberedImages("polka_dot_elevated_pet_bowl", 3)),
  product("adjustable-elevated-pet-bowl", "Adjustable Elevated Pet Bowl", "HOCC", "Eat + Drink", "A ceramic bowl with an adjustable rubberwood stand that grows with your pet.", ["Food-grade ceramic", "Natural rubberwood"], "/images/adjustable_elevated_pet_bowl_1.jpg", numberedImages("adjustable_elevated_pet_bowl", 3)),
  product("petal-pet-bowl", "Petal Pet Bowl", "LeYouJi", "Eat + Drink", "A wide, shallow pedestal bowl finished with a one-of-a-kind reactive glaze.", ["High-fired ceramic", "Reactive glaze"], "/images/petal_pet_bowl_1.jpg", numberedImages("petal_pet_bowl", 3)),
  product("whisker-slow-feeder", "Whisker Slow Feeder", "HOCC", "Eat + Drink", "An elevated ceramic slow feeder designed to reduce gulping and whisker fatigue.", ["High-fired ceramic"], "/images/whisker_slow_feeder_1.jpg", numberedImages("whisker_slow_feeder", 3)),
  product("nest-basket-cat-bed", "Nest Basket Cat Bed", "O!CUTE", "Rest", "A roomy felt cat bed with a scratching surface and removable cushion.", ["Premium felt", "PP woven cushion"], "/images/nest_basket_cat_bed_1.jpg", numberedImages("nest_basket_cat_bed", 3)),
  product("modular-pet-bed", "Modular Pet Bed — Pink", "OUpethome", "Rest", "A layered floor bed with a quilted cushion and matching pillow.", ["Water-resistant fabric", "Polyester fiber filling"], "/images/modular_pet_bed_pink_1.jpg", ["/images/modular_pet_bed_pink_1.jpg", "/images/modular_pet_bed_pink_2.jpg"]),
  product("modular-pet-bed-cream", "Modular Pet Bed — Cream", "OUpethome", "Rest", "A layered floor bed with a quilted cushion and matching pillow.", ["Water-resistant fabric", "Polyester fiber filling"], "/images/modular_pet_bed_cream_1.jpg", ["/images/modular_pet_bed_cream_1.jpg", "/images/modular_pet_bed_cream2.jpg", "/images/modular_pet_bed_cream3.jpg"]),
  product("italian-leather-adjustable-dog-leash", "Italian Leather Adjustable Dog Leash", "Fluffle", "Walk", "A refined leather leash with three lengths for control or relaxed walking.", ["Italian top-grain leather", "Metal hardware", "Reinforced stitching"], "/images/italian_leather_adjustable_dog_leash_1.jpg", numberedImages("italian_leather_adjustable_dog_leash", 5)),
  product("vintage-leather-dog-collar", "Vintage Leather Dog Collar", "WagTale", "Walk", "A handcrafted color-block collar combining three premium leather textures.", ["Top-grain leather", "Solid metal hardware", "Reinforced stitching"], "/images/vintage_leather_dog_collar_1.jpg", numberedImages("vintage_leather_dog_collar", 2))
];

type ProductContent = Pick<Product, "description" | "details">;

const teaserContent: ProductContent = {
  description: "Designed to mimic the unpredictable movement of birds and butterflies, these interchangeable teaser heads flutter, bounce, and spin with every swipe. Lightweight feathers, spring wire, and a built-in bell provide an engaging multi-sensory play experience while encouraging your cat's natural hunting instincts.",
  details: [{ title: "Toy Safety Warning", items: ["Always supervise your pet during play.", "Inspect regularly and replace if damaged.", "Remove loose parts immediately.", "Not intended for chewing or swallowing.", "Store out of reach when not in use.", "Keep away from children."] }]
};

const productContent: Record<string, ProductContent> = {
  "sweet-potato-poop-bag-dispenser": {
    description: "Inspired by a sweet potato, this playful dispenser adds a touch of personality to your everyday walks while keeping waste bags neatly organized and always within reach.",
    details: [
      { title: "What's Included", items: ["1 × Sweet Potato Poop Bag Dispenser", "2 × Waste Bag Rolls, 15 bags per roll", "1 × Vegan Leather Hanging Strap"] },
      { title: "Measurements", items: ["Dimensions: 6.0 × 1.2 × 6.3 in (15.3 × 3 × 16 cm)", "Weight: 3.2 oz (90 g)"] },
      { title: "Compatible With", items: ["Dogs", "Cats"] },
      { title: "Care Instructions", items: ["Wipe clean with a damp cloth.", "Do not machine wash.", "Store in a cool, dry place."] }
    ]
  },
  "soft-switch-bandana-cocoa-sky": {
    description: "A versatile reversible bandana designed to add a stylish finishing touch to your pet's everyday look. Made from breathable cotton, it offers lightweight comfort and can be worn in multiple ways for different styles.",
    details: [
      { title: "Care Instructions", items: ["Machine wash cold on a gentle cycle.", "Hang to dry.", "Do not tumble dry.", "Avoid prolonged direct sunlight."] },
      { title: "Size Guide", items: ["M — Bandana length: 25.2 in (64 cm); width: 9.1 in (23 cm); recommended neck: up to 11.8 in (30 cm)", "L — Bandana length: 29.5 in (75 cm); width: 11.8 in (30 cm); recommended neck: 12.2 in (31 cm) and above"] }
    ]
  },
  "red-cottage-sisal-scratcher": {
    description: "Bring a playful touch to your home while giving your cat a dedicated place to scratch. Crafted from natural woven sisal with a charming cottage-inspired design, this scratcher encourages healthy scratching habits while helping protect furniture and household surfaces. It can be placed on the floor or attached to smooth surfaces for versatile everyday use.",
    details: [
      { title: "Size", items: ["60 × 40 cm (23.6 × 15.7 in)"] },
      { title: "Care Instructions", items: ["Wipe clean with a dry or slightly damp cloth.", "Air dry completely before reuse.", "Do not machine wash or soak in water.", "Avoid prolonged exposure to moisture or humid environments."] },
      { title: "Installation", items: ["Clean and dry the mounting surface.", "Attach the included adhesive hook-and-loop strips to the desired location.", "Press the scratcher firmly onto the fasteners.", "Ensure it is securely attached before allowing your cat to use it."] },
      { title: "Recommended Surfaces", items: ["Cabinets", "Interior doors", "Refrigerators", "Glass", "Ceramic tile", "Other smooth, clean surfaces"] },
      { title: "Safety Warning", items: ["For pet use only.", "Inspect regularly and replace if damaged or excessively worn.", "Test adhesive strips on a small, inconspicuous area before installation, especially on painted or delicate surfaces.", "Not suitable for damp or uneven surfaces.", "Keep out of reach of children when not in use."] }
    ]
  },
  "breakfast-bites-cat-toy-set": {
    description: "Inspired by your cat's favorite comfort foods, this playful set includes a fried egg, chicken drumstick, and beef stick. Made with natural loofah fibers and filled with silvervine, each toy encourages chasing, batting, chewing, and independent play while helping satisfy your cat's natural hunting instincts.",
    details: [
      { title: "What's Included", items: ["1 × Fried Egg", "1 × Chicken Drumstick", "1 × Beef Stick"] },
      { title: "Size", items: ["Fried Egg: 8 cm (3.1 in)", "Chicken Drumstick: 11 cm (4.3 in)", "Beef Stick: 11 cm (4.3 in)"] },
      { title: "Care Instructions", items: ["Spot clean with a dry or lightly damp cloth.", "Air dry completely before reuse.", "Do not soak or machine wash.", "Store in a cool, dry place."] },
      { title: "Safety Warning", items: ["For cats only.", "Supervise play, especially for aggressive chewers.", "Remove the toy if damaged or torn.", "Small parts may become detached with extended use.", "Keep out of reach of children."] }
    ]
  },
  "under-the-sea-wool-toy-set": {
    description: "Bring the ocean home with two handcrafted wool companions—Blue Fish and Big-Eye Squid. Made from natural wool with a dense felted structure, these toys encourage chasing, batting, chewing, and interactive play while satisfying your cat's natural hunting instincts.",
    details: [
      { title: "What's Included", items: ["1 × Blue Fish", "1 × Big-Eye Squid"] },
      { title: "Size", items: ["Because each toy is handmade, slight variations are normal.", "Blue Fish: 9 × 3 cm (3.5 × 1.2 in)", "Big-Eye Squid: 11 × 6 cm (4.3 × 2.4 in)"] },
      { title: "Care Instructions", items: ["Spot clean only with a damp cloth.", "Allow to air dry completely.", "Do not machine wash or soak.", "Store in a clean, dry place when not in use."] },
      { title: "How to Use", items: ["Clip onto a teaser wand for interactive play.", "Use as a standalone toy for independent play."] },
      { title: "Safety Warning", items: ["For cats only.", "Supervise play, especially with enthusiastic chewers.", "Remove the toy if it becomes damaged or begins shedding excessively.", "Natural wool may pill or shed slightly with extended use—this is normal.", "Keep out of reach of children.", "Store away after play to prolong the toy's lifespan."] }
    ]
  },
  "ready-set-eat-mat": {
    description: "Everything in place for happier mealtimes.",
    details: [
      { title: "Size", items: ["60 × 45 cm (23.5 × 17.7 in)"] },
      { title: "Features", items: ["Scratch-resistant surface with a premium textured finish.", "Easy to wipe clean."] }
    ]
  },
  "wide-pet-placemat": {
    description: "Designed with a generous surface, raised edges, and a non-slip base to help keep every meal where it belongs.",
    details: [
      { title: "Size", items: ["58 × 34 cm (22.58 × 13.3 in)", "Perfect for single or double bowls, elevated feeders, and automatic water fountains."] },
      { title: "Features", items: ["Raised Spill Guard: A high outer lip helps contain food crumbs and water spills, keeping your floors cleaner.", "Spacious Design: The extra-wide surface keeps your pet's feeding area organized while giving bowls plenty of room.", "Non-Slip Base: Stays securely in place during every meal and helps prevent bowls from sliding.", "Easy to Clean: The smooth surface wipes clean in seconds."] },
      { title: "Care Instructions", items: ["Wipe clean with a damp cloth after use.", "Rinse with mild soap and water when needed.", "Air dry before storing.", "Do not expose to high temperatures.", "Not dishwasher safe."] }
    ]
  },
  "polka-dot-elevated-pet-bowl": {
    description: "This elevated ceramic bowl is thoughtfully designed to help your pet eat comfortably while adding a playful touch to your home. The charming hand-painted polka dots and smooth glazed finish make every bowl uniquely delightful.",
    details: [
      { title: "Dimensions", items: ["Diameter: 13.8 cm (5.4 in)", "Height: 11.8 cm (4.6 in)"] },
      { title: "Features", items: ["260 ml Capacity: Perfect for cats and small dogs.", "Elevated Design: Raises food closer to your pet for a more comfortable feeding position.", "Premium Ceramic: Durable glazed ceramic made for everyday use.", "Smooth Glaze Finish: Resists stains and wipes clean effortlessly."] },
      { title: "Care Instructions", items: ["Dishwasher safe.", "Microwave safe.", "Oven safe.", "Do not use in air fryers."] }
    ]
  },
  "adjustable-elevated-pet-bowl": {
    description: "Designed to grow with your pet. This elevated feeding station features an adjustable wooden stand with three height configurations, helping create a more comfortable mealtime from kittenhood to adulthood. The removable ceramic bowl is dishwasher and microwave safe, while the minimalist wooden base blends beautifully into any home.",
    details: [
      { title: "Dimensions", items: ["Diameter: 13.8 cm (5.4 in)", "Height: 11.8 cm (4.6 in)"] },
      { title: "Compatible With", items: ["Cats and small dogs"] },
      { title: "Features", items: ["Three Adjustable Heights: Switch between low, medium, and elevated positions.", "Adjustable Feeding Angle: Mix long and short wooden legs to create a gentle tilt.", "Premium Ceramic Bowl: Smooth glazed ceramic that resists stains and is easy to clean.", "Solid Wooden Stand: Natural rubberwood offers stability and a warm, modern look."] },
      { title: "Care Instructions", items: ["Dishwasher safe (ceramic bowl only).", "Microwave safe (ceramic bowl only).", "Oven safe (ceramic bowl only).", "Do not microwave or soak the wooden stand."] }
    ]
  },
  "petal-pet-bowl": {
    description: "Inspired by blooming petals and finished with a unique reactive glaze, the Petal Bowl turns every meal into a beautiful ritual. The elevated pedestal encourages a comfortable eating posture, while the wide, shallow bowl provides easy access for cats of all face shapes—especially flat-faced breeds.",
    details: [
      { title: "Dimensions", items: ["Diameter: 12.5 cm (4.9 in)", "Height: 9.5 cm (3.7 in)"] },
      { title: "Compatible With", items: ["Cats and small dogs"] },
      { title: "Features", items: ["Wide & Shallow Design: Gives whiskers room to move freely.", "Elevated Feeding Position: Raises food for a more natural eating posture.", "Reactive Glaze Finish: Each piece develops unique colors and textures during firing.", "Handcrafted Ceramic: Durable ceramic with a smooth, odor-resistant glazed surface."] },
      { title: "Care Instructions", items: ["Dishwasher safe.", "Microwave safe."] }
    ]
  },
  "whisker-slow-feeder": {
    description: "Designed for comfortable, healthier mealtimes, the Whisker Slow Feeder combines an elevated pedestal with a wide, shallow slow-feeding surface to encourage better eating habits while helping reduce whisker fatigue.",
    details: [
      { title: "Dimensions", items: ["Diameter: 17 cm (6.7 in)", "Height: 11 cm (4.3 in)"] },
      { title: "Compatible With", items: ["Cats and small dogs"] },
      { title: "Features", items: ["Wide & Shallow Design: Gives cats room to eat without pressure on sensitive whiskers.", "Slow Feeding Surface: The cat-face pattern encourages healthier digestion and reduces gulping.", "Elevated Feeding Position: Promotes a natural posture and helps reduce neck strain.", "Premium High-Fired Ceramic: Fired above 1280°C for strength and durability."] },
      { title: "Care Instructions", items: ["Dishwasher safe.", "Microwave safe."] }
    ]
  },
  "nest-basket-cat-bed": {
    description: "Designed to satisfy both rest and play, the Nest Basket combines a cozy felt cat bed with a built-in scratching surface to create the perfect everyday retreat for indoor cats. Its spacious round design offers plenty of room to curl up, while the removable cushion keeps every season comfortable.",
    details: [
      { title: "Dimensions", items: ["Diameter: 47 cm (18.5 in)", "Height: 12 cm (4.7 in)"] },
      { title: "Compatible With", items: ["Cats"] },
      { title: "Features", items: ["2-in-1 Bed & Scratcher: Supports lounging and scratching while helping protect furniture.", "Removable Cushion Included: Includes a removable PP woven mat for year-round comfort.", "Spacious Round Basket: Provides room for cats to curl up comfortably."] }
    ]
  },
  "modular-pet-bed": {
    description: "A thoughtfully layered bed made for slower mornings and longer naps. The Modular Pet Bed pairs a supportive padded base with a soft, removable quilted cushion and matching pillow, creating a cozy floor-level retreat for cats and small dogs. Its modular design makes cleaning simple, while the water-resistant outer fabric helps with everyday spills and accidents.",
    details: [
      { title: "Dimensions", items: ["Overall: 70 × 55 × 5 cm (21.6 × 23.6 × 2 in)", "Sleeping Cushion: 66 × 53 cm (26 × 20.8 in)", "Pillow: 35 × 18 cm (13.8 × 7 in)"] },
      { title: "Compatible With", items: ["Cats and small dogs"] },
      { title: "Features", items: ["Soft Quilted Comfort: A removable tufted cushion creates a cloud-like lounging surface.", "Layered Modular Design: Use the base and topper together or separately.", "Water-Resistant Outer Fabric: Helps repel light spills and moisture.", "Removable Components: The topper, outer cover, and pillow separate for easier care."] }
    ]
  },
  "italian-leather-adjustable-dog-leash": {
    description: "Inspired by timeless Italian leather craftsmanship, this leash blends classic design with modern functionality. Its warm color palette and clean lines give it an understated luxury that only gets better with age.",
    details: [
      { title: "Size", items: ["To be confirmed."] },
      { title: "Features", items: ["Crafted from Soft Italian Leather: Premium full-grain leather softens beautifully over time.", "Designed for Everyday Walks: Three adjustable lengths move from close control to relaxed walking.", "Built to Last: Reinforced stitching and solid metal hardware provide reliable strength."] },
      { title: "Care Tips", items: ["Wipe clean with a soft, damp cloth after use.", "Let it air dry naturally if it gets wet.", "Avoid prolonged exposure to direct sunlight or excessive moisture.", "Apply leather conditioner every few months to help prevent drying or cracking."] }
    ]
  },
  "vintage-leather-dog-collar": {
    description: "Inspired by classic heritage craftsmanship, this collar combines three premium leather textures with carefully balanced color blocking for a timeless vintage look. Every detail is designed to feel understated, refined, and built to last.",
    details: [
      { title: "Size Guide", items: ["S — Neck: 8.5–11.5 in", "M — Neck: 11.5–14 in", "L — Neck: 13.5–16.5 in"] },
      { title: "Features", items: ["Soft and lightweight for everyday comfort.", "Gentle on your dog's neck while remaining durable.", "Multi-texture leather creates a unique vintage aesthetic.", "Handcrafted construction for long-lasting wear."] },
      { title: "Care Tips", items: ["Wipe clean with a soft, damp cloth.", "Allow to air-dry naturally if wet.", "Avoid prolonged exposure to direct sunlight or soaking in water.", "Condition the leather occasionally to maintain its softness and rich finish."] }
    ]
  }
};

for (const slug of ["cupid-swallowtail", "moon-swallowtail", "ember-butterfly", "emerald-birdwing", "blossom-flutter", "moonlight-morpho"]) {
  productContent[slug] = teaserContent;
}

productContent["modular-pet-bed-cream"] = productContent["modular-pet-bed"];

const productColors: Record<string, string> = {
  "soft-switch-bandana-cocoa-sky": "Cocoa Sky",
  "red-cottage-sisal-scratcher": "Red",
  "petal-pet-bowl": "Reactive Glaze",
  "polka-dot-elevated-pet-bowl": "Polka Dot",
  "vintage-leather-dog-collar": "Multi-color",
  "modular-pet-bed": "Pink",
  "modular-pet-bed-cream": "Cream"
};

const productPrices: Record<string, number> = {
  "sweet-potato-poop-bag-dispenser": 15,
  "soft-switch-bandana-cocoa-sky": 28,
  "cupid-swallowtail": 8,
  "moon-swallowtail": 8,
  "ember-butterfly": 8,
  "emerald-birdwing": 8,
  "blossom-flutter": 8,
  "moonlight-morpho": 8,
  "red-cottage-sisal-scratcher": 38,
  "breakfast-bites-cat-toy-set": 18,
  "under-the-sea-wool-toy-set": 25,
  "ready-set-eat-mat": 25,
  "wide-pet-placemat": 20,
  "polka-dot-elevated-pet-bowl": 32,
  "adjustable-elevated-pet-bowl": 38,
  "petal-pet-bowl": 42,
  "whisker-slow-feeder": 42,
  "nest-basket-cat-bed": 45,
  "modular-pet-bed": 110,
  "modular-pet-bed-cream": 110,
  "italian-leather-adjustable-dog-leash": 88,
  "vintage-leather-dog-collar": 90
};

export const mockProducts: Product[] = catalog.map((item) => ({
  ...item,
  ...productContent[item.slug],
  price: productPrices[item.slug],
  preorder: [
    "modular-pet-bed",
    "modular-pet-bed-cream",
    "vintage-leather-dog-collar"
  ].includes(item.slug),
  inStock: true,
  sizes:
    item.slug === "soft-switch-bandana-cocoa-sky"
      ? ["M", "L"]
      : item.slug === "vintage-leather-dog-collar"
        ? ["S", "M", "L"]
        : undefined,
  petTypes:
    item.category === "Play" || item.category === "Home" || item.slug === "nest-basket-cat-bed"
      ? ["Cat"]
      : item.category === "Wear" || item.category === "Walk"
        ? ["Dog"]
        : ["Cat", "Dog"],
  color: productColors[item.slug]
}));
