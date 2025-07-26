"use client"
import React, { ReactElement, useState, useEffect } from 'react';
import products from '@/data/products.json';

export type ProductType = {
    REF: string;
    NOMBRE: string;
    DESCRIPCION: string;
    CATEGORIA: string;
    MARCA: string;
    TIPO: string;
    FORMATO: string;
    UDS_CAJA: number;
}

const initState: ProductType[] = [] ;

export type useProductsContextType = {
    products: ProductType[];
    getProductByRef: (ref: string) => ProductType | undefined;
};

const initContextState: useProductsContextType = { 
    products: [],
    getProductByRef: () => undefined
};

const ProductsContext = React.createContext<useProductsContextType>(initContextState);


type ChildrenType = {children ?: ReactElement | ReactElement[]};

export const ProductsProvider = ({children}: ChildrenType) : ReactElement => {
     
    const [productsList, setProductsList] = useState<ProductType[]>(initState);
    
    useEffect(() => {
        // Load products from JSON file
        const loadProducts = async (): Promise<void> => {
            try {
                setProductsList(products as ProductType[]);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        };
        
        loadProducts();
    }, []);

    const getProductByRef = (ref: string): ProductType | undefined => {
        return productsList.find(product => product.REF === ref);
    };

    return (
        <ProductsContext.Provider value={{
            products: productsList,
            getProductByRef
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): useProductsContextType => {
    const context = React.useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

export default ProductsContext