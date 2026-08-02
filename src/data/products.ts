export type Spec = readonly [string, string];

export interface Product {
  slug: string;
  name: string;
  collection: string;
  category: string;
  metal: string;
  purity: string;
  eyebrow: string;
  image: string;
  hoverImage: string;
  tagline: string;
  story: string;
  priceOnRequest?: boolean;
  isExclusive?: boolean;
  materials: Spec[];
  craftsmanship: Spec[];
  dimensions: Spec[];
  certificate: Spec[];
  atelierNotes: string[];
}

export const CATEGORY_GROUPS = {
  JEWELLERY: [
    "ALL",
    "CHAIN",
    "NECKLACE",
    "BANGLES",
    "BRACELETS",
    "NOSE STUDS",
    "CHOKER SET",
    "DAILY WEAR",
    "VADDANAM",
    "JEWELLERY SET",
    "RINGS",
    "EARRINGS",
    "PENDANT",
    "ANKLETS",
    "PEARL",
    "STUDS",
    "MOTI SET",
    "JHUMKA",
    "LOCKET",
    "HARAM",
    "KADA",
    "PAYAL",
    "SECOND STUD",
  ],
  METALS: [
    "GOLD",
    "DIAMOND",
    "SILVER",
    "PLATINUM",
    "GEMSTONE",
    "WHITE GOLD",
    "ROSE GOLD",
  ],
  WEDDING: [
    "BRIDAL SET",
    "MANGALSUTRA",
    "COUPLE RINGS",
    "ENGAGEMENT RINGS",
    "BRIDAL NATH",
    "MAANG TIKKA",
    "ANNIVERSARY",
  ],
  FOR: [
    "BABY",
    "KIDS",
    "GIRLS",
    "BOYS",
    "MEN",
    "WOMEN",
    "BRIDE",
    "GROOM",
  ],
  OTHERS: [
    "ANTIQUE",
    "TRADITIONAL",
    "NAVARATNA",
    "TEMPLE JEWELLERY",
    "LAKSHMI JEWELLERY",
    "NAME RINGS",
    "GOLD COIN",
  ],
  PURITY: [
    "18 CARAT",
    "20 CARAT",
    "22 CARAT",
    "24 CARAT",
  ],
} as const;

export const PRODUCTS: Product[] = [
  {
    "slug": "app-item-1-chain",
    "name": "Royal 22K Solid Gold Chain #101",
    "collection": "Chains & Neckwear",
    "category": "CHAIN",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 001 — Chains & Neckwear",
    "image": "/assets/items/royal_gold_chain_101.png",
    "hoverImage": "/assets/items/royal_gold_chain_101.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "10.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-2-necklace",
    "name": "Imperial Diamond Cluster Necklace #102",
    "collection": "Signature Necklaces",
    "category": "NECKLACE",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 002 — Signature Necklaces",
    "image": "/assets/items/diamond_cluster_necklace_102.png",
    "hoverImage": "/assets/items/diamond_cluster_necklace_102.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "13.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-3-bangles",
    "name": "Classic 22K Cut-Work Gold Bangles #103",
    "collection": "Bangles & Cuffs",
    "category": "BANGLES",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 003 — Bangles & Cuffs",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "17.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-4-bracelets",
    "name": "Platinum Pavé Diamond Bracelet #104",
    "collection": "Bracelets & Cuffs",
    "category": "BRACELETS",
    "metal": "PLATINUM",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 004 — Bracelets & Cuffs",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 18 CARAT PLATINUM handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified PLATINUM and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT PLATINUM"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "21.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-5-nose-studs",
    "name": "Solitaire Floral Diamond Nose Pin #105",
    "collection": "Daily Wear & Studs",
    "category": "NOSE STUDS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 005 — Daily Wear & Studs",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "24.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-6-choker-set",
    "name": "Meenakari Heritage Kundan Choker #106",
    "collection": "Bridal & Temple",
    "category": "CHOKER SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 006 — Bridal & Temple",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": true,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "28.500 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-7-daily-wear",
    "name": "Minimalist 22K Geometric Gold Pendant #107",
    "collection": "Daily Wear",
    "category": "DAILY WEAR",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 007 — Daily Wear",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "32.200 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-8-vaddanam",
    "name": "Goddess Lakshmi Antique Gold Waistband (Vaddanam) #108",
    "collection": "Temple & Heritage",
    "category": "VADDANAM",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 008 — Temple & Heritage",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "35.900 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-9-jewellery-set",
    "name": "Bridal Grand Kundan & Pearl Complete Set #109",
    "collection": "Bridal Suites",
    "category": "JEWELLERY SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 009 — Bridal Suites",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "39.600 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-10-rings",
    "name": "Princess Cut Solitaire Engagement Ring #110",
    "collection": "Solitaires & Rings",
    "category": "RINGS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 010 — Solitaires & Rings",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "43.300 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-11-earrings",
    "name": "Rubellite & Diamond Drop Earrings #111",
    "collection": "Earrings",
    "category": "EARRINGS",
    "metal": "GEMSTONE",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 011 — Earrings",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GEMSTONE handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GEMSTONE and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GEMSTONE"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "47.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-12-pendant",
    "name": "Peacock Motif Antique 22K Gold Locket #112",
    "collection": "Pendants & Lockets",
    "category": "PENDANT",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 012 — Pendants & Lockets",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "50.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-13-anklets",
    "name": "Handcrafted Sterling Silver & Pearl Payal #113",
    "collection": "Silver & Anklets",
    "category": "ANKLETS",
    "metal": "SILVER",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 013 — Silver & Anklets",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT SILVER handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified SILVER and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT SILVER"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "54.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-14-pearl",
    "name": "South Sea Cultured Pearl Diamond Necklace #114",
    "collection": "Pearls & Gems",
    "category": "PEARL",
    "metal": "GEMSTONE",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 014 — Pearls & Gems",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT GEMSTONE handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GEMSTONE and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT GEMSTONE"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "58.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-15-studs",
    "name": "Classic 1 Carat Solitaire Diamond Studs #115",
    "collection": "Solitaires",
    "category": "STUDS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 015 — Solitaires",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "61.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-16-moti-set",
    "name": "Traditional Basra Moti & Ruby String Set #116",
    "collection": "Heritage Pearls",
    "category": "MOTI SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 016 — Heritage Pearls",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "65.500 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-17-jhumka",
    "name": "Heritage Grand Emerald Kundan Jhumka #117",
    "collection": "Jhumka & Earrings",
    "category": "JHUMKA",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 017 — Jhumka & Earrings",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "69.200 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-18-locket",
    "name": "Radha Krishna Carved 22K Gold Locket #118",
    "collection": "Devotional Lockets",
    "category": "LOCKET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 018 — Devotional Lockets",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "72.900 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-19-haram",
    "name": "Kasu Mala Antique 22K Gold Long Haram #119",
    "collection": "Temple Jewellery",
    "category": "HARAM",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 019 — Temple Jewellery",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "11.600 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-20-kada",
    "name": "Men Heavy 22K Gold Kada #120",
    "collection": "Men Collection",
    "category": "KADA",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 020 — Men Collection",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "15.300 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-21-payal",
    "name": "Traditional Ghungroo Bridal Silver Payal #121",
    "collection": "Anklets & Payal",
    "category": "PAYAL",
    "metal": "SILVER",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 021 — Anklets & Payal",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT SILVER handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified SILVER and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT SILVER"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "19.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-22-second-stud",
    "name": "Micro Pavé Diamond Second Ear Studs #122",
    "collection": "Daily Wear",
    "category": "SECOND STUD",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 022 — Daily Wear",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "22.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-23-bridal-set",
    "name": "Shahi Royal Dulhan Kundan Bridal Suite #123",
    "collection": "Bridal",
    "category": "BRIDAL SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 023 — Bridal",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "26.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-24-mangalsutra",
    "name": "Solitaire Diamond 22K Gold Mangalsutra #124",
    "collection": "Wedding",
    "category": "MANGALSUTRA",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 024 — Wedding",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "30.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-25-couple-rings",
    "name": "Eternal Platinum & Rose Gold Couple Bands #125",
    "collection": "Rings",
    "category": "COUPLE RINGS",
    "metal": "PLATINUM",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 025 — Rings",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT PLATINUM handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified PLATINUM and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT PLATINUM"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "33.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-26-engagement-rings",
    "name": "Oval Diamond Halo Engagement Ring #126",
    "collection": "Rings",
    "category": "ENGAGEMENT RINGS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 026 — Rings",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "37.500 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-27-bridal-nath",
    "name": "Polki Pearl Heritage Bridal Nath #127",
    "collection": "Bridal Accessories",
    "category": "BRIDAL NATH",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 027 — Bridal Accessories",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "41.200 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-28-maang-tikka",
    "name": "Chandbali Emerald & Kundan Maang Tikka #128",
    "collection": "Bridal Accessories",
    "category": "MAANG TIKKA",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 028 — Bridal Accessories",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "44.900 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-29-anniversary",
    "name": "Eternity Pavé Diamond Anniversary Band #129",
    "collection": "Rings",
    "category": "ANNIVERSARY",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 029 — Rings",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "48.600 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-30-baby",
    "name": "Auspicious 22K Gold Nazariya Baby Bangles #130",
    "collection": "Kids & Baby",
    "category": "BABY",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 030 — Kids & Baby",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "52.300 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-31-kids",
    "name": "Cute Enamel Elephant 22K Gold Pendant #131",
    "collection": "Kids",
    "category": "KIDS",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 031 — Kids",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "56.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-32-girls",
    "name": "Sparkling Zircon Silver Butterfly Earrings #132",
    "collection": "Girls",
    "category": "GIRLS",
    "metal": "SILVER",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 032 — Girls",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT SILVER handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified SILVER and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT SILVER"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "59.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-33-boys",
    "name": "Bal Gopal Pendant in 22K Yellow Gold #133",
    "collection": "Kids",
    "category": "BOYS",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 033 — Kids",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "63.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-34-men",
    "name": "Hand-Carved Signet Ring in 22K Gold #134",
    "collection": "Men",
    "category": "MEN",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 034 — Men",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "67.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-35-women",
    "name": "Contemporary Rose Gold Diamond Bangle #135",
    "collection": "Women",
    "category": "WOMEN",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 035 — Women",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "70.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-36-bride",
    "name": "The Royal Maharani Kundan Choker #136",
    "collection": "Bridal",
    "category": "BRIDE",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 036 — Bridal",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "74.500 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-37-groom",
    "name": "Groom Royal Emerald Kalgi & Brooch #137",
    "collection": "Groom Accessories",
    "category": "GROOM",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 037 — Groom Accessories",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "13.200 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-38-antique",
    "name": "Heritage Antique Finish Gold Coin Necklace #138",
    "collection": "Antique",
    "category": "ANTIQUE",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 038 — Antique",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "16.900 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-39-traditional",
    "name": "Traditional Marwari Aad Kundan Necklace #139",
    "collection": "Traditional",
    "category": "TRADITIONAL",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 039 — Traditional",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "20.600 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-40-navaratna",
    "name": "Nine Gemstones Navaratna Gold Ring #140",
    "collection": "Navaratna",
    "category": "NAVARATNA",
    "metal": "GEMSTONE",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 040 — Navaratna",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GEMSTONE handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GEMSTONE and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GEMSTONE"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "24.300 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-41-temple-jewellery",
    "name": "Divine Guttapusalu Temple Necklace #141",
    "collection": "Temple",
    "category": "TEMPLE JEWELLERY",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 041 — Temple",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "28.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-42-lakshmi-jewellery",
    "name": "Goddess Lakshmi Carved Gold Pendant #142",
    "collection": "Temple",
    "category": "LAKSHMI JEWELLERY",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 042 — Temple",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "31.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-43-name-rings",
    "name": "Customized Script Name Gold Ring #143",
    "collection": "Personalized",
    "category": "NAME RINGS",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 043 — Personalized",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "35.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-44-gold-coin",
    "name": "24K Minted Goddess Lakshmi Gold Coin 10g #144",
    "collection": "Coins",
    "category": "GOLD COIN",
    "metal": "GOLD",
    "purity": "24 CARAT",
    "eyebrow": "Piece No. 044 — Coins",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 24 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "24 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 24 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "39.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 24 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-45-chain",
    "name": "Royal 22K Solid Gold Chain #145",
    "collection": "Chains & Neckwear",
    "category": "CHAIN",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 045 — Chains & Neckwear",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "42.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-46-necklace",
    "name": "Imperial Diamond Cluster Necklace #146",
    "collection": "Signature Necklaces",
    "category": "NECKLACE",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 046 — Signature Necklaces",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "46.500 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-47-bangles",
    "name": "Classic 22K Cut-Work Gold Bangles #147",
    "collection": "Bangles & Cuffs",
    "category": "BANGLES",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 047 — Bangles & Cuffs",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "50.200 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-48-bracelets",
    "name": "Platinum Pavé Diamond Bracelet #148",
    "collection": "Bracelets & Cuffs",
    "category": "BRACELETS",
    "metal": "PLATINUM",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 048 — Bracelets & Cuffs",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT PLATINUM handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified PLATINUM and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT PLATINUM"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "53.900 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-49-nose-studs",
    "name": "Solitaire Floral Diamond Nose Pin #149",
    "collection": "Daily Wear & Studs",
    "category": "NOSE STUDS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 049 — Daily Wear & Studs",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "57.600 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-50-choker-set",
    "name": "Meenakari Heritage Kundan Choker #150",
    "collection": "Bridal & Temple",
    "category": "CHOKER SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 050 — Bridal & Temple",
    "image": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "hoverImage": "/assets/items/temple_gold_haram_1785608046359.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "61.300 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-51-daily-wear",
    "name": "Minimalist 22K Geometric Gold Pendant #151",
    "collection": "Daily Wear",
    "category": "DAILY WEAR",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 051 — Daily Wear",
    "image": "/assets/items/temple_gold_haram_1785608046359.png",
    "hoverImage": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "80 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "65.000 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-52-vaddanam",
    "name": "Goddess Lakshmi Antique Gold Waistband (Vaddanam) #152",
    "collection": "Temple & Heritage",
    "category": "VADDANAM",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 052 — Temple & Heritage",
    "image": "/assets/items/emerald_gold_bangles_1785608060682.png",
    "hoverImage": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "120 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "68.700 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-53-jewellery-set",
    "name": "Bridal Grand Kundan & Pearl Complete Set #153",
    "collection": "Bridal Suites",
    "category": "JEWELLERY SET",
    "metal": "GOLD",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 053 — Bridal Suites",
    "image": "/assets/items/ruby_jhumka_earrings_1785608073617.png",
    "hoverImage": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GOLD handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GOLD and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GOLD"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "160 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "72.400 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-54-rings",
    "name": "Princess Cut Solitaire Engagement Ring #154",
    "collection": "Solitaires & Rings",
    "category": "RINGS",
    "metal": "DIAMOND",
    "purity": "18 CARAT",
    "eyebrow": "Piece No. 054 — Solitaires & Rings",
    "image": "/assets/items/gold_lakshmi_coin_1785608088525.png",
    "hoverImage": "/assets/items/kundan_choker_set_1785608015801.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 18 CARAT DIAMOND handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified DIAMOND and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "18 CARAT DIAMOND"
      ],
      [
        "Purity",
        "BIS Hallmarked 18 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "200 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "11.100 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 18 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  },
  {
    "slug": "app-item-55-earrings",
    "name": "Rubellite & Diamond Drop Earrings #155",
    "collection": "Earrings",
    "category": "EARRINGS",
    "metal": "GEMSTONE",
    "purity": "22 CARAT",
    "eyebrow": "Piece No. 055 — Earrings",
    "image": "/assets/items/kundan_choker_set_1785608015801.png",
    "hoverImage": "/assets/items/diamond_solitaire_ring_1785608029662.png",
    "priceOnRequest": true,
    "isExclusive": false,
    "tagline": "Authentic 22 CARAT GEMSTONE handcrafted by A.P.P. Jewellers master goldsmiths.",
    "story": "Hand-forged at our Seelampur atelier using certified GEMSTONE and traditional setting techniques.",
    "materials": [
      [
        "Metal",
        "22 CARAT GEMSTONE"
      ],
      [
        "Purity",
        "BIS Hallmarked 22 CARAT"
      ],
      [
        "Assay",
        "BIS-Recognised, Delhi"
      ]
    ],
    "craftsmanship": [
      [
        "Artisan Hours",
        "240 Hours"
      ],
      [
        "Technique",
        "Hand-Forged & Set"
      ]
    ],
    "dimensions": [
      [
        "Weight",
        "14.800 g"
      ]
    ],
    "certificate": [
      [
        "Purity",
        "BIS Hallmark 22 CARAT"
      ],
      [
        "Provenance",
        "Signed A.P.P. Jewellers Certificate of Authenticity"
      ]
    ],
    "atelierNotes": [
      "Individually hallmarked and inspected under loupe."
    ]
  }
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getExclusiveProducts() {
  return PRODUCTS.filter((p) => p.isExclusive);
}

export const BOUTIQUES = [
  "A.P.P. Jewellers — Shop No. D-155, Sarafa Market, New Seelampur, New Delhi",
] as const;

export const TIME_SLOTS = [
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
] as const;
