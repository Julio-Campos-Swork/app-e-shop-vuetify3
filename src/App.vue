<template>
  <v-app :theme="theme">
   <Banner  />

    <v-main>

      <RouterView></RouterView>
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
import Footer from "./components/Footer.vue";
import Banner from "./components/Banner.vue";
import { ref, onMounted } from "vue";
import { useSupabaseStore } from "./store/supabaseStore";


const supaStore = useSupabaseStore();
const theme = ref("light");
const bText = ref("Lights Out");

//
onMounted(async () => {
  await supaStore.getS();
  supaStore.checkAuth();
  await supaStore.getCartItems();
  console.log("session",supaStore.session);
});
//
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  bText.value = bText.value === "Lights Out" ? "Lights On" : "Lights Out";
};
</script>

<style>

</style>
