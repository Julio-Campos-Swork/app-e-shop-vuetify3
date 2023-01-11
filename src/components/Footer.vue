<template>
  <v-footer color="blue" app class="text-center d-flex flex-column">
    <div>
      <v-btn class="mx-4" icon="mdi-facebook" variant="text"></v-btn>
      <v-btn class="mx-4" icon="mdi-twitter" variant="text"></v-btn>
      <v-btn class="mx-4" icon="mdi-instagram" variant="text"></v-btn>
    </div>

    <div class="pt-0">
      This is A Personal proyect to Practice Habilities in This Amazing Framework. Builded
      with Vue 3 Composition API, Vite, Vuetify, Vue Roter And Pinia, Backend comming from fakestore and Supabase
    </div>

    <v-divider></v-divider>

    <div>
      {{ date }}
    </div>
    <div>
      <strong>Created By Julio Campos</strong>
    </div>
  </v-footer>
</template>

<script setup>
import { ref } from "@vue/reactivity";

const date = ref("");

const getFecha = () => {
  setInterval(function () {
    const addZero = (i) => {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    };

    const currentDate = new Date();

    date.value =
      addZero(currentDate.getHours()) +
      ":" +
      addZero(currentDate.getMinutes()) +
      ":" +
      addZero(currentDate.getSeconds()) +
      " - " +
      addZero(currentDate.getDate()) +
      "/" +
      addZero(currentDate.getMonth()) +
      "/" +
      addZero(currentDate.getFullYear());
  }, 1000);
};
getFecha();
</script>

<style></style>
