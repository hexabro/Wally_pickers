"use client"
import { ProductType } from "./ProductsProvider";
import { createContext, ReactElement, useMemo, useReducer, useEffect } from "react";

export type CartItemType = {
    product: ProductType;
    quantity: number; // Changed from interestedRange to quantity
};

type CartStateType = { cart: CartItemType[] };

// Function to load cart from localStorage
const loadCartFromStorage = (): CartStateType => {
    if (typeof window !== 'undefined') {
        try {
            const savedCart = localStorage.getItem('wallyPickersCart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                return parsedCart;
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }
    return { cart: [] };
};

// Function to save cart to localStorage
const saveCartToStorage = (cartState: CartStateType): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('wallyPickersCart', JSON.stringify(cartState));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }
};

// Function to clear cart from localStorage (useful for development/debugging)
export const clearCartFromStorage = (): void => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.removeItem('wallyPickersCart');
        } catch (error) {
            console.error('Error clearing cart from localStorage:', error);
        }
    }
};

const initCartState: CartStateType = loadCartFromStorage();

const REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction =  {
    type: string;
    payload ?: CartItemType;
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    let newState: CartStateType;
    
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('Payload is required for ADD action');
            }
            const {REF} = action.payload.product
            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            const itemExists: CartItemType | undefined = state.cart.find(item => item.product.REF === REF);

            // If item exists, add to existing quantity; if not, add new item
            const quantity: number = itemExists ? itemExists.quantity + action.payload.quantity : action.payload.quantity;

            newState = {...state, cart: [...filteredCart, { product: action.payload.product, quantity }] };
            break;
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('Payload is required for REMOVE action');
            }
            const {REF} = action.payload.product
            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            newState = {...state, cart: [...filteredCart]};
            break;
        }
        case REDUCER_ACTION_TYPE.UPDATE_QUANTITY: {
            if(!action.payload) {
                throw new Error('Payload is required for UPDATE_QUANTITY action');
            }

            const {REF} = action.payload.product
            const {quantity} = action.payload;

            const itemExists: CartItemType | undefined = state.cart.find(item => item.product.REF === REF);

            if (!itemExists) {
                throw new Error('Item does not exist in cart');
            }
            const updatedItem: CartItemType = {
                ...itemExists,
                quantity: quantity
            };

            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            newState = {...state, cart: [...filteredCart, updatedItem]};
            break;
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            newState = { ...state, cart: [] }; // Clear cart after submission
            break;
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
    
    // Save to localStorage after each state change
    saveCartToStorage(newState);
    return newState;
}

const useCartContext = (initCartState: CartStateType ) =>{
    const [state, dispatch] = useReducer(reducer, initCartState);

    const REDUCER_ACTIONS = useMemo(() =>{
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((total, item) => total + item.quantity, 0); // Sum of all quantities

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.product.REF.slice(-1));
        const itemB = Number(b.product.REF.slice(-1));
        return itemA - itemB;
    });

    return {
        dispatch,
        REDUCER_ACTIONS,
        totalItems,
        cart
    }

}

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: useCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    cart: [],
}

export const CartContext = createContext<useCartContextType>(initCartContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({children}: ChildrenType): ReactElement => {

    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    );
}
