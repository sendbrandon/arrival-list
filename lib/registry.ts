export type RegistryItem = {
  id: string;
  title: string;
  category: "Most Needed" | "On Sale" | "Under $50" | "Group Gift" | "Real Ones";
  retailer: string;
  price?: string;
  salePrice?: string;
  note: string;
  href: string;
};

export const registryItems: RegistryItem[] = [
  {
    id: "travel-system",
    title: "Everyday Travel System",
    category: "Group Gift",
    retailer: "Babylist",
    price: "$300+",
    note: "Group contributions welcome.",
    href: "#replace-with-registry-link"
  },
  {
    id: "diapers-wipes",
    title: "Diapers + Wipes Fund",
    category: "Real Ones",
    retailer: "Babylist",
    price: "Any amount",
    note: "Used daily. Always needed.",
    href: "#replace-with-registry-link"
  },
  {
    id: "bottle-set",
    title: "Starter Bottle Set",
    category: "Most Needed",
    retailer: "Babylist",
    price: "$39",
    note: "Everyday essential.",
    href: "#replace-with-registry-link"
  },
  {
    id: "swaddles",
    title: "Soft Swaddle Set",
    category: "Under $50",
    retailer: "Babylist",
    price: "$28",
    note: "First weeks. High use.",
    href: "#replace-with-registry-link"
  },
  {
    id: "monitor",
    title: "Baby Monitor",
    category: "On Sale",
    retailer: "Babylist",
    price: "$149",
    salePrice: "$119",
    note: "Currently discounted.",
    href: "#replace-with-registry-link"
  }
];

export const registryCategories = [
  "Most Needed",
  "On Sale",
  "Under $50",
  "Group Gift",
  "Real Ones"
] as const;
