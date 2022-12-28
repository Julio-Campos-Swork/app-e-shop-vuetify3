import {defineStore} from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
export const useShopcartStore = defineStore('shopCartStore', () => {
  const productsInCart = reactive([]);




  return{productsInCart}
})
