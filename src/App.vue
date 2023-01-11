<template>
  <v-app :theme="theme" class="mainApp">
    <Banner @toggle-theme="toggle()" :theme="theme" :bText="bText" />

    <v-main>
      <RouterView></RouterView>
    </v-main>
      <Footer />
  </v-app>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import Banner from "./components/Banner.vue";
import { ref, onMounted, toRefs } from "vue";
import { useSupabaseStore } from "./store/supabaseStore";
import {useFakeStoreApi} from "./store/fakeStoreApi";

const useFakeApi = useFakeStoreApi();
const supaStore = useSupabaseStore();
const theme = ref("light");
const bText = ref("Lights Out");

//
const toggle = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  bText.value = bText.value === "Lights Out" ? "Lights On" : "Lights Out";
};
onMounted(async () => {
  await supaStore.getS();
  supaStore.checkAuth();
  await supaStore.getCartItems();
  await supaStore.getProfile();
  await supaStore.getFavorites();
  await useFakeApi.getAllCategories();
  // console.log("session",supaStore.session);
});
//
</script>

<style scoped>
/* .mainApp {
  background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0'%3E%3Cstop offset='0' stop-color='%230FF'/%3E%3Cstop offset='1' stop-color='%23CF6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F00'/%3E%3Cstop offset='1' stop-color='%23FC0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='3.3'%3E%3Cpath transform='translate(-101.5 -2) rotate(-8 1409 581) scale(0.8996000000000001)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.1' transform='translate(-152.5 85) rotate(3 800 450) scale(0.99756)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(4.5 -52.5) rotate(7.5 401 736) scale(0.99756)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1'%3E%3Cpath transform='translate(510 11) rotate(-2.75 150 345) scale(1.0031999999999999)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='2.2' transform='translate(-92.5 -235) rotate(-18 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-258 62) rotate(-3 1400 132) scale(0.775)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
} */
</style>
