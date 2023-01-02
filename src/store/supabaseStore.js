import {defineStore} from 'pinia';
import { ref } from 'vue';
import {supabase} from '../helpers/supabaseConfig'


export const useSupabaseStore = defineStore('useSupabaseStore',() =>{
  const session = ref();
  const emailSession = ref("")
 const getS = async () => {
try {
  await supabase.auth.getSession().then(({ data }) => {
   console.log("getS", data)
     session.value = data.session
     emailSession.value = data.session?.user?.email

   })

} catch (error) {
  console.log(error)
}
}


//verificar cuando se cambie algo en el auth
const checkAuth = () => {
try {

  supabase.auth.onAuthStateChange((_, _session) => {
    //  console.log("checkAuth", _session)
     session.value = _session
   })
} catch (error) {
  console.log(error)
}
}

const updatePassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({password: password})
  console.log("respuesta del update",data)
  console.log("error del update",error)
  if(data){
    return data
  }  else{
    return error
  }
}



return {session, getS, checkAuth, emailSession, updatePassword}
})
