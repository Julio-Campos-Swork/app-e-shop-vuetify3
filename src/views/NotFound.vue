<template>
  <v-container>

    <div class="centrar">
      <img width="400" src="../assets/notFound.jpg" />
    </div>
    <v-row justify="center">
      <RouterLink to="/" class="textDec">
        <v-btn color="blue" rounded="lg">Click here To Go Home</v-btn>
      </RouterLink>
    </v-row>
  </v-container>
  <v-container>

  </v-container>
</template>

<script setup></script>

<style scoped>
.textDec {
  text-decoration: none;
}
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

}
</style>
