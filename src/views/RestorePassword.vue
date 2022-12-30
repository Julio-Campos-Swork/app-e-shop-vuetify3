<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card density="compact" max-width="600px" min-width="360px" rounded>
        <v-card-title class="mt-3 purple lighten-1 text-center text-h5 white-text"
          >Reset Password</v-card-title
        >

        <v-card-text class="px-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row align="center" dense>
              <v-col cols="12">
                <v-text-field
                  clearable
                  v-model="email"
                  :rules="emailRules"
                  label="Ingresa Tu Email"
                  required
                  variant="underlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mb-4 ml-2 mr-2 white-text"
            color="green lighten-2"
            variant="flat"
            rounded
            @click="resetPassword()"
            >Reset Password</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { supabase } from "@/helpers/supabaseConfig";
import { ref, reactive } from "@vue/reactivity";

const valid = ref(null);
const email = ref("");
const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const resetPassword = async () => {
  const { error, data } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: "https://localhost:3000/userProfile/",
  });
  console.log("data", data);
  console.log("error", error);
};
</script>

<style></style>
