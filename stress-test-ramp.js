import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    ramping_test: {
      executor: 'ramping-vus',
      startVUs: 100,
      stages: [
        { duration: '1m', target: 250 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 550 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 850 },
        { duration: '1m', target: 1000 },
        { duration: '1m', target: 0 }, // fase de bajada para liberar carga
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1200'], // el 95% de las respuestas < 1200ms
    http_req_failed: ['rate<0.05'],    // menos de 5% de fallos aceptables
  },
};

export default function () {
  // 1. GET /products
  const res1 = http.get('https://fakestoreapi.com/products');
  check(res1, {
    'GET status 200': (r) => r.status === 200,
  });

  // 2. POST /products
  const payload = JSON.stringify({
    title: 'StressTest Product',
    price: 29.99,
    description: 'Producto creado en stress test',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  });
  const params = { headers: { 'Content-Type': 'application/json' } };

  const res2 = http.post('https://fakestoreapi.com/products', payload, params);
  check(res2, {
    'POST status 200/201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(1); // pequeña pausa
}
