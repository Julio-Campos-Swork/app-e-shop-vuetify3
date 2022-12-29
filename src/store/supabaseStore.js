import {defineStore} from 'pinia';
import { ref } from 'vue';
import {supabase} from '../helpers/supabaseConfig'


export const useSupabaseStore = defineStore('useSupabaseStore',() =>{
  const session = ref();

 const getS = async () => {
try {
  await supabase.auth.getSession().then(({ data }) => {
   console.log("getS", data)
     session.value = data.session
   })

} catch (error) {
  console.log(error)
}
}

const checkAuth = async () => {
try {

  await supabase.auth.onAuthStateChange((_, _session) => {
     console.log("checkAuth", _session)
     session.value = _session
   })
} catch (error) {
  console.log(error)
}
}
return {session, getS, checkAuth}
})
