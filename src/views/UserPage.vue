<script setup>
import { useSupabaseStore } from "../store/supabaseStore.js";

const useSupabase = useSupabaseStore();
useSupabase.getProfile();
</script>

<template>
  <v-container fluid>
    <v-card flat class="mx-auto">
      <v-card-title> </v-card-title>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12" md="4" lg="4">
            <v-row justify="center">
              <v-avatar variant="tonal">
                <v-img alt="Avatar" :src="useSupabase.userInfo.avatar_url"></v-img>
              </v-avatar>
            </v-row>
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
  </v-container>
</template>
