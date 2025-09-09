# Your Store – API Testing

Este repositorio contiene la solución de la prueba técnica para validar la API de "Your Store".

## Contenido
- **Colección Postman:** pruebas funcionales parametrizadas.
- **Scripts K6:** pruebas de carga y estrés.
- **Informe:** resultados y conclusiones.

## Cómo ejecutar

### 1. Funcionales con Postman
- Importar `postman/YourStore_Funcional.postman_collection.json`
- Importar `postman/YourStore_Funcional.postman_environment.json`
- Ejecutar las requests.

### 2. Pruebas de rendimiento con K6
Instalar [k6](https://k6.io/docs/get-started/installation/):

```bash
k6 run k6/load-test.js
k6 run k6/stress-test-ramp.js
