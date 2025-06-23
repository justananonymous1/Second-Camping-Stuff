// Mock data for products
const productsData = [
  {
    id: 1,
    name: "OLPRO Discovery 6 Berth Inflatable Tent",
    category: "tents",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 124,
    isFeatured: true,
    isNew: true,
    discount: 17,
    image: "https://contents.mediadecathlon.com/m13576461/k$2b71dfe45f0d9774928242de29a16488/picture.jpg?format=auto&f=3000x0",
    images: [
      "https://contents.mediadecathlon.com/m13576461/k$2b71dfe45f0d9774928242de29a16488/picture.jpg?format=auto&f=3000x0",
      "https://cdn11.bigcommerce.com/s-8hl787wvsy/images/stencil/800x800/products/3764/29046/discovery-6-berth-inflatable-tent-olpro__94392.1739803351.jpg?c=1",
      "https://media.diy.com/is/image/KingfisherDigital/olpro-hive-6-berth-poled-tent-with-skylights~5060697914542_06c_MP?$MOB_PREV$&$width=600&$height=600",
      "https://cdn11.bigcommerce.com/s-8hl787wvsy/images/stencil/800x800/products/3853/28996/hive-6-berth-poled-tent-olpro__46275.1739961384.jpg?c=1"
    ],
    description: "The Discovery Inflatable Tent is a spacious 6-person tent designed for comfort and durability in all weather conditions.Features include 150D Oxford OLTech Re-Pro Fabric made from recycled bottles, reinforced TPU inflatable beams, blackout sleeping pods, large mesh windows, a fully sealed groundsheet, and a front enclosed canopy",
    specifications: {
      "Capacity": "6 Person",
      "Weight": "66.1 lbs (30 kg)",
      "Dimensions": "285.43 x 165.35 x 86.61 inches (L x W x H)",
      "Packed Size": "35.43 x 19.68 x 19.68 inches",
      "Season Rating": "3-Season",
      "Waterproof Rating": "5000mm H/H",
      "Material": "150D Oxford OLTech Re-Pro Fabric, Reinforced TPU Inflatable Beams",
      "Setup Time": "30 minutes",
      "Doors": "3",
      "Vestibules": "1"
    },
    variants: {
      "Color": ["Black", "Charcoal", "Orange Trim"]
    },
    stock: 25,
    sku: "TENT-0D-001",
    tags: ["camping", "6-person", "waterproof"]
  },
  {
    id: 2,
    name: "Night Cat Camping Backpacks 90L with Internal Frame Hiking Backpack",
    category: "backpacks",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 98,
    isFeatured: true,
    isNew: false,
    discount: 19,
    image: "https://img-va.myshopline.com/image/store/1635924222774/71vKZqC0m4L-AC-SL1500-conew1_990x.jpeg?w=1500&h=1500",
    images: [
      "https://img-va.myshopline.com/image/store/1635924222774/71vKZqC0m4L-AC-SL1500-conew1_990x.jpeg?w=1500&h=1500",
      "https://img-va.myshopline.com/image/store/1635924222774/1-1_990x.jpeg?w=1600&h=1600",
      "https://images.pexels.com/photos/6271571/pexels-photo-6271571.jpeg"
    ],
    description: "The Night Cat 70L Hiking Backpack is a lightweight and durable backpack designed for multi-day trekking and camping adventures. Features include a breathable mesh-padded ergonomic back panel, adjustable shoulder and waist straps, and a waterproof rain cover to keep your gear dry.",
    specifications: {
      "Capacity": "70L",
    "Weight": "2.2 lbs (1 kg)",
    "Dimensions": "33 x 27 x 73 cm (13 x 10.6 x 28.7 inches)",
    "Packed Size": "15.7 x 12 x 3 inches",
    "Material": "Tear-resistant Polyester & Nylon",
    "Frame": "Internal Frame with Backer Board",
    "Rain Cover": "Included",
    "Adjustability": "Adjustable Shoulder, Chest, and Waist Straps",
    "Ventilation": "Breathable Mesh Padded Back Panel",
    "Compression Straps": "Multiple for Load Stabilization"
    },
    variants: {
      "Color": ["Black", "Army Green", "Dark Blue"],
    },
    stock: 69,
    sku: "BP-NC-70L-001",
    tags: ["hiking backpack", "70L", "waterproof", "lightweight"]
  },
  {
    id: 3,
    name: "prayway 'Comfort 300' Children's Sleeping Bag",
    category: "sleeping",
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 156,
    isFeatured: true,
    isNew: false,
    discount: 10,
    image: "https://www.kidscampingstore.com/cdn/shop/files/Comfort_300_Junior_Blazer.jpg?v=1713120874",
    images: [
      "https://www.kidscampingstore.com/cdn/shop/files/Comfort_300_Junior_Blazer.jpg?v=1713120874"
    ],
    description: "The TrailMaster Hiking Backpack offers 65L of storage capacity with multiple compartments and attachment points for all your gear. The adjustable suspension system ensures comfort even on long treks.",
    specifications: {
      "Capacity": "65 Liters",
      "Weight": "4.2 lbs (1.9 kg)",
      "Dimensions": "30 x 14 x 12 inches (H x W x D)",
      "Material": "210D Ripstop Nylon",
      "Frame Type": "Internal Aluminum",
      "Suspension": "Adjustable",
      "Compartments": "Main, Sleeping Bag, Top Lid, Front, Side x2",
      "Hip Belt": "Padded, Adjustable",
      "Hydration Compatible": "Yes, up to 3L reservoir",
      "Rain Cover": "Included"
    },
    variants: {
      "Color": ["Granite Gray", "Forest Green", "Black"],
      "Size": ["Regular", "Large"]
    },
    stock: 15,
    sku: "BP-TM-003",
    tags: ["backpack", "hiking", "trekking"]
  },
  {
    id: 4,
    name: "Campfire Deluxe Cooking Set",
    category: "cooking",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.6,
    reviewCount: 87,
    isFeatured: true,
    isNew: false,
    discount: 18,
    image: "https://m.media-amazon.com/images/I/81O9xboLEEL._AC_UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81O9xboLEEL._AC_UF1000,1000_QL80_.jpg",
      "https://images.thdstatic.com/productImages/1a68fd75-af0d-4f77-8885-b6f7936ee5e6/svn/itopfox-camping-grills-h2ph007ot074-31_600.jpg",
      "https://www.campfirecookshop.com/cdn/shop/products/fryupgriddle_720x.jpg?v=1613761902"
    ],
    description: "Cook delicious meals in the great outdoors with our Campfire Deluxe Cooking Set. Includes a pot, pan, kettle, and utensils, all made from lightweight but durable anodized aluminum.",
    specifications: {
      "Pieces": "10 pieces",
      "Weight": "3.4 lbs (1.5 kg)",
      "Pot Volume": "2.5L",
      "Pan Diameter": "8 inches",
      "Kettle Volume": "1L",
      "Material": "Anodized Aluminum",
      "Handles": "Foldable, Insulated",
      "Utensils": "Spatula, Ladle, Serving Spoon, Knife",
      "Storage": "Nylon Bag with Drawstring",
      "Compatibility": "Most camp stoves and open fires"
    },
    variants: {},
    stock: 22,
    sku: "CK-CD-004",
    tags: ["cooking", "cookware", "camping"]
  },
  {
    id: 5,
    name: "GearLight LED FlashLight",
    category: "accessories",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviewCount: 63,
    isFeatured: false,
    isNew: true,
    discount: 19,
    image: "https://m.media-amazon.com/images/I/91sJrlO6eSL.jpg",
    images: [
      "https://images.pexels.com/photos/6271678/pexels-photo-6271678.jpeg",
      "https://images.pexels.com/photos/6271672/pexels-photo-6271672.jpeg",
      "https://images.pexels.com/photos/6271687/pexels-photo-6271687.jpeg"
    ],
    description: "The wilderness is scary yet beautiful, but it became much scarier at night. So why not buy your GearLight LED FlashLight and conquer the Night? It's a portable light that can be used in the dark, and it's made of durable materials that are easy to carry and use.",
    specifications: {
  "Weight": "5.1 oz (145g)",
  "Dimensions": "6.1 x 1.6 x 1.6 inches",
  "Power Source": "3 x AAA or 1 x 18650 Li-ion battery",
  "Brightness": "Up to 1,040 lumens",
  "Beam Type": "Adjustable zoom (wide to narrow)",
  "Light Modes": "High, Medium, Low, Strobe, SOS",
  "Body Material": "Aluminum (military-grade)",
  "Water Resistance": "Water-resistant (not submersible)",
  "Impact Resistance": "Drop-tested to 10 feet",
  "Includes": "Flashlight, AAA battery holder, 18650 battery tube, holster, lanyard"
    },
    variants: {},
    stock: 30,
    sku: "CK-WP-005",
    tags: ["accessories", "light", "portable"]
  },
  {
    id: 6,
    name: "Oversized Camping chair",
    category: "accessories",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviewCount: 42,
    isFeatured: false,
    isNew: false,
    discount: 17,
    image: "https://ak1.ostkcdn.com/images/products/is/images/direct/b88b792fcc4ce6ea09ae23e5a1ca1655caceaf0f/ALPHA-CAMP-Oversized-Camping-Folding-Chair-Padded-Arm-Chair-with-Cup-Holder.jpg?impolicy=medium",
    images: [
      "https://images.pexels.com/photos/868097/pexels-photo-868097.jpeg",
      "https://images.pexels.com/photos/2526022/pexels-photo-2526022.jpeg"
    ],
    description: "Our Alpine Trek Trekking Poles are adjustable, lightweight, and provide excellent stability on rough terrain. The cork handles ensure comfort even on long hikes.",
    specifications: {
      "Weight": "9.2 oz (261g) per pole",
      "Material": "7075 Aluminum",
      "Grip": "Cork with EVA foam extension",
      "Adjustable Length": "26 to 54 inches",
      "Collapsed Length": "26 inches",
      "Locking Mechanism": "Flip-lock",
      "Tips": "Tungsten Carbide",
      "Baskets": "Included (snow and trekking)",
      "Shock Absorption": "Anti-shock spring system",
      "Wrist Straps": "Padded, adjustable"
    },
    variants: {
      "Color": ["Silver/Black", "Blue/Black", "Red/Black"]
    },
    stock: 35,
    sku: "ACC-AT-006",
    tags: ["trekking poles", "hiking", "accessories"]
  },
  {
    id: 7,
    name: "Basecamp 4-Person Tent",
    category: "tents",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 78,
    isFeatured: false,
    isNew: false,
    discount: 13,
    image: "https://www.rei.com/media/9f17c215-ca9d-49af-9fec-cb97c9db4a02.jpg?size=784x588",
    images: [
      "https://www.rei.com/media/9f17c215-ca9d-49af-9fec-cb97c9db4a02.jpg?size=784x588",
      "https://cdn11.bigcommerce.com/s-c9gaghhv/images/stencil/1280x1280/products/3188/9986/DISCOVERY_BASECAMP_Laurel_Green_Stormy_Blue_40835722STB_1__11139.1701649327.jpg?c=2",
      "https://cdn11.bigcommerce.com/s-c9gaghhv/images/stencil/1280x1280/products/3188/9037/DISCOVERY_BASECAMP_4_LAUREL_GREEN_STORMY_BLUE_LAUREL_GREEN_STORMY_BLUE_40835722STB_6__20232.1639588187.jpg?c=2"
    ],
    description: "The Basecamp 4-Person Tent is perfect for family camping trips. Spacious interior, easy setup, and durable materials ensure comfort and protection in various weather conditions.",
    specifications: {
      "Capacity": "4 Person",
      "Weight": "10.5 lbs (4.8 kg)",
      "Dimensions": "96 x 96 x 59 inches (L x W x H)",
      "Packed Size": "24 x 8 inches",
      "Season Rating": "3-Season",
      "Waterproof Rating": "3500mm",
      "Material": "75D Polyester, Aluminum poles",
      "Setup Time": "8 minutes",
      "Doors": "2",
      "Vestibules": "2"
    },
    variants: {
      "Color": ["Olive Green", "Burnt Orange"]
    },
    stock: 12,
    sku: "TENT-BC-007",
    tags: ["tent", "4-person", "family camping"]
  },
  {
    id: 8,
    name: "Pocket Rocket Ultralight Stove",
    category: "cooking",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviewCount: 112,
    isFeatured: false,
    isNew: false,
    discount: 18,
    image: "https://m.media-amazon.com/images/I/917Er7dHWjL.jpg",
    images: [
      "https://m.media-amazon.com/images/I/917Er7dHWjL.jpg",
      "https://cascadedesigns.com/cdn/shop/files/10955-msr-pocketrocket-deluxe-lifestyle-01.jpg?v=1724820261&width=1946"
    ],
    description: "At just 2.6 oz, the Pocket Rocket Ultralight Stove is perfect for backpackers who need to minimize weight. Despite its small size, it delivers powerful heat output and reliable performance.",
    specifications: {
      "Weight": "2.6 oz (74g)",
      "Dimensions": "3.3 x 2.2 x 2 inches",
      "Fuel Type": "Canister (Isobutane/Propane)",
      "Output": "8,200 BTU",
      "Boil Time": "3.5 minutes for 1L",
      "Ignition": "Manual",
      "Burner Material": "Stainless Steel",
      "Simmer Control": "Yes",
      "Packed Size": "2 x 2 x 3 inches",
      "Includes": "Hardshell carrying case"
    },
    variants: {},
    stock: 28,
    sku: "CK-PR-008",
    tags: ["stove", "ultralight", "backpacking"]
  },
  {
    id: 9,
    name: "SummitSeeker Hiking Boots",
    category: "accessories",
    price: 159.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviewCount: 93,
    isFeatured: false,
    isNew: true,
    discount: 16,
    image: "https://www.hypebeast.com/image/2009/02/pointer-ss09-seeker-iv-00.jpg",
    images: [
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
      "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg"
    ],
    description: "Conquer any trail with our SummitSeeker Hiking Boots. Waterproof, breathable, and featuring excellent ankle support and grip, these boots are built for serious hikers.",
    specifications: {
      "Weight": "2.4 lbs (1.1 kg) per pair",
      "Upper": "Waterproof Nubuck Leather",
      "Membrane": "Gore-Tex",
      "Sole": "Vibram rubber outsole",
      "Cushioning": "EVA midsole",
      "Ankle Height": "Mid",
      "Lacing": "Traditional with locking hooks",
      "Toe Protection": "Rubber toe cap",
      "Break-in Period": "Minimal",
      "Best For": "Rugged trails, moderate backpacking"
    },
    variants: {
      "Color": ["Brown", "Gray/Blue"],
      "Size": ["7", "8", "9", "10", "11", "12", "13"]
    },
    stock: 20,
    sku: "ACC-SS-009",
    tags: ["boots", "hiking", "waterproof"]
  },
  {
    id: 10,
    name: "Arctic Shield Extreme Weather Sleeping Bag",
    category: "sleeping",
    price: 229.99,
    originalPrice: 279.99,
    rating: 4.9,
    reviewCount: 67,
    isFeatured: false,
    isNew: false,
    discount: 18,
    image: "https://m.media-amazon.com/images/I/61O6dU36AHL.jpg",
    images: [
      "https://images.pexels.com/photos/6271604/pexels-photo-6271604.jpeg",
      "https://images.pexels.com/photos/6271571/pexels-photo-6271571.jpeg"
    ],
    description: "Designed for extreme conditions, the Arctic Shield sleeping bag keeps you warm in temperatures as low as -20°F (-29°C). The draft collar, insulated hood, and water-resistant shell ensure maximum heat retention.",
    specifications: {
      "Temperature Rating": "-20°F (-29°C)",
      "Weight": "4.2 lbs (1.9 kg)",
      "Dimensions": "90 x 33 inches (L x W)",
      "Packed Size": "18 x 10 inches",
      "Outer Material": "20D Ripstop Nylon with DWR",
      "Inner Material": "Soft Touch Polyester",
      "Fill": "800 Fill Power Goose Down",
      "Fill Weight": "30 oz (850g)",
      "Shape": "Mummy with Insulated Hood",
      "Draft Features": "Draft tube, collar, and zipper baffle"
    },
    variants: {
      "Size": ["Regular", "Long"]
    },
    stock: 8,
    sku: "SLP-AS-010",
    tags: ["sleeping bag", "extreme weather", "winter camping"]
  },
  {
    id: 11,
    name: "Montane Lightweight Daypack",
    category: "backpacks",
    price: 79.99,
    originalPrice: 94.99,
    rating: 4.5,
    reviewCount: 54,
    isFeatured: false,
    isNew: false,
    discount: 16,
    image: "https://us.montane.com/cdn/shop/files/PTZ44_BLA_A_2_b32db3aa-d1c9-450b-bd98-23ada4c05177_640x.jpg?v=1741176980",
    images: [
      "https://images.pexels.com/photos/1497307/pexels-photo-1497307.jpeg",
      "https://images.pexels.com/photos/6271548/pexels-photo-6271548.jpeg"
    ],
    description: "Perfect for day hikes, the Trailblazer Daypack offers 28L of storage in a lightweight, comfortable design. Multiple pockets help organize your gear, while the ventilated back panel keeps you cool.",
    specifications: {
      "Capacity": "28 Liters",
      "Weight": "1.8 lbs (0.8 kg)",
      "Dimensions": "20 x 12 x 10 inches (H x W x D)",
      "Material": "100D Ripstop Nylon",
      "Back System": "Ventilated mesh panel",
      "Compartments": "Main, Front, Top, Side x2",
      "Hydration Compatible": "Yes, up to 3L reservoir",
      "Sternum Strap": "Yes, with whistle",
      "Waist Belt": "Removable",
      "Rain Cover": "Included"
    },
    variants: {
      "Color": ["Blue", "Black", "Red", "Green"]
    },
    stock: 25,
    sku: "BP-TB-011",
    tags: ["daypack", "hiking", "lightweight"]
  },
  {
    id: 12,
    name: "Collapsible Water Container",
    category: "accessories",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.3,
    reviewCount: 38,
    isFeatured: false,
    isNew: false,
    discount: 17,
    image: "https://m.media-amazon.com/images/I/61AsGTfW9uL.jpg",
    images: [
      "https://images.pexels.com/photos/6271673/pexels-photo-6271673.jpeg",
      "https://images.pexels.com/photos/6271655/pexels-photo-6271655.jpeg"
    ],
    description: "The Nomad Collapsible Water Container holds 5 gallons (20L) of water and folds down to a fraction of its size when empty. Perfect for base camp water storage.",
    specifications: {
      "Capacity": "5 gallons (20L)",
      "Weight": "8.5 oz (240g)",
      "Dimensions": "12 x 12 x 8 inches (when filled)",
      "Packed Size": "6 x 4 x 2 inches",
      "Material": "BPA-free food-grade plastic",
      "Spigot": "Self-sealing, removable",
      "Handle": "Reinforced carrying handle",
      "Closure": "Wide-mouth screw cap",
      "Compatibility": "Standard water filters",
      "Freeze Expansion": "Yes, allows for freezing"
    },
    variants: {},
    stock: 40,
    sku: "ACC-NC-012",
    tags: ["water container", "camping", "portable"]
  },
  // Adding more tent products
  {
    id: 13,
    name: "Alpine Explorer 2-Person Tent",
    category: "tents",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.6,
    reviewCount: 89,
    isFeatured: false,
    isNew: true,
    discount: 14,
    image: "https://m.media-amazon.com/images/I/71gDT3F1DkL._UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/71gDT3F1DkL.jpg",
      "https://m.media-amazon.com/images/I/71gDT3F1DkL._UF1000,1000_QL80_.jpg"
    ],
    description: "Lightweight 2-person tent perfect for backpacking adventures. Features aluminum poles, waterproof rainfly, and easy setup design.",
    specifications: {
      "Capacity": "2 Person",
      "Weight": "4.2 lbs (1.9 kg)",
      "Dimensions": "84 x 52 x 44 inches (L x W x H)",
      "Packed Size": "18 x 6 inches",
      "Season Rating": "3-Season",
      "Waterproof Rating": "3000mm",
      "Material": "68D Polyester, Aluminum poles",
      "Setup Time": "5 minutes",
      "Doors": "1",
      "Vestibules": "1"
    },
    variants: {
      "Color": ["Green", "Orange"]
    },
    stock: 18,
    sku: "TENT-AE-013",
    tags: ["tent", "2-person", "backpacking"]
  },
  {
    id: 14,
    name: "Family Dome Tent 8-Person",
    category: "tents",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.4,
    reviewCount: 156,
    isFeatured: false,
    isNew: false,
    discount: 14,
    image: "https://m.media-amazon.com/images/I/81OmComyhHL._UF1000,1000_QL80_.jpg",
    images: [
      "https://m.media-amazon.com/images/I/81OmComyhHL._UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/917IrfKx2LL._UF350,350_QL80_.jpg"
    ],
    description: "Spacious 8-person dome tent ideal for family camping. Features room divider, multiple windows, and easy color-coded setup.",
    specifications: {
      "Capacity": "8 Person",
      "Weight": "18.5 lbs (8.4 kg)",
      "Dimensions": "168 x 120 x 72 inches (L x W x H)",
      "Packed Size": "32 x 10 inches",
      "Season Rating": "3-Season",
      "Waterproof Rating": "2000mm",
      "Material": "75D Polyester, Fiberglass poles",
      "Setup Time": "15 minutes",
      "Doors": "2",
      "Vestibules": "0"
    },
    variants: {
      "Color": ["Blue/Gray", "Green/Tan"]
    },
    stock: 8,
    sku: "TENT-FD-014",
    tags: ["tent", "8-person", "family camping"]
  }
];

// Mock data for reviews
const reviewsData = {
  1: [
    {
      id: 101,
      productId: 1,
      name: "Michael Johnson",
      rating: 5,
      date: "2023-06-15",
      title: "Perfect tent for weekend trips",
      content: "I've used this tent on several weekend camping trips and it's performed exceptionally well. Easy to set up, spacious enough for me and my gear, and it stayed completely dry during a thunderstorm. Highly recommend!"
    },
    {
      id: 102,
      productId: 1,
      name: "Sarah Williams",
      rating: 4,
      date: "2023-05-22",
      title: "Great quality but a bit heavy",
      content: "The quality of this tent is outstanding. Materials feel durable and the design is well thought out. My only complaint is that it's a bit heavier than I expected for backpacking, but perfect for car camping."
    },
    {
      id: 103,
      productId: 1,
      name: "David Chen",
      rating: 5,
      date: "2023-07-03",
      title: "Best tent I've owned",
      content: "After going through several cheaper tents over the years, I decided to invest in the Adventurer Pro and I'm so glad I did. It's incredibly easy to set up, even by myself, and feels much more durable than anything else I've used."
    }
  ],
  2: [
    {
      id: 201,
      productId: 2,
      name: "Jennifer Lopez",
      rating: 5,
      date: "2023-04-18",
      title: "Warm and comfortable",
      content: "Used this sleeping bag on a spring camping trip where temperatures dropped to around 25°F at night. Stayed perfectly warm and comfortable. The material inside is soft and doesn't feel clammy like some synthetic bags."
    },
    {
      id: 202,
      productId: 2,
      name: "Robert Smith",
      rating: 4,
      date: "2023-05-30",
      title: "Good warmth-to-weight ratio",
      content: "This sleeping bag offers an excellent balance between warmth and weight. Packs down small enough for backpacking and delivers on its temperature rating. Removed one star because the zipper occasionally snags."
    }
  ],
  4: [
    {
      id: 401,
      productId: 4,
      name: "Emily Wilson",
      rating: 5,
      date: "2023-06-25",
      title: "Complete cooking solution",
      content: "This cooking set includes everything you need for camp cooking. The pot and pan are perfect sizes, and the quality is excellent. I particularly like how it all nests together for compact storage. Worth every penny!"
    },
    {
      id: 402,
      productId: 4,
      name: "Mark Thompson",
      rating: 4,
      date: "2023-07-12",
      title: "Great set with minor flaws",
      content: "Overall a great cooking set that's well designed and made from quality materials. The only issue I've found is that the handles get hot if you're not careful with flame control. Otherwise, works perfectly for my camping trips."
    },
    {
      id: 403,
      productId: 4,
      name: "Lisa Rodriguez",
      rating: 5,
      date: "2023-05-19",
      title: "Perfect for family camping",
      content: "We've used this for several family camping trips and it's been fantastic. Large enough to cook for 4 people, easy to clean, and surprisingly durable. The included utensils are actually useful unlike some other sets I've tried."
    }
  ]
};

// Export the data
const productData = {
  getAll: function() {
    return productsData;
  },
  
  getFeatured: function() {
    return productsData.filter(product => product.isFeatured);
  },
  
  getById: function(id) {
    return productsData.find(product => product.id === parseInt(id));
  },
  
  getByCategory: function(category) {
    return productsData.filter(product => product.category === category);
  },
  
  getNew: function() {
    return productsData.filter(product => product.isNew);
  },
  
  getRelated: function(id, category, limit = 4) {
    // Get products from the same category excluding the current product
    const related = productsData
      .filter(product => product.category === category && product.id !== parseInt(id))
      .sort(() => 0.5 - Math.random()); // Shuffle array
    
    return related.slice(0, limit);
  },
  
  getReviews: function(productId) {
    return reviewsData[productId] || [];
  }
};

// Export the data
window.productData = productData;