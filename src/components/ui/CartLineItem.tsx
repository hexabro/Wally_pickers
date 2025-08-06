"use client"
import {Dispatch, ReactElement, useState} from 'react'
import { ChangeEvent, memo } from 'react';
import {CartItemType} from '@/context/CartProvider';
import {ReducerAction, ReducerActionType} from '@/context/CartProvider';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type PropsType = {
    item: CartItemType;
    dispatch: Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
}
const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {
    const t = useTranslations('cartLineItem');

/* IMAGEN */
const [img, setImg] = useState<string>(`/images/products/${item.product.REF}.jpg`);
const [imageError, setImageError] = useState<boolean>(false);

const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImg('/images/products/p1.jpg'); // Fallback to p1.jpg
    }
};

/* Quantity controls */
const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const clampedValue = Math.max(1, Math.min(50, value)); // Ensure value is between 1 and 50
    
    dispatch({
        type: REDUCER_ACTIONS.UPDATE_QUANTITY,
        payload: { product: item.product, quantity: clampedValue }
    });
};

const increaseQuantity = () => {
    if (item.quantity < 50) {
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_QUANTITY,
            payload: { product: item.product, quantity: item.quantity + 1 }
        });
    }
};

const decreaseQuantity = () => {
    if (item.quantity > 1) {
        dispatch({
            type: REDUCER_ACTIONS.UPDATE_QUANTITY,
            payload: { product: item.product, quantity: item.quantity - 1 }
        });
    }
};

const onRemoveFromCart = () => {
    dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })
}

const content = (
    <li className="cart-line-item flex items-start gap-4 p-4 border-b">
        {/* Product Image */}
        <img
            src={img}
            alt={item.product.NOMBRE}
            className="w-16 h-16 object-cover rounded-md"
            onError={handleImageError}
        />

        {/* Product Details and Actions */}
        <div className="flex flex-col flex-1 gap-2">
            {/* Top Line: Product Name and Format */}
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{item.product.NOMBRE}</h3>
                <p className="text-sm text-gray-500">{t('format')} {item.product.FORMATO}</p>
            </div>

            {/* Middle Line: Quantity Selector */}
            <div className="flex items-center gap-2">
                <label htmlFor={`quantity-${item.product.REF}`} className="text-xs text-gray-600">
                    {t('quantity')}
                </label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                        type="button"
                        onClick={decreaseQuantity}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                        −
                    </button>
                    <input
                        id={`quantity-${item.product.REF}`}
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={handleQuantityChange}
                        className="w-16 px-2 py-1 text-center border-0 focus:outline-none focus:ring-0 appearance-none text-sm"
                        style={{ MozAppearance: 'textfield' }} // Hide spinner in Firefox
                    />
                    <button
                        type="button"
                        onClick={increaseQuantity}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>

        {/* Trashcan Icon */}
        <div className="flex items-center mt-auto">
            <button
            onClick={onRemoveFromCart}
            className="text-red-500 hover:text-red-700 transition mb-1"
            aria-label="remove item from cart"
            title={t('removeFromCart')}
            >
            <Trash2 size={20} color="black" />
            </button>
        </div>
    </li>
)

return content;
}

function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType];
    })
}

const MemizedCartLineItem = memo(CartLineItem, areItemsEqual);

export default MemizedCartLineItem;