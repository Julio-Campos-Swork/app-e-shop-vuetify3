<template>
  <v-container fluid>
    <h1 class="text-center">Product: {{ id }}</h1>

    <v-card v-if="index != -1 && index != 0">
      <h1>Producto</h1>
    <v-layout>
      <v-navigation-drawer width="400"
        permanent
        location="right"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            :prepend-avatar="supaStore.AllProducts.products[index].image"
            :title="supaStore.AllProducts.products[index].title"
            :subtitle="supaStore.AllProducts.products[index].price"
          ></v-list-item>
        </template>

        <v-divider></v-divider>


      </v-navigation-drawer>
      <v-main style="height: auto">
        <v-row justify="center">
      <v-col
        cols="3"
        md="3"
        sm="3"
        lg="3"
        align-self="baseline"

      >
        <v-lazy transition="fade-transition">
          <v-card

            min-height="500"
            min-width="500"
            density="compact"
          border="0"
            :title="supaStore.AllProducts.products[index].title"
          >
            <v-card-text>
              <v-row align-content="center">
                <v-img
                  lazy-src="../assets/loading.gif"
                  class="justify-center"
                  aspect-ratio="1"
                  @click="openDialog(supaStore.AllProducts.products[index].image, supaStore.AllProducts.products[index].title)"
                  :alt="supaStore.AllProducts.products[index].title"
                  :src="supaStore.AllProducts.products[index].image"
                ></v-img>
              </v-row>
              <br />
              <br />

              <v-row justify="space-around">
                <div class="text-center text-h6">Price: ${{ supaStore.AllProducts.products[index].price }}</div>
                <div>
                  <v-icon
                    size="x-large"
                    @click="supaStore.addToFav(supaStore.AllProducts.products[index].id, supaStore.AllProducts.products[index].fav)"
                    :color="supaStore.AllProducts.products[index].fav == 1 ? 'red' : 'gray'"
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
                  :text="supaStore.AllProducts.products[index].description"
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
                    :items="supaStore.AllProducts.products[index].stock"
                    single-line
                  ></v-select>
                </v-sheet>
              </div>

            </v-card-text>

          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
    <v-container>
      <h3 class="text-center">Description</h3>
      <p>{{supaStore.AllProducts.products[index].description}}</p>
    </v-container>
      </v-main>
    </v-layout>
  </v-card>
  </v-container>
</template>

<script setup>
import { useSupabaseStore } from '@/store/supabaseStore';
import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue';
const router = useRouter()
const supaStore = useSupabaseStore();

const index = ref(0);
const totalToAdd = ref(1)
const props = defineProps({id: String})
const getProduct = async() => {
  if(supaStore.AllProducts.products == null){
    await supaStore.getAllProducts();
  }
   index.value = supaStore.AllProducts.products.findIndex(element => element.id == props.id)
  if(index.value == -1){
    console.log("enviar a pagina de no encontrado")
    router.push('/home')
  }else{
    console.log("producto encontrado")
  }
}

  getProduct();


</script>

<style>

</style>
