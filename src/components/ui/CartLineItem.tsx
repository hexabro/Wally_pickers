import {Dispatch, ReactElement, useState} from 'react'
import { ChangeEvent, memo } from 'react';
import {CartItemType} from '@/context/CartProvider';
import {ReducerAction, ReducerActionType} from '@/context/CartProvider';
import { Trash2 } from 'lucide-react';

type PropsType = {
    item: CartItemType;
    dispatch: Dispatch<ReducerAction>;
    REDUCER_ACTIONS: ReducerActionType;
}
const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {

/* IMAGEN */
const [img, setImg] = useState<string>(`/images/products/p1.jpg`);
const [imageError, setImageError] = useState<boolean>(false);

const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImg('/images/products/p1.jpg'); // Fallback to p1.jpg
    }
};

/* Quantity ranges */
const quantityRanges = [
    { label: '20-50', min: 20, max: 50 },
    { label: '50-100', min: 50, max: 100 },
    { label: '100-200', min: 100, max: 200 },
    { label: '200-500', min: 200, max: 500 },
    { label: '500+', min: 500, max: 1000 }
];

// Find current range based on item interested range
const getCurrentRange = (interestedRange: string) => {
    return interestedRange;
};

const options: ReactElement[] = quantityRanges.map(range => {
    return <option key={range.label} value={range.label}>{range.label}</option>
});

const onChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value;
    
    dispatch({
        type: REDUCER_ACTIONS.UPDATE_RANGE,
        payload: { product: item.product, interestedRange: selectedRange }
    });
};

const onRemoveFromCart = () => {
    dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })
}

const content = (
    <li className="cart-line-item flex items-center justify-between p-4 border-b">
        
        <div className="flex items-center gap-4">
            {/* Imagen del producto */}
            <img  src={img}  alt={item.product.NOMBRE}   className="w-16 h-16 object-cover rounded-md"   onError={handleImageError}/>
            {/* Información del producto */}
            <div>
                <h3 className="text-lg font-semibold">{item.product.NOMBRE}</h3>
                <p className="text-sm text-gray-600">Ref: {item.product.REF}</p>
                <p className="text-sm text-blue-600">Rango de interés: {item.interestedRange}</p>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <select
                value={item.interestedRange}
                onChange={onChangeQuantity}
                className="border rounded px-2 py-1"
                aria-label="item quantity range"
            >
                {options}
            </select>

            <button
                onClick={onRemoveFromCart}
                className="text-red-500 hover:text-red-700 transition"
                aria-label="remove item from cart"
                title="remove item from cart"
            >
                <Trash2 size={20} />
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