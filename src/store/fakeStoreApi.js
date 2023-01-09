// Utilities
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
export const useFakeStoreApi = defineStore("fakeStore", () => {
  const fakeProducts = reactive({products: null});
  const BASE_URL = "https://fakestoreapi.com/";
  const OTHER_BASE_URL = 'https://api.escuelajs.co/api/v1/products'
  const otherFakeProducts = reactive({products: null});



  const getAllProducts = async (RUTA) => {
    try {
      const path = BASE_URL + RUTA;
      // console.log(path);
      const resp = await axios.get(path);
      // console.log("from axios", resp);
      fakeProducts.products = resp.data;
      const resp2 = await axios.get(OTHER_BASE_URL)
      // console.log("from axios", resp2);

  otherFakeProducts.products = resp2.data
    } catch (error) {
      console.log(error);
    }
  };

// const getAnotherFakeShop = async () => {
// try {
//   const resp = await axios.get(OTHER_BASE_URL)
//       console.log("from axios", resp);

//   otherFakeProducts.products = resp.data
// } catch (error) {

// }
// }

  return {
    fakeProducts,
    getAllProducts,
    otherFakeProducts,

  };
});
