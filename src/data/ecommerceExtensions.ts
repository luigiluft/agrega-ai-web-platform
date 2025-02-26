
import { Extension } from "@/types/calculator-types";
import { b2bExtensions } from "./extensions/b2b";
import { b2cExtensions } from "./extensions/b2c";
import { securityExtensions } from "./extensions/security";
import { marketingExtensions } from "./extensions/marketing";
import { performanceExtensions } from "./extensions/performance";

export const ecommerceExtensions: Extension[] = [
  ...b2bExtensions,
  ...b2cExtensions,
  ...securityExtensions,
  ...marketingExtensions,
  ...performanceExtensions
];

export const getExtensionsByCategory = () => {
  const categories = new Map<string, Extension[]>();
  
  ecommerceExtensions.forEach(extension => {
    if (!categories.has(extension.category)) {
      categories.set(extension.category, []);
    }
    categories.get(extension.category)?.push(extension);
  });
  
  return categories;
};
