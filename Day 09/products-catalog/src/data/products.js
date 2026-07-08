const products = [
  {
    id: 1,
    name: "Vanilla Aroma Candle",
    category: "Candles",
    image: "/products/candle1.jpg",
    price: 499,
    rating: 4.8,
    description: "Hand-poured soy wax candle with a calming vanilla fragrance."
  },
  {
    id: 2,
    name: "Lavender Candle",
    category: "Candles",
    image: "/products/candle2.jpg",
    price: 549,
    rating: 4.9,
    description: "Elegant lavender scented candle for a relaxing ambience."
  },
  {
    id: 3,
    name: "Minimal Soy Candle",
    category: "Candles",
    image: "/products/candle3.jpg",
    price: 599,
    rating: 4.7,
    description: "Premium soy wax candle with a modern minimalist finish."
  },

  {
    id: 4,
    name: "Scandinavian Wall Clock",
    category: "Clocks",
    image: "/products/clock1.jpg",
    price: 1499,
    rating: 4.9,
    description: "Silent wooden wall clock inspired by Scandinavian interiors."
  },
  {
    id: 5,
    name: "Nordic Wooden Clock",
    category: "Clocks",
    image: "/products/clock2.jpg",
    price: 1699,
    rating: 4.8,
    description: "Minimal wooden clock with premium craftsmanship."
  },
  {
    id: 6,
    name: "Modern Metal Clock",
    category: "Clocks",
    image: "/products/clock4.jpg",
    price: 1899,
    rating: 4.9,
    description: "Elegant metal wall clock perfect for contemporary homes."
  },

  {
    id: 7,
    name: "Classic Wooden Frame",
    category: "Photo Frames",
    image: "/products/frame1.jpg",
    price: 799,
    rating: 4.7,
    description: "Minimal wooden photo frame for memorable moments."
  },
  {
    id: 8,
    name: "Glass Photo Frame",
    category: "Photo Frames",
    image: "/products/frame2.jpg",
    price: 899,
    rating: 4.8,
    description: "Stylish transparent glass frame with premium finish."
  },
  {
    id: 9,
    name: "Black Border Frame",
    category: "Photo Frames",
    image: "/products/frame3.jpg",
    price: 999,
    rating: 4.8,
    description: "Modern black photo frame suitable for every interior."
  },

  {
    id: 10,
    name: "Wooden Table Lamp",
    category: "Lamps",
    image: "/products/lamp1.jpg",
    price: 2499,
    rating: 4.9,
    description: "Premium wooden table lamp with warm ambient lighting."
  },
  {
    id: 11,
    name: "Nordic Lamp",
    category: "Lamps",
    image: "/products/lamp2.jpg",
    price: 2799,
    rating: 4.8,
    description: "Minimal Nordic bedside lamp with soft illumination."
  },
  {
    id: 12,
    name: "Marble Base Lamp",
    category: "Lamps",
    image: "/products/lamp3.jpg",
    price: 2999,
    rating: 4.9,
    description: "Luxury marble base lamp for elegant interiors."
  },
  {
    id: 13,
    name: "Modern Mood Lamp",
    category: "Lamps",
    image: "/products/lamp4.jpg",
    price: 3199,
    rating: 4.9,
    description: "Decorative mood lamp with warm lighting effect."
  },

  {
    id: 14,
    name: "Round Decorative Mirror",
    category: "Mirrors",
    image: "/products/mirror1.jpg",
    price: 2299,
    rating: 4.8,
    description: "Elegant round mirror with minimalist wooden frame."
  },
  {
    id: 15,
    name: "Arch Wall Mirror",
    category: "Mirrors",
    image: "/products/mirror2.jpg",
    price: 2599,
    rating: 4.9,
    description: "Luxury arch mirror designed for modern living spaces."
  },
  {
    id: 16,
    name: "Minimal Oval Mirror",
    category: "Mirrors",
    image: "/products/mirror3.jpg",
    price: 2699,
    rating: 4.8,
    description: "Premium oval decorative mirror with elegant finish."
  },

  {
    id: 17,
    name: "Ceramic Planter",
    category: "Planters",
    image: "/products/planter1.jpg",
    price: 899,
    rating: 4.8,
    description: "Minimal ceramic planter perfect for indoor plants."
  },
  {
    id: 18,
    name: "Stone Finish Planter",
    category: "Planters",
    image: "/products/planter2.jpg",
    price: 999,
    rating: 4.9,
    description: "Premium stone finish planter for modern homes."
  },

  {
    id: 19,
    name: "Woven Storage Basket",
    category: "Storage",
    image: "/products/storage1.jpg",
    price: 1199,
    rating: 4.7,
    description: "Handwoven storage basket made from natural fibres."
  },
  {
    id: 20,
    name: "Cotton Storage Bin",
    category: "Storage",
    image: "/products/storage2.jpg",
    price: 1299,
    rating: 4.8,
    description: "Elegant cotton storage basket for organized spaces."
  },
  {
    id: 21,
    name: "Wooden Organizer",
    category: "Storage",
    image: "/products/storage3.jpg",
    price: 1499,
    rating: 4.9,
    description: "Minimal wooden organizer for desk or living room."
  },

  {
    id: 22,
    name: "Marble Decorative Tray",
    category: "Table Decor",
    image: "/products/table1.jpg",
    price: 1699,
    rating: 4.8,
    description: "Luxury marble tray for elegant table styling."
  },
  {
    id: 23,
    name: "Abstract Table Sculpture",
    category: "Table Decor",
    image: "/products/table2.jpg",
    price: 1899,
    rating: 4.9,
    description: "Modern decorative sculpture that enhances any interior."
  },

  {
    id: 24,
    name: "Nordic Ceramic Vase",
    category: "Vases",
    image: "/products/vase1.jpg",
    price: 1299,
    rating: 4.9,
    description: "Elegant ceramic vase with a timeless Nordic design."
  },
  {
    id: 25,
    name: "Matte White Vase",
    category: "Vases",
    image: "/products/vase2.jpg",
    price: 1399,
    rating: 4.8,
    description: "Minimal matte white vase perfect for modern décor."
  },

  {
    id: 26,
    name: "Abstract Canvas Art",
    category: "Wall Decor",
    image: "/products/wall1.jpg",
    price: 1899,
    rating: 4.8,
    description: "Premium abstract wall art for contemporary interiors."
  },
  {
    id: 27,
    name: "Wooden Wall Shelf",
    category: "Wall Decor",
    image: "/products/wall2.jpg",
    price: 2199,
    rating: 4.9,
    description: "Minimal floating wooden shelf with elegant styling."
  },
  {
    id: 28,
    name: "Metal Wall Art",
    category: "Wall Decor",
    image: "/products/wall3.jpg",
    price: 2499,
    rating: 4.9,
    description: "Luxury metal wall décor to elevate your living room."
  }
];

export default products;