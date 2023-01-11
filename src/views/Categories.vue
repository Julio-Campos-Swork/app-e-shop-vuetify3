<template>
  <v-container>

    <h3 class="text-center">{{ fakeApi.selectedcategory }}</h3>
    <v-row>
      <v-col
        cols="3"
        md="3"
        sm="3"
        lg="3"
        align-self="baseline"
        v-for="product in fakeApi.fakeProductsBycategory.products"
        :key="product.id"
      >
        <v-lazy transition="fade-transition">
          <v-card

            min-height="300"
            density="compact"
            variant="elevated"
            :title="product.title"
          >
            <v-card-text >
              <v-row align-content="center">
                <v-img
                  lazy-src="../assets/loading.gif"
                  class="justify-center"
                  aspect-ratio="1"
                  @click="openDialog(product.image, product.title)"
                  :alt="product.title"
                  :src="product.image"
                ></v-img>
              </v-row>
              <br />
              <div class="text-center">${{ product.price }}</div>
              <br />
              <v-expansion-panels variant="popout">
                <v-expansion-panel
                  rounded="xl"
                  elevation="0"
                  color="transparent"
                  title="Description"
                  :text="product.description"
                >
                </v-expansion-panel>
              </v-expansion-panels>
              <br />
              <v-row justify="center">
                <v-icon @click="minusProduct()"> mdi-numeric-negative-1 </v-icon>
                <v-btn variant="text" size="small">
                  {{ totalToAdd }}
                </v-btn>
                <v-icon @click="totalToAdd++"> mdi-numeric-positive-1 </v-icon>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="red"
                @click="supaStore.saveFavorites(product.id, product.image)"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                rounded="xl"
                color="yellow"
                variant="elevated"
                @click="buyNow(product.id)"
                >Buy</v-btn
              >
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    rounded="xl"
                    color="yellow"
                    variant="elevated"
                    :loading="supaStore.btnAddLoading"
                    :disabled="supaStore.btnAddLoading"
                    @click="
                      addTocart(
                        product.id,
                        product.title,
                        product.price,
                        totalToAdd,
                        product.description,
                        product.image
                      )
                    "
                    >Add to cart</v-btn
                  >
                </template>
                <span>Add to Cart</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <v-dialog v-model="imgDialog" max-height="400" max-width="400">
      <v-card>
        <v-card-title>{{ titleClicked }}</v-card-title>
        <v-card-text>
          <v-img :src="imgClicked"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      rounded="md"
      color="green"
      location="top"
      v-model="successAddP"
      timeout="1500"
    >
      <v-icon>mdi-check</v-icon>Product Add To Cart Successfull
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { supabase } from "@/helpers/supabaseConfig";
import { useFakeStoreApi } from "@/store/fakeStoreApi";
import { reactive, ref, watchEffect } from "vue";
import { useSupabaseStore } from "@/store/supabaseStore";

const totalToAdd = ref(1);
const itemToAdd = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const supaStore = useSupabaseStore();
const fakeApi = useFakeStoreApi();
const imgDialog = ref(false);
const imgClicked = ref("");
const titleClicked = ref("");


const openDialog = (img, title) => {
  // console.log("url img clicked",img)
  imgClicked.value = img;
  titleClicked.value = title;
  imgDialog.value = true;
};
const minusProduct = () => {
  totalToAdd.value == 1 ? (totalToAdd.value = 1) : totalToAdd.value--;
};
const addTocart = async (id, title, price, totalToAdd, description, image) => {
  await supaStore.addTocart(id, title, price, totalToAdd, description, image);
  successAddP.value = true;
};
const successAddP = ref(false);
</script>

<style>

</style>
