'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import useCart  from '@/hooks/useCart';
import Image from 'next/image';

import { X, ShoppingCart, Container, ContainerIcon } from 'lucide-react';
import CartLineItem from '../ui/CartLineItem';
import { motion } from 'motion/react';

type propsType = {
  isOpen: boolean;
  setIsOpen:  Dispatch<SetStateAction<boolean>>;
};

/* const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  
} */

const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  const [isOpenPopUp, setOpenPopup] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<boolean>(false);

  const { dispatch, REDUCER_ACTIONS, totalItems, cart } = useCart();
  

  // Reset confirm state when items are added to cart after submission
  useEffect(() => {
    if (confirm && totalItems > 0) {
      setConfirm(false);
    }
  }, [totalItems, confirm]);
  
  const onSubmitOrder = () => {
    // Dispatch order submission action to empty the cart
    dispatch({ type: REDUCER_ACTIONS.SUBMIT });
    // Show thank you message
    setConfirm(true);
  };



  const onAskInfo = () => {
    //popUp window form to put name, email and phone
    // This could be a modal or a separate component
    setOpenPopup(true);
    
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  

  const button = (
    <button
      className={`fixed top-1/4 transform -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700  z-50 hover:cursor-pointer transition-all duration-300 ${
        isOpen ? 'right-96' : 'right-6'
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <div className="relative">
          <Image src= "images/container2.svg" width={40} height={32} alt="Container" />
          {totalItems > 0 && (
            <span className="absolute -bottom-5 -right-6 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {totalItems}
            </span>
          )}
        </div>
      )}
    </button>
  );

  const popUpContent = (
    isOpenPopUp && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpenPopup(false)}></div>
        <motion.div className="bg-white p-6 rounded-lg shadow-xl z-10 w-full max-w-md"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}

        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Información de Contacto</h3>
            <button onClick={() => setOpenPopup(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={async (e) => {
            e.preventDefault();

            const nombre = (document.getElementById("name") as HTMLInputElement).value;
            const correo = (document.getElementById("email") as HTMLInputElement).value;
            const telefono = (document.getElementById("phone") as HTMLInputElement).value;

            const endpoint = "https://script.google.com/macros/s/AKfycby2oRhsJHqWefvQ5_N-bIc2yOc-5r_Ehsye-vmMVdJaP7GQDPsVqMGcc3mOD_Fe_HLRwg/exec"

            try{
              const formData = new URLSearchParams();
              formData.append("nombre", nombre);
              formData.append("correo", correo);
              formData.append("telefono", telefono);

              await fetch(endpoint, {
                method: "POST",
                body: formData,
              });

            } catch (error) {
              console.error("Error al enviar los datos:", error);
            }

            // Call the function to submit the order
            onSubmitOrder();
            setOpenPopup(false);
              }} className="space-y-4">


            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+34 123 456 789"
              />
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setOpenPopup(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Enviar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  );
  const pageContent = confirm 
    ? <h2 className="text-center text-green-600">¡Gracias por tu consulta! Te contactaremos pronto.</h2>
    : <>
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

    </>

    const content = (
      <>
        {isOpen && (
          <>
            {/* Blurred overlay */}
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Sidebar */}
            <aside className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300">
              
              <div className ="flex items-center justify-center p-6 border-b">
                <h2 className="text-2xl font-bold text-center ">Productos de Interés</h2>

              </div>              
              <div className="flex-1 overflow-y-auto p-6">
                {pageContent}
              </div>
              <div className="cart-total p-6 border-t">
                <p className="mb-4">Total de cajas: {totalItems}</p>
                <button
                  className="cart-submit bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer w-full"
                  onClick={onAskInfo}
                  disabled={!totalItems}
                >
                  Solicitar información
                </button>
              </div>
            </aside>
          </>
        )}
        {button}
        {popUpContent}
      </>
    )

  return content;
}

export default CartSidebar;