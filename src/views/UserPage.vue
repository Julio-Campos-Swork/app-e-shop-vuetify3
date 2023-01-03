<script setup>
  import { supabase } from '../helpers/supabaseConfig'
  import { onMounted, ref } from 'vue'
  import {useSupabaseStore} from '../store/supabaseStore.js'

  const useSupabase = useSupabaseStore();

  const loading = ref(true)
  const username = ref('')
  const website = ref('')
  const avatar_url = ref('')
  const full_name = ref('')


  async function getProfile() {
    try {
      loading.value = true
      const { user } = useSupabase.session;
      // console.log("userpage",user)
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        username.value = data.username
        website.value = data.website
        avatar_url.value = data.avatar_url
        full_name.value = data.full_name
      }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  async function updateProfile() {
    try {
      loading.value = true
      const { user } = useSupabase.session;

      const updates = {
        id: user.id,
        username: username.value,
        full_name: full_name.value,
        website: website.value,
        avatar_url: avatar_url.value,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if(!error) alert("Actualizado Con Exito")
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
      getProfile();
    }
  }

getProfile();
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
          <v-img

                alt="Avatar"
                :src="avatar_url"
              ></v-img>
        </v-avatar>
        </v-row>
        <v-text-field readonly  label="E-mail: "
        v-model="useSupabase.session.user.email"
        variant="plain"
        >
        </v-text-field>

        <v-text-field
        label="User Name: "

        v-model="username"
        variant="underlined"
        >
        </v-text-field>
        <v-text-field
        label="Full Name: "
        v-model="full_name"
        variant="underlined"
        >
        </v-text-field>
        <v-text-field
        label="Website: "
        v-model="website"
        variant="underlined"
        >
        </v-text-field>

        <v-btn color="green" rounded="xl" prepend-icon="mdi-content-save" @click="updateProfile()">Update</v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
</v-container>
</template>
