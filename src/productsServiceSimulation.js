import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebasecfg.js';

const productosHomeopaticos = [
  {
    id: 1,
    name: "Arnica montana",
    description: "Medicina homeopática para aliviar dolores musculares y golpes.",
    price: 1500,
    stock: 50
  },
  {
    id: 2,
    name: "Nux Vomica",
    description: "Tratamiento homeopático para problemas digestivos y de intoxicación.",
    price: 2350,
    stock: 30
  },
  {
    id: 3,
    name: "Belladonna",
    description: "Remedio homeopático para fiebres altas y dolores agudos.",
    price: 3690,
    stock: 20
  },
  {
    id: 4,
    name: "Ignatia amara",
    description: "Medicina homeopática para tratar el dolor emocional y el estrés.",
    price: 1520,
    stock: 35
  },
];

const productosHomeopaticosPagina2 = [
  {
    id: 5,
    name: "Rhus toxicodendron",
    description: "Medicina homeopática para aliviar dolores articulares y erupciones cutáneas.",
    price: 2350,
    stock: 15
  },
  {
    id: 6,
    name: "Chamomilla",
    description: "Remedio homeopático para tratar el dolor de dientes en bebés y niños.",
    price: 4500,
    stock: 25
  },
  {
    id: 7,
    name: "Apis mellifica",
    description: "Medicina homeopática para aliviar la hinchazón y picazón por picaduras de insectos.",
    price: 2200,
    stock: 40
  },
  {
    id: 8,
    name: "Pulsatilla",
    description: "Remedio homeopático para tratar los desórdenes del estado de ánimo y la alergia.",
    price: 1750,
    stock: 28
  },
];

export const getProducts = async (pageNumber) => {
  try {
    const productsCollectionRef = collection(db, 'products'); 

    // Ejemplo de paginación para obtener los productos según la página
    const productsSnapshot = await getDocs(productsCollectionRef);

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Lógica para la paginación según la página actual
    const productsPerPage = 4; // Cantidad de productos por página
    const start = (pageNumber - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    return paginatedProducts;
  } catch (error) {
    throw new Error('Error al obtener los productos: ' + error.message);
  }
};

export const searchProductById = (productId) => {
  const allProducts = [...productosHomeopaticos, ...productosHomeopaticosPagina2];
  const foundProduct = allProducts.find(product => product.id == productId);
  return foundProduct || null;
};

export const addProductsToFirestore = async () => {
  const allProducts = [...productosHomeopaticos, ...productosHomeopaticosPagina2];
  try {
    const productsCollectionRef = collection(db, 'products'); 
    for (const product of allProducts) {
      await addDoc(productsCollectionRef, product);
      console.log(`Producto ${product.id} agregado a Firestore`);
    }
    console.log('Todos los productos se han agregado exitosamente a Firestore');
  } catch (error) {
    console.error('Error al agregar productos a Firestore:', error);
  }
};