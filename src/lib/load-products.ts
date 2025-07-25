import products from '@/data/products.json';

export type Product = {
  REF: string;
  NOMBRE: string;
  DESCRIPCION: string;
  CATEGORIA: string;
  MARCA: string;
  TIPO: string;
  FORMATO: string;
  UDS_CAJA: number;
};

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(REF: string): Promise<Product | null> {
  const product = products.find((p) => p.REF === REF);
  return product || null;
}
