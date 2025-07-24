import products from '@/data/products.json';

export type Product = {
  ID: string;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  MARCA: string;
  TIPO: string;
};

export async function getProducts(): Promise<Product[]> {
  return products;
}
export async function getProductById(id: string): Promise<Product | null> {
  const product = products.find((p) => p.ID === id);
  return product || null;
}
