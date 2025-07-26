'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import useCart  from '@/hooks/useCart';

import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import CartLineItem from '../ui/CartLineItem';

type propsType = {
  isOpen: boolean;
  setIsOpen:  Dispatch<SetStateAction<boolean>>;
};

/* const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  
} */

const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  

  const [confirm, setConfirm] = useState<boolean>(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, cart } = useCart();
  
  const onSubmitOrder = () => {
    if (confirm) {
      // Dispatch order submission action
      dispatch({ type: REDUCER_ACTIONS.SUBMIT });
      setConfirm(true);
    }
  };

  

  const button = (
    <button
      className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700  z-40 hover:cursor-pointer transition-all duration-300 ${
        isOpen ? 'right-96' : 'right-6'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {totalItems}
            </span>
          )}
        </div>
      )}
    </button>
  );

  const pageContent = confirm 
    ? <h2>Gracias por tu pedido</h2>
    : <>
      <h2 className = "offscreen"> Cart </h2>
      <ul className="cart">
        {cart.map((item =>{
          return (
            <CartLineItem 
              key={item.product.REF} 
              item={item} 
              dispatch={dispatch} 
              REDUCER_ACTIONS={REDUCER_ACTIONS} 
            />
          );
        }))}
      </ul>

      <div className = "cart-total">
        <p>Total items: {totalItems}</p>
        <button className = "cart-submit" onClick={onSubmitOrder} disabled={!totalItems}>
          Confirmar pedido
        </button>

      </div>
    </>

    const content = (
      <>
        {isOpen && (
          <>
            {/* Blurred overlay */}
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/20 z-30"
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <aside className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-40 flex flex-col p-6 transition-transform duration-300">
              {pageContent}
            </aside>
          </>
        )}
        {button}
      </>
    )

  return content;
}

export default CartSidebar;