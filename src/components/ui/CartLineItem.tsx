import {Dispatch, ReactElement, useState} from 'react'
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

/* la cantidad más alta */
const highestQuantity: number = 20 > item.quantity ? 20 : item.quantity;

const optionValues: number[] = [...Array(highestQuantity).keys()]
.map(i => i + 1);

const options: ReactElement[] = optionValues.map(value => {
    return <option key = {`opt${value}`} value = {value}>  {value}    </option>
});

const onChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity: number = parseInt(e.target.value, 10);
    dispatch(
        {type: REDUCER_ACTIONS.QUANTITY,
         payload: {product: item.product, quantity: Number(e.target.value)}});
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
            <img
                src={img}
                alt={item.product.NOMBRE}
                className="w-16 h-16 object-cover rounded-md"
                onError={handleImageError}
            />
            <div>
                <h3 className="text-lg font-semibold">{item.product.NOMBRE}</h3>
                <p className="text-sm text-gray-600">Ref: {item.product.REF}</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <select
                value={item.quantity}
                onChange={onChangeQuantity}
                className="border rounded px-2 py-1"
            >
                {options}
            </select>
            <span className="text-lg font-bold">{item.quantity}</span>
            <button
                onClick={onRemoveFromCart}
                className="text-red-500 hover:text-red-700 transition"
            >
                <Trash2 size={20} />
            </button>
        </div>
    </li>
)

return content;
}

export default CartLineItem;