// eslint-disable-next-line import/no-anonymous-default-export
export default {
  semi: true, // agrega punto y coma al final de las líneas
  singleQuote: true, // usa comillas simples en lugar de dobles
  tabWidth: 2, // tamaño de tabulación
  useTabs: false, // usa espacios en lugar de tabs
  trailingComma: 'es5', // coma final donde sea válido en ES5 (objetos, arrays, etc.)
  bracketSpacing: true, // espacio entre llaves { ejemplo: true }
  arrowParens: 'avoid', // evita paréntesis en funciones flecha de un solo argumento
  printWidth: 100, // ancho máximo de línea antes de hacer un salto
  plugins: ['prettier-plugin-tailwindcss'], // si usas plugins como prettier-plugin-tailwindcss los puedes agregar aquí
};
