<template>
  <h1>Shop</h1>
  <v-btn color="blue" size="small" @click="getProducts()">Refresh Shop</v-btn>
  <v-container fluid>
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
                @click="openDialog(product.image, product.title)"
                :alt="product.title"
                :src="product.image"
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
import { useFakeStoreApi } from "@/store/fakeStoreApi";
import { useShopcartStore } from "@/store/shopCartStore";
import { reactive, ref, watchEffect } from "vue";

const shopCart = useShopcartStore();
const fakeApi = useFakeStoreApi();
const imgDialog = ref(false);
const imgDialog2 = ref(false);
const imgClicked = ref("");
const titleClicked = ref("");
const cart = [];
const totalArticles = ref(0);
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
const buyNow = (idProducto, productName, price) => {};

const addTocart = (idProducto, productName, price, count) => {
// console.log("tempProd",tempProd)
  let data = {
    id: idProducto,
    name: productName,
    price: price,
    totalItem: count,
    totalPrice: price*count,
  };
  cart.push(data);
  shopCart.productsInCart = cart;
  // shopCart.productsInCart = cart.length;
  console.log(cart);
  console.log("Store", shopCart.productsInCart);
};

</script>

<style>
.divD {
  width: 230px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
