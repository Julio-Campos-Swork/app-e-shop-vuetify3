<template>
  <v-container >

<div class="fav">
    <v-card width="400" title="Favorites" v-if="supaStore.favoriteData.favs != false">
<v-card-text>
      <v-carousel height="250" hide-delimiter-background  cycle  >
  <v-carousel-item v-for="fav in supaStore.favoriteData.favs"
    :src="fav.img_url"
  >
  <v-icon color="red" @click="supaStore.deletefav(fav.id_product)">mdi-delete</v-icon>
  </v-carousel-item>
</v-carousel>

</v-card-text>
    </v-card>

</div>
    <br>
    <br>
    <v-row>
      <v-col
        cols="3"
        md="3"
        sm="3"
        lg="3"
        align-self="baseline"
        v-for="product in fakeApi.fakeProducts.products"
        :key="product.id"
      >
        <v-lazy transition="fade-transition">
          <v-card class="otra"
            min-height="300"
            density="compact"
            variant="elevated"
            :title="product.title"
          >
            <v-card-text class="otra">
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
              <v-btn color="red" @click="supaStore.saveFavorites(product.id,product.image)">
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

              <v-btn
                rounded="xl"
                color="yellow"
                variant="elevated"
                :loading="supaStore.btnAddLoading"
                :disabled="supaStore.btnAddLoading"
                @click="
                  supaStore.addTocart(
                    product.id,
                    product.title,
                    product.price,
                    totalToAdd,
                    product.description,
                    product.image,
                    totalToAdd
                  )
                "
                >Add to cart</v-btn
              >
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
  </v-container>
  <!-- <v-container fluid>
    <v-row>
      <v-col
        cols="3"
        md="3"
        sm="3"
        lg="3"
        align-self="baseline"
        v-for="product in fakeApi.otherFakeProducts.products"
        :key="product.id"
      >
        <v-card
          min-height="300"
          density="compact"
          variant="elevated"
          :title="product.title"
        >
          <v-card-text>
            <v-row align-content="center">
              <v-img
                class="justify-center"
                aspect-ratio="1"
                width="200"
                @click="openDialog(product.images[0], product.title)"
                :alt="product.title"
                :src="product.images[0]"
              ></v-img>
            </v-row>
            <br />
            <div>${{ product.price }}</div>
            <v-expansion-panels variant="popout">
              <v-expansion-panel
                rounded="xl"
                color="red"
                title="Description"
                :text="product.description"
              >
              </v-expansion-panel>
            </v-expansion-panels>
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
            <v-btn
              rounded="xl"
              color="yellow"
              variant="elevated"
              @click="addTocart(product.id, product.title, product.price, 1)"
              >Add to cart</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="imgDialog2" max-height="400" max-width="400">
      <v-card>
        <v-card-title>{{ titleClicked }}</v-card-title>
        <v-card-text>
          <v-img :src="imgClicked"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container> -->
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
const imgDialog2 = ref(false);
const imgClicked = ref("");
const titleClicked = ref("");
const getProducts = async () => {
  await fakeApi.getAllProducts("products");
  // await fakeApi.getAnotherFakeShop();
  // console.log("Al iniciar componente", fakeApi.fakeProducts.products)
};
getProducts();
const openDialog = (img, title) => {
  // console.log("url img clicked",img)
  imgClicked.value = img;
  titleClicked.value = title;
  imgDialog.value = true;
};

const minusProduct = () => {
  totalToAdd.value == 1 ? (totalToAdd.value = 1) : totalToAdd.value--;
};
</script>

<style scoped>
.fav{
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
</style>
