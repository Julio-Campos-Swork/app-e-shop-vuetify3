<template>
  <h1>Shop</h1>
  <v-container fluid>
    <v-row  >
      <v-col  cols="3" md="3" sm="3" lg="3" align-self="baseline" v-for="product in fakeApi.fakeProducts.products" :key="product.id">

    <v-card min-height="300" density="compact"  variant="elevated" :title="product.title" >
<v-card-text >

<v-row align-content="center">

  <v-img class="justify-center" aspect-ratio="1"  width="200" @click="openDialog(product.image, product.title)"  :alt="product.title" :src="product.image"></v-img>
</v-row>
  <br>
  <v-expansion-panels variant="popout"  >
  <v-expansion-panel rounded="xl"  color="red"
    title="Description"
    :text="product.description"
  >
  </v-expansion-panel>
</v-expansion-panels>
<!-- <div class="divD">

  {{product.description}}
</div> -->

  </v-card-text>
  <v-card-actions>
    <v-btn color="indigo">Comprar</v-btn>
  </v-card-actions>
    </v-card>
      </v-col>

    </v-row>
    <v-dialog v-model="imgDialog" max-height="400" max-width="400">
      <v-card>
        <v-card-title>{{titleClicked}}</v-card-title>
        <v-card-text>
      <v-img :src="imgClicked"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { useFakeStoreApi } from '@/store/fakeStoreApi';
import { ref } from '@vue/reactivity';

const fakeApi = useFakeStoreApi();
const imgDialog = ref(false);
const imgClicked = ref("");
const titleClicked = ref("");
const getProducts = async () => {
  await fakeApi.getAllProducts("products");
  console.log("Al iniciar componente", fakeApi.fakeProducts.products)
}
getProducts();

const openDialog = (img, title) => {
  // console.log("url img clicked",img)
  imgClicked.value = img;
  titleClicked.value = title;
  imgDialog.value = true;
}
</script>

<style >
.divD{

  width: 230px;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
}
</style>
