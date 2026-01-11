Este es un poyecto con Next.Js de entrenamiento.

## Stack Tecnológico
- **Framework:** Next.js ^16.1.1
- **Estilos:** Tailwind CSS v4 (Configuración en CSS, sin tailwind.config.js)
- **Lenguaje:** TypeScript
- **Base de Datos:** Postgresql
- **Estado Global:** React Context API / Server Actions
- **React version:** ^19.2.3

## Reglas de Arquitectura y Código
1. **Componentes:** Usar 'use client' solo cuando sea estrictamente necesario para interactividad. Priorizar Server Components.
2**API:** Las rutas de API deben estar en `app/api/` y usar los estándares de Route Handlers de Next.js.

## Objetivos Actuales
- Asegurar que todas las páginas sean dinámicas para evitar errores de pre-renderizado en Vercel (`export const dynamic = 'force-dynamic'`).

## Notas para el Agente
- Cuando crees un componente nuevo, asegúrate de que sea accesible y responsivo usando las clases de Tailwind.
- Si vas a modificar modelos de Mongoose, revisa primero los archivos en `@/models/`.
- Los iconos a usar son de lucid-react