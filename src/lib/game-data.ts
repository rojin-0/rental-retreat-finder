
import { Game } from "@/components/GameCard";

export const games: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.",
    price: 59.99,
    discountedPrice: 39.99,
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    releaseDate: "2020-12-10",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    platforms: ["PC", "PS5", "XSX"],
    genres: ["RPG", "Action", "Open World"],
    rating: 4.2,
    reviewCount: 15420,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Elden Ring",
    description: "Elden Ring is an action RPG game developed by FromSoftware and written by George R. R. Martin. It features an open world with dynamic weather and day-night cycle.",
    price: 69.99,
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    releaseDate: "2022-02-25",
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    platforms: ["PC", "PS5", "XSX", "PS4", "XB1"],
    genres: ["RPG", "Action", "Fantasy"],
    rating: 4.8,
    reviewCount: 22540,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Red Dead Redemption 2",
    description: "Red Dead Redemption 2 is an epic tale of life in America's unforgiving heartland. The game's vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.",
    price: 49.99,
    discountedPrice: 29.99,
    coverImage: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80",
    releaseDate: "2018-10-26",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    platforms: ["PC", "PS4", "XB1"],
    genres: ["Action", "Adventure", "Open World"],
    rating: 4.9,
    reviewCount: 38750,
    isFeatured: true,
  },
  {
    id: "4",
    title: "The Witcher 3: Wild Hunt",
    description: "The Witcher 3: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    price: 39.99,
    discountedPrice: 19.99,
    coverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    releaseDate: "2015-05-19",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    platforms: ["PC", "PS4", "XB1", "Switch", "PS5", "XSX"],
    genres: ["RPG", "Open World", "Fantasy"],
    rating: 4.9,
    reviewCount: 42100,
    isFeatured: false,
  },
  {
    id: "5",
    title: "God of War Ragnarök",
    description: "God of War Ragnarök is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It is the ninth installment in the God of War series.",
    price: 69.99,
    coverImage: "https://images.unsplash.com/photo-1621813053477-dc8c9a29e997?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    releaseDate: "2022-11-09",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    platforms: ["PS5", "PS4"],
    genres: ["Action", "Adventure", "Mythology"],
    rating: 4.7,
    reviewCount: 18300,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Horizon Forbidden West",
    description: "Horizon Forbidden West continues Aloy's story as she moves west to face a majestic but dangerous frontier where she'll encounter amazing new tribes and machines.",
    price: 59.99,
    discountedPrice: 49.99,
    coverImage: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1989&q=80",
    releaseDate: "2022-02-18",
    developer: "Guerrilla Games",
    publisher: "Sony Interactive Entertainment",
    platforms: ["PS5", "PS4"],
    genres: ["Action", "RPG", "Open World"],
    rating: 4.6,
    reviewCount: 12750,
    isFeatured: false,
  },
];

export const categories = [
  { id: "action", name: "Action", count: 42 },
  { id: "adventure", name: "Adventure", count: 38 },
  { id: "rpg", name: "RPG", count: 56 },
  { id: "strategy", name: "Strategy", count: 24 },
  { id: "sports", name: "Sports", count: 18 },
  { id: "simulation", name: "Simulation", count: 32 },
  { id: "puzzle", name: "Puzzle", count: 16 },
  { id: "indie", name: "Indie", count: 78 },
  { id: "multiplayer", name: "Multiplayer", count: 65 },
];

export const platforms = [
  { id: "pc", name: "PC", count: 265 },
  { id: "ps5", name: "PlayStation 5", count: 145 },
  { id: "ps4", name: "PlayStation 4", count: 196 },
  { id: "xsx", name: "Xbox Series X/S", count: 138 },
  { id: "xb1", name: "Xbox One", count: 186 },
  { id: "switch", name: "Nintendo Switch", count: 124 },
];

// Helper function to filter games by category
export const getGamesByCategory = (categoryId: string): Game[] => {
  if (!categoryId) return games;
  return games.filter(game => 
    game.genres.some(genre => genre.toLowerCase() === categoryId.toLowerCase())
  );
};

// Helper function to filter games by platform
export const getGamesByPlatform = (platformId: string): Game[] => {
  if (!platformId) return games;
  return games.filter(game => 
    game.platforms.some(platform => platform.toLowerCase() === platformId.toLowerCase())
  );
};

// Helper function to format price with currency
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
