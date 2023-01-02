import {supabase} from '../helpers/supabaseConfig'
import {ref} from 'vue'
export const useAuthUser = () => {
  const auth = ref("")
const isLoggedIn = async () => {
  try {

    await supabase.auth.getSession().then(({ data }) => {
      auth.value = data.session?.user?.aud
    })
  } catch (error) {
    console.log(error)
  }
};
return {
  isLoggedIn,
  auth
}
}
