<template>
  <v-app :theme="theme">
    <v-app-bar color="indigo" extended image="./assets/banner.jpg">
      <RouterLink to="/" class="textDec text-white">

      <v-app-bar-nav-icon class="ml-4" icon="mdi-home"></v-app-bar-nav-icon>
      </RouterLink>
      <v-spacer></v-spacer>

      <v-app-bar-title class="text-center text-white text-h5 font-weight-bold">Vuetify Shop</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn class="text-white"
        @click="toggleTheme()"
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :label="theme === 'light' ? 'Lights On' : 'Lights Out'"
      >
        {{ bText }}
      </v-btn>

      <!-- Extencion de las tabs -->
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          grow
          fixed-tabs
          centered
          density="compact"
          color="green"
          slider-color="light-blue lighten-5"
        >
          <RouterLink to="/home" class="text-lime lighten-5 textDec " active-class="text-green">
            <v-tab value="Home" >Home</v-tab>
          </RouterLink>
          <RouterLink to="/shop" class="text-lime lighten-5 textDec" active-class="text-green">
            <v-tab value="Shop" >Shop</v-tab>
          </RouterLink>
          <RouterLink to="/shopcart" class="text-lime lighten-5 textDec" active-class="text-green">
            <v-tab value="CarShop" >ShopCart</v-tab>
          </RouterLink>
          <RouterLink to="/login" class="text-lime lighten-5 textDec" active-class="text-green">
            <v-tab value="UserProfile" >User</v-tab>
          </RouterLink>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-card>

      </v-card>
      <RouterView></RouterView>
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
import Footer from "./components/Footer.vue";

import { ref } from "@vue/reactivity";
const theme = ref("light");
const bText = ref("Lights Out");
const tab = ref(null);
const drawer = ref(null);
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  bText.value = bText.value === "Lights Out" ? "Lights On" : "Lights Out";
};
</script>

<style scoped>
.textDec {
  text-decoration: none;
}
</style>
