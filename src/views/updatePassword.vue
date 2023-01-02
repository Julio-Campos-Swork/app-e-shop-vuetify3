<template>
  <v-row justify="center">
    <v-card density="compact" max-width="600px" min-width="360px" rounded>
      <v-card-title class="mt-3 purple lighten-1 text-center text-h5 white-text"
        >Update Password</v-card-title
      >

      <v-card-text class="px-5">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row align="center" dense>
            <v-col cols="12">
              <v-text-field
                clearable
                v-model="password"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                required
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:appendInner="show1 = !show1"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                clearable
                v-model="passwordCheck"
                :rules="passwordRules"
                :type="show3 ? 'text' : 'password'"
                label="Confirm Password"
                required
                :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:appendInner="show3 = !show3"
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
          @click="updatePassword()"
          >Update Password</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script setup>
import { useSupabaseStore } from "@/store/supabaseStore";
import { ref, reactive, onMounted } from "vue";

const useSupaStore = useSupabaseStore();
onMounted(async () => {
  await useSupaStore.getS();
  await useSupaStore.checkAuth();
  console.log("update password page session", useSupaStore.session);
});
const email = ref("");
const passwordCheck = ref("");
const password = ref("");
const valid = ref(true);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const passwordRules = [
  (v) => !!v || "Contraseña requerida",
  (v) => v.length >= 6 || "La contraseña debe de ser mininmo de 6 caracteres",
];

const updatePassword = async () => {
  if(password.value == passwordCheck.value){
    const resp = await useSupaStore.updatePassword(email.value)
    console.log(resp)
  }else{

    console.log("Las contraseñas no coinciden");
  }
};
</script>

<style></style>
