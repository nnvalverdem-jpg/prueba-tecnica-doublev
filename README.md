**API Testing y Automatización**

Este repositorio contiene la solución de las pruebas técnicas para validar la API de "Your Store" y pruebas automatizadas del flujo crítico de compra en OpenCart usando Playwright.

**Contenido**

**Colección Postman:** pruebas funcionales parametrizadas.
**Scripts K6:** pruebas de carga y estrés.
**Pruebas automatizadas Playwright:** flujo crítico de compra.
**Informe:** resultados y conclusiones, incluyendo videos de ejecución.

1️⃣**Pruebas Funcionales con Postman**

1.	Importar la colección:
postman/YourStore_Funcional.postman_collection.json

2.	Importar el entorno:
postman/YourStore_Funcional.postman_environment.json

3.	Ejecutar las requests desde Postman.

2️⃣ **Pruebas de Rendimiento con K6**

1.	 Instalar k6 (https://k6.io/docs/get-started/installation/)
2.	Ejecutar tests:
bass
k6 run k6/load-test.js
k6 run k6/stress-test-ramp.js

3️⃣ **Automatización con Playwright**

Requisitos

Node.js >= 18

npm >= 9

**Clonar el proyecto**
git clone https://github.com/tu-usuario/opencart-playwright-tests.git
cd opencart-playwright-tests

**Instalar dependencias y navegadores**

npm install
npx playwright install

**Ejecutar pruebas**

npx playwright test

**Para ejecutar un test específico:**

npx playwright test tests/opencart.spec.js

**Generar reporte**
npx playwright show-report

El reporte incluye videos y capturas de la ejecución de los tests.
