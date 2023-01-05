<template>
  <v-app-bar color="indigo" extended image="../assets/banner.jpg">
      <RouterLink to="/" class="textDec text-white">

      <v-app-bar-nav-icon class="ml-4" icon="mdi-home"></v-app-bar-nav-icon>
      </RouterLink>
      <v-spacer></v-spacer>

      <v-app-bar-title class="text-center text-white text-h5 font-weight-bold">Vuetify Shop</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn class="text-white"
        @click="emit('toggleTheme')"
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
          :prepend-avatar="supaStore.userInfo.avatar_url"
          :title="supaStore.userInfo.full_name"
          >

          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-table fixed-header hover>
              <!-- <thead>
                <tr>
                  <th class="text-left">
                    img
                  </th>
                  <th class="text-left">
                    Article Name
                  </th>
                  <th class="text-left">
                    Total Item
                  </th>
                  <th class="text-left">
                    Price
                  </th>
                  <th class="text-left">
                    Delete
                  </th>
                </tr>
              </thead> -->

                <tbody >
                  <tr
                  v-for="item in supaStore.itemsInCart.items"
                  :key="item.id_sell">
                  <td style="border: inset 0pt">
                    <v-avatar>
                    <v-img
                      :src="item.img_url"
                    ></v-img>
                  </v-avatar>
                  </td>
                  <td style="border: inset 0pt">
                    {{ item.name }}
                  </td>
                  <td style="border: inset 0pt">
                    {{ item.totalItem }}
                  </td>
                  <td style="border: inset 0pt">
                    {{ item.price }}
                  </td>
                  <td style="border: inset 0pt">
                    <v-icon class="text-red" @click="supaStore.deleteProd(item.id_sell)">mdi-delete</v-icon>
                    </td>
                  </tr>
                </tbody>
            </v-table>
      </v-card>
          </v-menu>
        </div>

      </template>
    </v-app-bar>
</template>

<script setup>
import { ref} from "vue";
import { useSupabaseStore } from "../store/supabaseStore";

const supaStore = useSupabaseStore();
const emit = defineEmits(['toggleTheme']);
const props = defineProps({theme: String, bText: String})
const tab = ref(null);

const init = () => {
console.log(supaStore.userInfo)
}
init()
</script>

<style scoped>
.textDec {
  text-decoration: none;
}
</style>
