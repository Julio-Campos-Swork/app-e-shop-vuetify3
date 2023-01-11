<template>
  <v-app-bar absolute height="100" image="../assets/banner.jpg">
    <RouterLink to="/" class="textDec text-white">
      <v-app-bar-nav-icon class="ml-4">
        <v-icon size="x-large">mdi-home</v-icon>
      </v-app-bar-nav-icon>
    </RouterLink>
    <v-spacer></v-spacer>

    <v-app-bar-title class="text-center text-white text-h5 font-weight-bold"
      >Vuetify Shop</v-app-bar-title
    >
    <v-spacer></v-spacer>
    <v-btn
      size="large"
      class="text-black"
      @click="emit('toggleTheme')"
      :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      :label="theme === 'light' ? 'Lights On' : 'Lights Out'"
    >
      {{ bText }}
    </v-btn>
    <v-tooltip location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          size="x-large"
          v-if="supaStore.session"
          v-bind="props"
          @click="supaStore.signOut()"
          color="red"
          icon="mdi-logout-variant"
        >
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
    <!-- Extencion de las tabs -->
    <template v-slot:extension>
      <v-tabs hide-slider stacked v-model="tab" grow fixed-tabs centered>
        <RouterLink
          to="/home"
          class="text-black lighten-5 textDec"
          active-class="text-red accent-4 text-h1"
        >
          <v-tab value="Home">Home</v-tab>
        </RouterLink>
        <RouterLink
          to="/shop"
          class="text-black lighten-5 textDec"
          active-class="text-red accent-4 text-h1"
        >
          <v-tab value="Shop">Shop</v-tab>
        </RouterLink>
        <RouterLink
          to="/shopcart"
          class="text-black lighten-5 textDec"
          active-class="text-red accent-4 text-h1"
        >
          <v-tab value="CarShop">ShopCart</v-tab>
        </RouterLink>
        <RouterLink
          to="/login"
          class="text-black lighten-5 textDec"
          active-class="text-red accent-4 text-h1"
        >
          <v-tab v-if="!supaStore.session" value="LoginRegister">Login/Register</v-tab>
        </RouterLink>
        <RouterLink
          to="/profile"
          class="text-black lighten-5 textDec"
          active-class="text-red accent-4 text-h1"
        >
          <v-tab v-if="supaStore.session" value="UserProfile">Profile</v-tab>
        </RouterLink>
      </v-tabs>

<div>
  <v-menu location="bottom" persistent no-click-animation>
    <template v-slot:activator="{ props }">
      <v-btn append-icon="mdi-chevron-down" v-bind="props">
        Categories
      </v-btn>
    </template>

  <v-card color="transparent" elevation="0">

  <v-list  >
    <RouterLink to="/category" class="text-black lighten-5 textDec">

          <v-list-item
            v-for="category in useFakeApi.allCategories.categories"
            :title="category"
            @click="setCategory(category)"
          ></v-list-item>
    </RouterLink>

    </v-list>
  </v-card>
  </v-menu>
</div>

<!-- itemcarts -->
      <div>
        <v-menu location="bottom" persistent no-click-animation>
          <template v-slot:activator="{ props }">
            <v-btn class="text-none" stacked v-bind="props">
              <v-badge class="mr-5" color="yellow" :content="supaStore.itemTotal">
                <v-icon color="purple">mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card min-width="300">
            <v-list>
              <v-list-item
                :prepend-avatar="supaStore.userInfo.avatar_url"
                :title="supaStore.userInfo.full_name"
              >
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-table fixed-header hover>
              <thead>
                <tr>
                  <th class="text-left"></th>
                  <th class="text-left">Article Name</th>
                  <th class="text-left">Total Item</th>
                  <th class="text-left">Unit Price</th>
                  <th class="text-left">Total Price</th>
                  <th class="text-left">Delete</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in supaStore.itemsInCart.items" :key="item.id_sell">
                  <td style="border: inset 0pt">
                    <v-avatar>
                      <v-img :src="item.img_url"></v-img>
                    </v-avatar>
                  </td>
                  <td style="border: inset 0pt">
                    {{ item.name }}
                  </td>
                  <td style="border: inset 0pt">
                    {{ item.totalItem }}
                  </td>
                  <td style="border: inset 0pt">${{ item.price }}</td>
                  <td style="border: inset 0pt">
                    ${{ (item.price * item.totalItem).toFixed(2) }}
                  </td>
                  <td style="border: inset 0pt">
                    <v-icon class="text-red" @click="btnConfirmDelete(item.id_sell)"
                      >mdi-delete</v-icon
                    >
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-menu>
      </div>
      <v-dialog
        max-height="250"
        max-width="230"
        v-model="deleteConfirm"
        location="center"
        persistent
      >
        <v-card>
          <v-card-title class="text-center text-h5">Confirmation</v-card-title>
          <v-card-text> Are You Shure? This Action Can't Be Undone </v-card-text>
          <v-card-actions>
            <v-btn color="red" size="small" @click="deleteConfirm = !deleteConfirm"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="green" size="small" @click="deleteProd()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-app-bar>
  <v-snackbar location="top" timeout="1500" v-model="successAlert" color="green">
     <v-icon>mdi-check-circle</v-icon> Product Deleted Successfull
    </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useSupabaseStore } from "../store/supabaseStore";
import {useFakeStoreApi} from "../store/fakeStoreApi";

const useFakeApi = useFakeStoreApi();
const supaStore = useSupabaseStore();
const emit = defineEmits(["toggleTheme"]);
const props = defineProps({ theme: String, bText: String });
const tab = ref(null);


const itemToDelete = ref("");
const deleteConfirm = ref(false);
const btnConfirmDelete = (item) => {
  itemToDelete.value = item;
  deleteConfirm.value = true;

};
const deleteProd = () => {
  supaStore.deleteProd(itemToDelete.value);
  deleteConfirm.value = false;
  successAlert.value = true;

  setTimeout(()=>{
    successAlert.value = false;
  },2000)
};
const successAlert = ref(false)
const setCategory = async (category) => {
await useFakeApi.getCategory(category);
}
</script>

<style scoped>
.textDec {
  text-decoration: none;
}
</style>
