<template>
  <v-app-bar color="indigo" extended image="../assets/banner.jpg">
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
      <v-tooltip

          location="bottom"
        >
      <template v-slot:activator="{ props }">
      <v-btn v-if="supaStore.session" v-bind="props" @click="supaStore.signOut()" color="red" icon="mdi-logout-variant">

      </v-btn>

      </template>
      <span>Logout</span>
        </v-tooltip>
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
            <v-tab v-if="!supaStore.session" value="LoginRegister" >Login/Register</v-tab>
          </RouterLink>
          <RouterLink to="/profile" class="text-lime lighten-5 textDec" active-class="text-green">
            <v-tab v-if="supaStore.session" value="UserProfile" >Profile</v-tab>
          </RouterLink>
        </v-tabs>

        <div>
          <v-menu location="bottom" persistent no-click-animation>
            <template v-slot:activator="{ props }">
        <v-btn class="text-none" stacked v-bind="props">
        <v-badge  class="mr-5"  color="yellow" :content="supaStore.itemTotal">

          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      </template>
      <v-card min-width="300" >

        <v-list>
          <v-list-item
          :prepend-avatar="supaStore.session.user.user_metadata.avatar_url"
          :title="supaStore.session.user.user_metadata.full_name"
          :subtitle="supaStore.session.user.user_metadata.email"
          >

          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, index) in supaStore.itemsInCart.items"
          :key="index"
          :prepend-avatar="item.img_url"
          border="md"
          append-icon="mdi-delete"
          @click.append-icon="supaStore.deleteProd(item.id_sell)"
        >
          {{ item.name }} - {{ item.price }}

        </v-list-item>
      </v-list>
      </v-card>
          </v-menu>
        </div>

      </template>
    </v-app-bar>
</template>

<script setup>
import { supabase } from "../helpers/supabaseConfig";
import { ref, onMounted } from "vue";
import { useSupabaseStore } from "../store/supabaseStore";

const supaStore = useSupabaseStore();
const theme = ref("light");
const bText = ref("Lights Out");
const tab = ref(null);
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
