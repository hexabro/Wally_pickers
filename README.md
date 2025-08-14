# Wally Pickers - Proyecto Web

Este proyecto es una plataforma web desarrollada con Next.js para Wally Pickers, una importadora y distribuidora mayorista de productos FMCG (Fast Moving Consumer Goods) internacionales. El objetivo es facilitar la conexión entre negocios y productos en tendencia, garantizando abastecimiento eficiente, precios competitivos y una experiencia de usuario moderna y confiable.

## Características principales
- **Catálogo digital**: Navegación por categorías (alimentación, limpieza, cosmética) y filtros por marca y tipo de producto y acceso rápido a fichas y descarga de catálogo.
- **Alojamiento de productos**: Por ahora, los produtos se almacenan en un json generado por un script del proyecto que obtiene los datos de un excel que pueden editar los propietarios de Wally Pickers. Esto es temporal ya que se está desarrollando actualmente el backend necesario para hacer un sistema más escalable 
- **Animaciones y experiencia interactiva**: Uso de Framer Motion, carrousels, efectos de lupa y secciones animadas para destacar la innovación y facilidad de uso.
- **Formulario de contacto**: Para recibir propuestas personalizadas y resolver dudas de clientes potenciales. Los datos del formulario son enviados automáticamente a un google sheets. Dependiendo de cuál sea el formulario que haya rellenado el cliente los datos estarán en una u otra tabla
- **Reseñas de clientes**: Testimonios reales que refuerzan la reputación y el valor de la empresa.
- **Información de contacto y ubicación**: Mapa interactivo y datos de la central para facilitar la comunicación.

## Estructura del catálogo
El catálogo incluye:
- Listado de productos por categoría (alimentación, limpieza, cosmética, etc.)
- Nombre, imagen y descripción breve de cada producto
- Información sobre disponibilidad y logística

## Habilidades y tecnologías utilizadas
- Next.js (React)
- Typescript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Next-intl para traducciones de la web
- Proveedores de contexto para carrito y productos persistentes (se muestra un indicador cuando un producto está en el carrito)
- Vercel para el despliegue


## MEJORAS FUTURAS

- Migrar el sistema de productos a un backend con base de datos relacional.

- Implementar autenticación de clientes para que obtengan diferentes niveles de precios según su categoría.

- Optimizar imágenes y carga diferida para mayor rendimiento.


---

Este proyecto está diseñado para transmitir confianza, innovación y cercanía, alineado con los valores de Wally Pickers y las necesidades de sus clientes.
