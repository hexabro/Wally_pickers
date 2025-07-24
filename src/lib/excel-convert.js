

const xlsx = require('xlsx');
const fs = require('fs');

// Lee el Excel
const workbook = xlsx.readFile('src/lib/WALLY-PRODUCTS.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convierte a JSON
const productos = xlsx.utils.sheet_to_json(worksheet);

// Guarda en un archivo
fs.writeFileSync('src/data/products.json', JSON.stringify(productos, null, 2));

console.log('✅ Archivo products.json generado correctamente.');
