// Utilities
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
export const useFakeStoreApi = defineStore("fakeStore", () => {
  const fakeProducts = reactive({products: null});
  const BASE_URL = "https://fakestoreapi.com/";



  const getAllProducts = async (RUTA) => {
    try {
      const path = BASE_URL + RUTA;
      // console.log(path);
      const resp = await axios.get(path);
      // console.log("from axios", resp);
      fakeProducts.products = resp.data;
    } catch (error) {
      console.log(error);
    }
  };



  return {
    fakeProducts,
    getAllProducts,
  };
});
