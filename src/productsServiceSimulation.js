const productosHomeopaticos = [
  {
    id: 1,
    name: "Arnica montana",
    description: "Medicina homeopática para aliviar dolores musculares y golpes.",
    stock: 50
  },
  {
    id: 2,
    name: "Nux Vomica",
    description: "Tratamiento homeopático para problemas digestivos y de intoxicación.",
    stock: 30
  },
  {
    id: 3,
    name: "Belladonna",
    description: "Remedio homeopático para fiebres altas y dolores agudos.",
    stock: 20
  },
  {
    id: 4,
    name: "Ignatia amara",
    description: "Medicina homeopática para tratar el dolor emocional y el estrés.",
    stock: 35
  },
];

const productosHomeopaticosPagina2 = [
  {
    id: 5,
    name: "Rhus toxicodendron",
    description: "Medicina homeopática para aliviar dolores articulares y erupciones cutáneas.",
    stock: 15
  },
  {
    id: 6,
    name: "Chamomilla",
    description: "Remedio homeopático para tratar el dolor de dientes en bebés y niños.",
    stock: 25
  },
  {
    id: 7,
    name: "Apis mellifica",
    description: "Medicina homeopática para aliviar la hinchazón y picazón por picaduras de insectos.",
    stock: 40
  },
  {
    id: 8,
    name: "Pulsatilla",
    description: "Remedio homeopático para tratar los desórdenes del estado de ánimo y la alergia.",
    stock: 28
  },
];

export const getProducts = (pageNumber) => {
  return new Promise((resolve, reject) => {
    if (pageNumber == 1) {
      if (productosHomeopaticos.length > 0) {
        setTimeout(() => {
          resolve(productosHomeopaticos);
        }, 1200);
      } else {
        reject("No hay productos en la página 1");
      }
    } else if (pageNumber == 2) {
      if (productosHomeopaticosPagina2.length > 0) {
        setTimeout(() => {
          resolve(productosHomeopaticosPagina2);
        }, 1600);
      } else {
        reject("No hay productos en la página 2");
      }
    } else {
      reject("Número de página inválido");
    }
  });
};

// Nueva función para buscar producto por ID en ambas páginas
export const searchProductById = (productId) => {
  const allProducts = [...productosHomeopaticos, ...productosHomeopaticosPagina2];
  const foundProduct = allProducts.find(product => product.id == productId);
  return foundProduct || null;
};
