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
                    Unit Price
                  </th>
                  <th class="text-left">
                    Total Price
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
                    ${{ (item.price * item.totalItem).toFixed(2)}}
                  </td>
                  <td style="border: inset 0pt">
                    <v-icon class="text-red" @click="btnConfirmDelete(item.id_sell)">mdi-delete</v-icon>
                    </td>
                  </tr>
                </tbody>
            </v-table>
            </v-card-text>
          </v-card>
                </v-col>
    </v-row>

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
      <v-snackbar location="top" timeout="1500" v-model="successAlert" color="green">
     <v-icon>mdi-check-circle</v-icon> Product Deleted Successfull
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { useSupabaseStore } from "@/store/supabaseStore";
import { reactive, ref } from "@vue/reactivity";

const useSupabase = useSupabaseStore();
const grupedItems = reactive({items:[]})

const groupCart = async () => {
 await useSupabase.getCartItems()
  // grupedItems.items = [];
  // // console.log("grupedItems", grupedItems)

  // const newArray = useSupabase.itemsInCart.items.map(el => el)
  // console.log("newArray", newArray)
  // newArray.forEach((element, index) => {
  //   if(index == 0){
  //     grupedItems.items.push(element)
  //   }else{
  //     let find = grupedItems.items.findIndex(ele => ele.id_product == element.id_product)
  //     if(find == -1){
  //     grupedItems.items.push(element)

  //     }else{
  //       let total = grupedItems.items[find].totalItem;
  //       grupedItems.items[find].totalItem = total + 1;
  //     }
  //   }

  // });
  // console.log("grupedItems.items", grupedItems.items)
  // console.log("useSupabase.itemsInCart.items", useSupabase.itemsInCart.items)


};
groupCart();
const itemToDelete = ref("")
const deleteConfirm = ref(false);
const btnConfirmDelete = (item) => {
  itemToDelete.value = item;
  deleteConfirm.value = true;
};
const deleteProd = () => {
  useSupabase.deleteProd(itemToDelete.value)
  deleteConfirm.value = false;
  successAlert.value = true;

  setTimeout(()=>{
    successAlert.value = false;
  },2000)
};
const successAlert = ref(false)

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
