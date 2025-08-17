'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import useCart  from '@/hooks/useCart';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { X, ShoppingCart, Container, ContainerIcon } from 'lucide-react';
import CartLineItem from '../ui/CartLineItem';
import { motion, AnimatePresence } from 'motion/react';

type propsType = {
  isOpen: boolean;
  setIsOpen:  Dispatch<SetStateAction<boolean>>;
};

/* const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  
} */

const CartSidebar = ({ isOpen, setIsOpen }: propsType) => {
  const t = useTranslations('cartSidebar');
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

  

  const openButton = (
    !isOpen && (
      <motion.button
        className="fixed top-1/4 transform -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50 hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 400,
          damping: 25,
          duration: 0.2
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ right: '24px' }}
      >
        <div className="relative">
          <Image src="/images/container2.svg" width={40} height={32} alt="Container" />
          {totalItems > 0 && (
            <motion.span 
              className="absolute -bottom-5 -right-6 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 15 }}
            >
              {totalItems}
            </motion.span>
          )}
        </div>
      </motion.button>
    )
  );

  const popUpContent = (
    isOpenPopUp && (
      <div
        className="fixed inset-0 flex items-center justify-center z-[60]"
      >
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setOpenPopup(false)}></div>
        <motion.div className="bg-white p-6 rounded-lg shadow-xl z-10 w-[90%]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}

        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{t('contactForm.title')}</h3>
            <button onClick={() => setOpenPopup(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
            {/* - Nombre 
                - correo 
                - teléfono
                - Tipo negocio (Restaurante / Bar / Cafetería ; Tienda de alimentación / Supermercado; Distribuidor/Mayorista; Hotel / Catering; Tienda especializada (gourmet, internacional, etc.); Otro(especificar);
                - CIF 
                - Mensaje
            */}
          <form onSubmit={async (e) => {
            e.preventDefault();
            // Call the function to submit the order
            onSubmitOrder();
            setOpenPopup(false);
            
            const nombre = (document.getElementById("name") as HTMLInputElement).value;
            const correo = (document.getElementById("email") as HTMLInputElement).value;
            const telefono = (document.getElementById("phone") as HTMLInputElement).value;
            const tipoNegocio = (document.getElementById("business-type") as HTMLSelectElement).value;
            const cif = (document.getElementById("cif") as HTMLInputElement).value;
            const mensaje = (document.getElementById("message") as HTMLTextAreaElement).value;


            const cartSummary = cart.map(item => 
              `${item.product.REF} - ${item.product.NOMBRE} (${item.product.MARCA}) - ${item.quantity} cajas`
            ).join('\n');

            const endpoint = "https://script.google.com/macros/s/AKfycbwBNcD_3_x7mw_tu_cmfScIFLQMt1maVBqTQKhlD_PfUOd_F7Gt8NeC-Savu6NXtKRAXg/exec"



            try{
              const formData = new URLSearchParams();
              formData.append("nombre", nombre);
              formData.append("correo", correo);
              formData.append("telefono", telefono);
              formData.append("tipoNegocio", tipoNegocio);
              formData.append("cif", cif);
              formData.append("mensaje", mensaje);
              formData.append("cartInfo", cartSummary);
              formData.append("tipo", "pedido" );

              await fetch(endpoint, {
                method: "POST",
                body: formData,
              });

            } catch (error) {
              console.error("Error al enviar los datos:", error);
            }

            
              }} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.name')}</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactForm.namePlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.email')}</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactForm.emailPlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactForm.phonePlaceholder')}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="business-type" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.businessType')}</label>
                  <select
                    id="business-type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t('contactForm.businessTypePlaceholder')}</option>
                    {t.raw('contactForm.businessTypes').map((type: string, index: number) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="cif" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.cif')}</label>
                  <input
                    type="text"
                    id="cif"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactForm.cifPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('contactForm.message')}</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('contactForm.messagePlaceholder')}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setOpenPopup(false)}
                className="px-4 py-2 border border-gray-300 hover:cursor-pointer rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t('contactForm.cancelButton')}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:cursor-pointer text-white rounded-md hover:bg-blue-700"
              >
                {t('contactForm.sendButton')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  );
  const pageContent = confirm 
    ? <h2 className="text-center text-green-600">{t('thankYouMessage')}</h2>
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
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Blurred overlay */}
              <motion.div
                className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              {/* Sidebar */}
              <motion.aside 
                className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-[60] flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3
                }}
              >
              
              <div className ="flex items-center justify-between p-6 border-b">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-center flex-1">{t('title')}</h2>
              </div>
              <p className = {`${totalItems == 0 ? 'block' : 'hidden'} p-4 text-center`}>
                {t('emptyMessage')}
              </p>
              <div className="flex-1 overflow-y-auto p-6">
                {pageContent}
              </div>
              <div className="cart-total p-6 border-t">
                <p className="mb-4">{t('totalBoxes')} {totalItems}</p>
                <button
                  className="cart-submit bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 hover:cursor-pointer w-full"
                  onClick={onAskInfo}
                  disabled={!totalItems}
                >
                  {t('requestInfoButton')}
                </button>
              </div>
            </motion.aside>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {openButton}
        </AnimatePresence>
        {popUpContent}
      </>
    )

  return content;
}

export default CartSidebar;