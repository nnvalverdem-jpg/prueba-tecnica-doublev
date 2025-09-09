import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    my_test: {
      executor: 'constant-vus',
      vus: 150,       // 150 usuarios virtuales
      duration: '2m', // durante 2 minutos
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<800'], // p95 menor a 800ms
    http_req_failed: ['rate<0.02'],   // menos del 2% de fallos
  },
};

export default function () {
  // 1. GET all products
  let res1 = http.get('https://fakestoreapi.com/products');
  check(res1, {
    'GET /products status is 200': (r) => r.status === 200,
    'GET devuelve array': (r) => Array.isArray(r.json()),
  });

  // 2. POST create product
  const payload = JSON.stringify({
    title: 'LoadTest Product',
    price: 9.99,
    description: 'Producto creado en test de carga',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  });

  const params = { headers: { 'Content-Type': 'application/json' } };
  let res2 = http.post('https://fakestoreapi.com/products', payload, params);
  check(res2, {
    'POST /products status 200/201': (r) => r.status === 200 || r.status === 201,
    'POST devuelve id': (r) => r.json('id') !== undefined,
  });

  // pausa corta
  sleep(1);
}
