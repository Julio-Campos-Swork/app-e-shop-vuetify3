<script setup>
import { ref } from "@vue/reactivity";
import { useSupabaseStore } from "../store/supabaseStore.js";

const useSupabase = useSupabaseStore();
useSupabase.getProfile();
const cardUserData = ref(true);
const cardFav = ref(false);
const watchUserData = () => {
  cardUserData.value = true;
  cardFav.value = false;
};
const watchFav = () => {
  cardUserData.value = false;
  cardFav.value = true;
};
const itemToDelete = ref("")
const deleteConfirm = ref(false);
const btnConfirmDelete = (item) => {
  itemToDelete.value = item;
  deleteConfirm.value = true;
};
const deleteProd = () => {
  useSupabase.deleteProd(itemToDelete.value)
  deleteConfirm.value = false;
};
const sucessAlert = ref(false)
</script>

<template>
  <v-container fluid>
    <v-card>
      <v-layout full-height>
        <v-navigation-drawer border="md" rail expand-on-hover>
          <v-list color="transparent">
            <v-list-item
              :prepend-avatar="useSupabase.userInfo.avatar_url"
              :title="useSupabase.userInfo.username"
              :subtitle="useSupabase.session.user.email"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item
              @click="watchUserData()"
              prepend-icon="mdi-account"
              title="User Data"
            ></v-list-item>
            <v-list-item
              @click="watchFav()"
              prepend-icon="mdi-cart"
              title="CartShop"
            ></v-list-item>
            <v-list-item nav prepend-icon="mdi-gavel" title="Admin"></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-2">
              <v-btn color="red" size="x-small" class="text-white" icon="mdi-logout-variant"></v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 500px">
          <!--  -->
          <v-card border="md" min-height="500" flat class="mx-auto" v-if="cardUserData">
            <v-card-title class="text-center"> User Data </v-card-title>
            <br />
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="4" lg="4">
                  <v-row justify="center">
                    <v-avatar variant="tonal">
                      <v-img alt="Avatar" :src="useSupabase.userInfo.avatar_url"></v-img>
                    </v-avatar>
                  </v-row>
                  <br />
                  <v-text-field
                    readonly
                    label="E-mail: "
                    v-model="useSupabase.session.user.email"
                    variant="plain"
                  >
                  </v-text-field>

                  <v-text-field
                    label="User Name: "
                    v-model="useSupabase.userInfo.username"
                    variant="underlined"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Full Name: "
                    v-model="useSupabase.userInfo.full_name"
                    variant="underlined"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Website: "
                    v-model="useSupabase.userInfo.website"
                    variant="underlined"
                  >
                  </v-text-field>

                  <v-btn
                    color="green"
                    rounded="xl"
                    prepend-icon="mdi-content-save"
                    @click="useSupabase.updateProfile()"
                    >Update</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!--  -->
          <v-row>
            <v-col>
              <v-card border="md" class="mx-auto" v-if="cardFav">
                <v-card-text>
                  <v-table fixed-header hover>
                    <thead>
                      <tr>
                        <th class="text-left">img</th>
                        <th class="text-left">Article Name</th>
                        <th class="text-left">Total Item</th>
                        <th class="text-left">Unit Price</th>
                        <th class="text-left">Total Price</th>
                        <th class="text-left">Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="item in useSupabase.itemsInCart.items"
                        :key="item.id_sell"
                      >
                        <td style="border: inset 0pt">
                          <v-avatar>
                            <v-img :src="item.img_url"></v-img>
                          </v-avatar>
                        </td>
                        <td style="border: inset 0pt">
                          {{ item.name }}
                        </td>
                        <td style="border: inset 0pt">
                          {{ item.totalItem }}
                        </td>
                        <td style="border: inset 0pt">${{ item.price }}</td>
                        <td style="border: inset 0pt">
                          ${{ (item.price * item.totalItem).toFixed(2) }}
                        </td>
                        <td style="border: inset 0pt">
                          <v-icon
                            class="text-red"
                            @click="btnConfirmDelete(item.id_sell)"
                            >mdi-delete</v-icon
                          >
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-main>
      </v-layout>
    </v-card>
    <v-dialog  max-height="250" max-width="230" v-model="deleteConfirm" location="center" persistent>
      <v-card >
        <v-card-title class="text-center text-h5">Confirmation</v-card-title>
        <v-card-text>
          Are You Shure?
          This Action Can't Be Undone
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" size="small" @click="deleteConfirm = !deleteConfirm">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" size="small" @click="deleteProd()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert v-if="sucessAlert" type="success">I'm a success alert.</v-alert>
  </v-container>
</template>
