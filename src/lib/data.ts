
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  priceUnit: 'day' | 'night' | 'month';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string[];
  description: string;
  amenities: string[];
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  available: {
    from: string;
    to: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Apartment with Ocean View",
    location: "Miami Beach, FL",
    price: 2800,
    priceUnit: "night",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    images: [
      "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=3287&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257592-4a9a32f9285e?q=80&w=3287&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=3287&auto=format&fit=crop"
    ],
    description: "Experience luxury living in this stunning beachfront apartment. Floor-to-ceiling windows offer breathtaking ocean views, while the open-concept design and premium finishes create a sophisticated atmosphere. The gourmet kitchen features top-of-the-line appliances and marble countertops. Each bedroom includes plush bedding and spa-inspired bathrooms. Amenities include a private balcony, rooftop infinity pool, fitness center, and 24-hour concierge service.",
    amenities: [
      "Ocean View", "Air Conditioning", "Fully Equipped Kitchen", "Wi-Fi", 
      "Swimming Pool", "Gym", "Parking", "Smart Home System", "Balcony"
    ],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 128,
    coordinates: {
      lat: 25.7617,
      lng: -80.1918
    },
    available: {
      from: "2023-11-15",
      to: "2024-05-30"
    }
  },
  {
    id: 2,
    title: "Scandinavian-Inspired Minimalist Loft",
    location: "Brooklyn, NY",
    price: 3200,
    priceUnit: "month",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 950,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=3280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=3280&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527660562983-f0e48c204d46?q=80&w=3231&auto=format&fit=crop"
    ],
    description: "This stylish loft embodies clean Scandinavian design with its white walls, light wood elements, and minimalist aesthetic. The open floor plan features exposed brick, industrial elements, and abundant natural light through large factory windows. Custom-built furniture maximizes the space while maintaining a sleek simplicity. Located in a converted warehouse in Brooklyn's trendy Williamsburg neighborhood, this loft offers the perfect blend of historic character and modern convenience.",
    amenities: [
      "High Ceilings", "Exposed Brick", "Designer Furniture", "Wi-Fi", 
      "Smart Home System", "Laundry", "Rooftop Access", "Keyless Entry"
    ],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 95,
    coordinates: {
      lat: 40.7128,
      lng: -73.9872
    },
    available: {
      from: "2023-10-01",
      to: "2024-09-30"
    }
  },
  {
    id: 3,
    title: "Secluded Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 1950,
    priceUnit: "night",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=3276&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=3174&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514516816566-de580c621376?q=80&w=3276&auto=format&fit=crop"
    ],
    description: "Escape to this luxurious mountain cabin surrounded by pristine wilderness. The rustic exterior harmonizes with its natural setting, while the interior features premium modern amenities. Vaulted ceilings with exposed beams and a stone fireplace create a cozy atmosphere. Floor-to-ceiling windows frame spectacular mountain views. The gourmet kitchen and outdoor hot tub make this the perfect retreat for any season. Situated on five private acres with direct access to hiking trails.",
    amenities: [
      "Mountain View", "Fireplace", "Hot Tub", "Wi-Fi", 
      "Fully Equipped Kitchen", "Washer/Dryer", "Outdoor BBQ", "Ski Storage"
    ],
    isFeatured: true,
    rating: 4.95,
    reviewCount: 152,
    coordinates: {
      lat: 39.1911,
      lng: -106.8175
    },
    available: {
      from: "2023-12-01",
      to: "2024-04-15"
    }
  },
  {
    id: 4,
    title: "Contemporary Urban Townhouse",
    location: "Chicago, IL",
    price: 3600,
    priceUnit: "month",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1700,
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7161e06560f?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752871-317d38913b60?q=80&w=3271&auto=format&fit=crop"
    ],
    description: "This elegant townhouse combines historic architecture with contemporary interior design. The ground floor features an open-concept living space with hardwood floors, a chef's kitchen, and access to a private courtyard garden. Three spacious bedrooms occupy the upper level, with a luxurious primary suite including a walk-in closet and marble bathroom. Located in Chicago's vibrant Lincoln Park neighborhood, this townhouse provides urban convenience with residential charm.",
    amenities: [
      "Private Garden", "Smart Home System", "Central Air", "Wi-Fi", 
      "Gourmet Kitchen", "Washer/Dryer", "Parking Space", "Security System"
    ],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 83,
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    available: {
      from: "2023-11-01",
      to: "2024-10-31"
    }
  },
  {
    id: 5,
    title: "Mediterranean Villa with Private Pool",
    location: "Palm Springs, CA",
    price: 4500,
    priceUnit: "night",
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 3800,
    images: [
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3274&auto=format&fit=crop"
    ],
    description: "Indulge in the ultimate luxury experience at this stunning Mediterranean-inspired villa. Set against the backdrop of desert mountains, this property features a spectacular private pool and spa, outdoor kitchen, and multiple lounge areas perfect for entertaining. Inside, find soaring ceilings, an open floor plan, and designer furnishings throughout. Each bedroom suite offers privacy and premium amenities. Perfectly located near Palm Springs' best golf courses, shopping, and dining.",
    amenities: [
      "Private Pool", "Hot Tub", "Outdoor Kitchen", "Mountain View", 
      "Wine Cellar", "Home Theater", "Fireplace", "Smart Home System"
    ],
    isFeatured: true,
    rating: 4.95,
    reviewCount: 107,
    coordinates: {
      lat: 33.8303,
      lng: -116.5453
    },
    available: {
      from: "2023-10-15",
      to: "2024-06-30"
    }
  },
  {
    id: 6,
    title: "Waterfront Cottage with Private Dock",
    location: "Lake Tahoe, CA",
    price: 2200,
    priceUnit: "night",
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1500,
    images: [
      "https://images.unsplash.com/photo-1501194526801-d81bd70a13b2?q=80&w=3348&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574866412908-de6a8498049d?q=80&w=3269&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=3271&auto=format&fit=crop"
    ],
    description: "Experience the tranquility of lakeside living in this charming waterfront cottage. With its own private dock and sandy beach area, this property offers direct access to crystal-clear waters. The interior features warm wood paneling, a stone fireplace, and panoramic lake views from nearly every room. The wrap-around deck provides the perfect spot for outdoor dining and sunset viewing. This four-season retreat is ideal for water activities in summer and is just minutes from ski resorts in winter.",
    amenities: [
      "Waterfront", "Private Dock", "Fireplace", "Beach Access", 
      "Fully Equipped Kitchen", "BBQ Grill", "Kayaks Included", "Wi-Fi"
    ],
    isFeatured: false,
    rating: 4.85,
    reviewCount: 92,
    coordinates: {
      lat: 39.0968,
      lng: -120.0324
    },
    available: {
      from: "2023-11-01",
      to: "2024-08-31"
    }
  },
  {
    id: 7,
    title: "Historic Brownstone with Garden",
    location: "Boston, MA",
    price: 4100,
    priceUnit: "month",
    bedrooms: 2,
    bathrooms: 1.5,
    squareFeet: 1300,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=3292&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3270&auto=format&fit=crop"
    ],
    description: "Step back in time with this beautifully preserved brownstone that seamlessly blends historic charm with modern updates. Original architectural details include hardwood floors, crown molding, high ceilings, and a decorative fireplace. The renovated kitchen features stainless steel appliances and custom cabinetry. French doors open to a rare private garden oasis—perfect for relaxing or entertaining. Located in Boston's historic Beacon Hill neighborhood, this property offers a quintessential New England living experience with all urban conveniences nearby.",
    amenities: [
      "Private Garden", "Historic Features", "Updated Kitchen", "Wi-Fi", 
      "Washer/Dryer", "Central Heating", "Cable TV", "Keyless Entry"
    ],
    isFeatured: false,
    rating: 4.75,
    reviewCount: 68,
    coordinates: {
      lat: 42.3601,
      lng: -71.0589
    },
    available: {
      from: "2023-10-15",
      to: "2024-10-14"
    }
  },
  {
    id: 8,
    title: "Eco-Friendly Tiny House Retreat",
    location: "Portland, OR",
    price: 1200,
    priceUnit: "month",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 400,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=3270&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=3269&auto=format&fit=crop"
    ],
    description: "This innovative tiny house maximizes every inch of its compact footprint with clever storage solutions and multi-functional furniture. Built using sustainable materials with solar panels and rainwater collection system, it represents the future of eco-conscious living. The bright interior features large windows, a sleeping loft, fully-equipped kitchenette, and surprisingly spacious bathroom. Set on a shared community garden property, residents can enjoy fresh produce and community events while maintaining their private space.",
    amenities: [
      "Solar Powered", "Eco-Friendly", "Community Garden Access", "Wi-Fi", 
      "Compact Appliances", "Composting System", "Outdoor Seating", "Bike Storage"
    ],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 55,
    coordinates: {
      lat: 45.5152,
      lng: -122.6784
    },
    available: {
      from: "2023-11-01",
      to: "2024-10-31"
    }
  }
];

export const getPropertyById = (id: number): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.isFeatured);
};

export const formatPrice = (price: number, unit: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price) + (unit === 'month' ? '/mo' : unit === 'night' ? '/night' : '/day');
};
