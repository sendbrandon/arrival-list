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
    retailer: "Registry Link",
    price: "$300+",
    note: "A bigger-ticket essential guests can contribute to together.",
    href: "#replace-with-registry-link"
  },
  {
    id: "diapers-wipes",
    title: "Diapers + Wipes Fund",
    category: "Real Ones",
    retailer: "Registry Link",
    price: "Any amount",
    note: "The practical gift that gets used every single day.",
    href: "#replace-with-registry-link"
  },
  {
    id: "bottle-set",
    title: "Starter Bottle Set",
    category: "Most Needed",
    retailer: "Registry Link",
    price: "$39",
    note: "A useful everyday item that fits most guest budgets.",
    href: "#replace-with-registry-link"
  },
  {
    id: "swaddles",
    title: "Soft Swaddle Set",
    category: "Under $50",
    retailer: "Registry Link",
    price: "$28",
    note: "A simple, beautiful, high-use gift for the first weeks.",
    href: "#replace-with-registry-link"
  },
  {
    id: "monitor",
    title: "Baby Monitor",
    category: "On Sale",
    retailer: "Registry Link",
    price: "$149",
    salePrice: "$119",
    note: "Featured when a needed item is worth grabbing at a better price.",
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
