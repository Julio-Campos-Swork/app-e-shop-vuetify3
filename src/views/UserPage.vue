<script setup>
import { ref, reactive, onMounted } from "vue";
import { supabase } from "../helpers/supabaseConfig";
import {useSupabaseStore} from '../store/supabaseStore.js'
import axios from "axios";

const useSupabase = useSupabaseStore();

onMounted(async () => {
  await useSupabase.getS();
  await useSupabase.checkAuth();
  await userCheck();
  console.log("session",useSupabase.session);
});
const tab = ref(null);
const email = ref("julio@email.com");
const password = ref("123123");
const passwordCheck = ref("123123");
const dialog = true;
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const valid = ref(true);
const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const passwordRules = [
  (v) => !!v || "Contraseña requerida",
  (v) => v.length <= 10 || "La contraseña debe de ser mininmo de 6 caracteres",
];
const loginUser = async () => {
 let { data, error } = await supabase.auth.signInWithPassword({
 email: email.value,
  password: password.value,
})
console.log("login",data)
console.log("error",error)
};

const registrar = async () => {
 let { data, error } = await supabase.auth.signUp({
  email: email.value,
  password: password.value,
})
console.log("data register",data)
};

const socialLogin = async (name) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: name,
  });
  console.log(data);
};

// sing outerHeight
async function signout() {
  const { error } = await supabase.auth.signOut();
}

const loading = ref(false);
// const email = ref("");

const userCheck = async () => {

const { data: { user } } = await supabase.auth.getUser()
console.log("User",user)
}
</script>

<template>
  <v-container>
    <v-btn @click="signout()" color="red">Logout</v-btn>
    <v-row justify="center">
      <v-card border="md">
        <v-tabs fixed-tabs v-model="tab">
          <v-tab value="login">Login</v-tab>
          <v-tab value="Register">Register</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="login">
              <!-- login -->
              <v-row justify="center">
                <v-card density="compact" max-width="600px" min-width="360px" rounded>
                  <v-card-title
                    class="mt-3 purple lighten-1 text-center text-h5 white-text"
                    >Login</v-card-title
                  >

                  <v-card-text class="px-5">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row align="center" dense>
                        <v-col cols="12">
                          <v-btn
                            @click="socialLogin('google')"
                            prepend-icon="mdi-google"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="red"
                            rounded="lg"
                            block
                            >Login With Google</v-btn
                          >
                          <v-btn
                            @click="socialLogin('facebook')"
                            prepend-icon="mdi-facebook"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="blue"
                            rounded="lg"
                            block
                            >Login With Facebook</v-btn
                          >
                          <v-btn
                            @click="socialLogin('twitter')"
                            prepend-icon="mdi-twitter"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="indigo"
                            rounded="lg"
                            block
                            >Login With Twitter</v-btn
                          >
                          <v-btn
                            @click="socialLogin('github')"
                            prepend-icon="mdi-github"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="black"
                            rounded="lg"
                            block
                            >Login With GitHub</v-btn
                          >
                          <v-btn
                            @click="socialLogin('spotify')"
                            prepend-icon="mdi-spotify"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="green"
                            rounded="lg"
                            block
                            >Login With Spotify</v-btn
                          >
                          <v-btn
                            @click="socialLogin('twitch')"
                            prepend-icon="mdi-twitch"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="purple"
                            rounded="lg"
                            block
                            >Login With Twitch</v-btn
                          >
                          <v-text-field
                            clearable
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
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
                          <RouterLink to="/resetPassword">Did you forget your password?</RouterLink>

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
                      @click="loginUser()"
                      >Iniciar Sesion</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-window-item>

            <v-window-item value="Register">
              <!-- register -->
              <v-row justify="center">
                <v-card density="compact" max-width="600px" min-width="360px" rounded>
                  <v-card-title
                    class="purple mt-3 lighten-1 text-center text-h5 white-text"
                    >Register</v-card-title
                  >
                  <v-card-text class="px-4">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row align="center" dense>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="password"
                            :rules="passwordRules"
                            :type="show2 ? 'text' : 'password'"
                            label="Password"
                            required
                            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:appendInner="show2 = !show2"
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="passwordCheck"
                            :rules="passwordRules"
                            :type="show3 ? 'text' : 'password'"
                            label="Re-Password"
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
                      class="mb-2 ml-2 mr-2 white-text"
                      color="blue darken-3"
                      variant="flat"
                      rounded
                      @click="registrar()"
                      >Registrarse</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
