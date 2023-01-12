<template>
  <v-container>
    <div class="fav">
      <v-card width="400" title="Favorites" v-if="supaStore.favoriteData.favs != false">
        <v-card-text>
          <v-carousel height="250" hide-delimiter-background cycle>
            <v-carousel-item
              v-for="favorite in supaStore.favoriteData.favs"
              :src="favorite.image"
            >
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon
                    v-bind="props"
                    size="x-large"
                    @click="supaStore.addToFav(favorite.id, favorite.fav)"
                    color="red"
                    icon="mdi-heart-circle"
                  >
                  </v-icon>
                </template>
                <span>Delete favorite</span>
              </v-tooltip>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </div>
    <br />
    <br />
    <v-row>
      <v-col
        cols="3"
        md="3"
        sm="3"
        lg="3"
        align-self="baseline"
        v-for="product in supaStore.AllProducts.products"
        :key="product.id"
      >
        <v-lazy transition="fade-transition">
          <v-card
            elevation="18"
            min-height="300"
            density="compact"
            variant="elevated"
            :title="product.title"
          >
            <v-card-text>
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
              <br />

              <v-row justify="space-around">
                <div class="text-center text-h6">Price: ${{ product.price }}</div>
                <div>
                  <v-icon
                    size="x-large"
                    @click="supaStore.addToFav(product.id, product.fav)"
                    :color="product.fav == 1 ? 'red' : 'gray'"
                    icon="mdi-heart-circle"
                  ></v-icon>
                </div>
              </v-row>
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

              <div class="d-flex flex-row-reverse">

                <v-sheet >
                  <v-select
                    style="width: 80px"
                    bg-color="transparent"
                    v-model="totalToAdd"
                    :items="product.stock"
                    single-line
                  ></v-select>
                </v-sheet>
              </div>

            </v-card-text>
            <v-card-actions>
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
    <v-btn color="indigo" @click="supaStore.getAllProducts()">
      get from supabase productos
    </v-btn>
  </v-container>
</template>

<script setup>
import { supabase } from "@/helpers/supabaseConfig";
import { useFakeStoreApi } from "@/store/fakeStoreApi";
import { reactive, ref, watchEffect } from "vue";
import { useSupabaseStore } from "@/store/supabaseStore";

const totalToAdd = ref(1);
const itemToAdd = ref(1);
const supaStore = useSupabaseStore();
const fakeApi = useFakeStoreApi();
const imgDialog = ref(false);
const imgClicked = ref("");
const titleClicked = ref("");
const getProducts = async () => {
  await supaStore.getAllProducts();
};
getProducts();
const openDialog = (img, title) => {
  // console.log("url img clicked",img)
  imgClicked.value = img;
  titleClicked.value = title;
  imgDialog.value = true;
};


const addTocart = async (id, title, price, count, description, image) => {
  await supaStore.addTocart(id, title, price, count, description, image);
  successAddP.value = true;
  totalToAdd.value = 1
};
const successAddP = ref(false);
</script>

<style scoped>
.fav {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .otra{
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      150px,
      1fr
    )

  );
} */
.sobre:hover::before {
  transform: scale(1.1);
  box-shadow: 0 0 15px #ffee10;
}
.sobre:hover {
  color: #ffee10;
  box-shadow: 0 0 5px #ffee10;
  /* text-shadow: 0 0 5px #ffee10; */
}
.selectDiv {
  width: 70px;
}
</style>
