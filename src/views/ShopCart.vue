<template>
  <v-container fuild>
    <h1>ShopCart</h1>
    <v-row>
      <v-col>

    <v-card class="mx-auto">
            <v-card-text>
            <v-table fixed-header hover>
              <thead>
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
              </thead>

                <tbody >
                  <tr
                  v-for="item in useSupabase.itemsInCart.items"
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
                    ${{ item.price }}
                  </td>
                  <td style="border: inset 0pt">
                    <v-icon class="text-red" @click="useSupabase.deleteProd(item.id_sell)">mdi-delete</v-icon>
                    </td>
                  </tr>
                </tbody>
            </v-table>
            </v-card-text>
          </v-card>
                </v-col>
    </v-row>


  </v-container>
</template>

<script setup>
import { useSupabaseStore } from "@/store/supabaseStore";
import { reactive } from "@vue/reactivity";

const useSupabase = useSupabaseStore();
const grupedItems = reactive({items:[]})

const groupCart = () => {
  // console.log("itemsInCart", useSupabase.itemsInCart.items)
  const itemsArray = useSupabase.itemsInCart.items.map(element => element);
console.log("newArray", itemsArray)




  useSupabase.itemsInCart.items.forEach((element, index) => {

  });
  // console.log("useSupabase.itemsInCart.items", useSupabase.itemsInCart.items)


};
groupCart();
</script>

<style scoped>
.bordes {
    padding: 5px;
    border-top: 0px;
    border-right: 0px;
    border-bottom: 1px solid black;
    border-left: 0px;
}
</style>
