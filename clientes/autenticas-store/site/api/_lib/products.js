// Catálogo — mesma fonte de js/catalog.js, em CommonJS pro backend validar preço/estoque
// sem depender de banco de dados. Ao editar um produto, atualizar os dois arquivos.

const PRODUCTS = [
  { id: 'polo-piquet', name: 'Polo Piquet Premium', price: 99.90, variants: [{ name: 'Azul Marinho' }, { name: 'Preta' }, { name: 'Off-White' }] },
  { id: 'camiseta-losango', name: 'Camiseta Gola Losango', price: 79.90, variants: [{ name: 'Preta' }] },
  { id: 'camiseta-listrada', name: 'Camiseta Listrada Premium', price: 89.90, variants: [{ name: 'Branca' }] },
  { id: 'calca-jeans-destroyed', name: 'Calça Jeans Destroyed', price: 139.90, variants: [{ name: 'Jeans Escuro' }] },

  { id: 'tenis-mcqueen-preto', name: 'Tênis Alexander McQueen', price: 285.00, variants: [{ name: 'Preto' }, { name: 'Branco' }] },
  { id: 'tenis-zara-velcro', name: 'Tênis Zara Velcro', price: 320.00, variants: [{ name: 'Preto' }] },
  { id: 'tenis-gucci', name: 'Tênis Gucci Monograma', price: 380.00, variants: [{ name: 'Preto/Bege' }] },
  { id: 'tenis-nike-court-vision', name: 'Nike Court Vision', price: 280.00, variants: [{ name: 'Preto' }] },
  { id: 'tenis-mizuno-prophecy', name: 'Mizuno Prophecy 13', price: 280.00, variants: [{ name: 'Preto/Azul' }] },
  { id: 'tenis-nike-low', name: 'Nike Low', price: 250.00, variants: [{ name: 'Preto/Branco' }] },
  { id: 'tenis-nike-twist', name: 'Nike Twist', price: 285.00, variants: [{ name: 'Branco' }] },

  { id: 'slide-nike', name: 'Slide Nike', price: 65.00, variants: [{ name: 'Preto' }] },
  { id: 'slide-gucci', name: 'Slide Gucci', price: 65.00, variants: [{ name: 'Preto' }] },
  { id: 'slide-hugoboss', name: 'Slide Hugo Boss', price: 65.00, variants: [{ name: 'Bege' }] },
  { id: 'slide-croco', name: 'Slide Croco', price: 90.00, variants: [{ name: 'Branco' }] },
  { id: 'asuna', name: 'Sandália Asuna', price: 185.00, variants: [{ name: 'Preta' }] },

  { id: 'bone-quicksilver', name: 'Boné Quick Silver', price: 80.00, variants: [{ name: 'Cinza' }, { name: 'Preto' }] },
  { id: 'bone-gucci-preto', name: 'Boné Gucci Preto', price: 89.90, variants: [{ name: 'Preto' }] },
  { id: 'bone-gucci-bege', name: 'Boné Gucci Monograma', price: 89.90, variants: [{ name: 'Bege' }] },
  { id: 'bone-lacoste-sport', name: 'Boné Lacoste Sport', price: 79.90, variants: [{ name: 'Verde' }] },
  { id: 'bone-sport-furo', name: 'Boné Sport Furo', price: 79.90, variants: [{ name: 'Preto' }] },
  { id: 'bone-lacoste-nylon', name: 'Boné Lacoste Nylon', price: 79.90, variants: [{ name: 'Preto/Verde' }] },
  { id: 'bone-osascorte', name: 'Boné Osascorte Original', price: 79.90, variants: [{ name: 'Branco' }] },
  { id: 'bone-nike-nadal', name: 'Boné Nike Nadal', price: 79.90, variants: [{ name: 'Branco' }, { name: 'Preto' }] },
  { id: 'bone-brooksfield', name: 'Boné Brooksfield', price: 79.90, variants: [{ name: 'Branco' }] },
  { id: 'bone-tommy', name: 'Boné Tommy', price: 79.90, variants: [{ name: 'Preto' }] },
  { id: 'bone-polo', name: 'Boné Polo Ralph Lauren', price: 79.90, variants: [{ name: 'Preto' }] },
  { id: 'bone-lv', name: 'Boné LV', price: 89.90, variants: [{ name: 'Cinza' }] },
  { id: 'bone-puma', name: 'Boné Puma 5-Panel', price: 79.90, variants: [{ name: 'Preto' }, { name: 'Branco' }] },
];

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

module.exports = { PRODUCTS, findProduct };
