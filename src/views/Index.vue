<template>
  <v-container class="fill-height">

    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img
        contain
        height="300"
        src="@/assets/shopping-card.png"
      />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h3 font-weight-bold">Vuetify-Shop</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://next.vuetifyjs.com/"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon
              icon="mdi-view-dashboard"
              size="large"
              start
            />

            Vuetify
          </v-btn>
        </v-col>

        <v-col cols="auto">

          <v-btn
            color="primary"
            href="/home"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"

            variant="flat"
          >
            <v-icon
              icon="mdi-home"
              size="large"
              start
            />

            Go Home
          </v-btn>

        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://github.com/Julio-Campos-Swork/app-e-shop-vuetify3"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="flat"
          >
            <v-icon
              icon="mdi-github"
              size="large"
              start
            />

            Github
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>

  </v-container>
</template>

<script setup>

</script>

<style>

</style>
