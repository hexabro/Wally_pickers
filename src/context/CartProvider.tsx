"use client"
import { ProductType } from "./ProductsProvider";
import { createContext, ReactElement, useMemo, useReducer } from "react";

export type CartItemType = {
    product: ProductType;
    quantity: number;
};

type CartStateType = { cart: CartItemType[] };

const initCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction =  {
    type: string;
    payload ?: CartItemType;
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload) {
                throw new Error('Payload is required for ADD action');
            }
            const {REF} = action.payload.product
            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            const itemExists:  CartItemType | undefined = state.cart.find(item => item.product.REF === REF);

            const qty: number = itemExists ? itemExists.quantity +1 :1;

            return {...state, cart: [...filteredCart, { product: action.payload.product, quantity: qty }] };

        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload) {
                throw new Error('Payload is required for REMOVE action');
            }
            const {REF} = action.payload.product
            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            return {...state, cart: [...filteredCart]}

        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload) {
                throw new Error('Payload is required for QUANTITY action');
            }

            const {REF} = action.payload.product
            const {quantity} = action.payload;

            const itemExists:  CartItemType | undefined = state.cart.find(item => item.product.REF === REF);

            if (!itemExists) {
                throw new Error('Item does not exist in cart');
            }
            const updatedItem: CartItemType = {
                ...itemExists,
                quantity: quantity
            };

            const filteredCart: CartItemType[] = state.cart.filter(item => item.product.REF !== REF);

            return {...state, cart: [...filteredCart, updatedItem]};
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }; // Clear cart after submission
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const useCartContext = (initCartState: CartStateType ) =>{
    const [state, dispatch] = useReducer(reducer, initCartState);

    const REDUCER_ACTIONS = useMemo(() =>{
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((previousValue, cartItem) =>{
        return previousValue + cartItem.quantity;
    }, 0)

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
