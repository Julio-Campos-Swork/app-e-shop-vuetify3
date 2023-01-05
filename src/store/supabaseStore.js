import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { supabase } from "../helpers/supabaseConfig";

export const useSupabaseStore = defineStore("useSupabaseStore", () => {
  const session = ref();
  const emailSession = ref("");
  const itemsInCart = reactive({ items: "" });
  const itemTotal = ref("");
  const id_user = ref("");
  const userInfo = reactive({
    username: "",
    website: "",
    avatar_url: "",
    full_name: "",
  });

  //functions
  const getS = async () => {
    try {
      await supabase.auth.getSession().then(({ data }) => {
        console.log("getS", data);
        session.value = data.session;
        emailSession.value = data.session?.user?.email;
        id_user.value = data.session?.user?.id;
        // console.log("id_user", id_user.value)
      });
    } catch (error) {
      console.log(error);
    }
  };

  //verificar cuando se cambie algo en el auth
  const checkAuth = () => {
    try {
      supabase.auth.onAuthStateChange((_, _session) => {
        //  console.log("checkAuth", _session)
        session.value = _session;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePassword = async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    console.log("respuesta del update", data);
    console.log("error del update", error);
    if (data) {
      return data;
    } else {
      return error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    itemsInCart = "";
    itemTotal.value = "";
    id_user.value = "";
  };
  //
  const deleteProd = async (item) => {
    console.log("item", item);
    const { error } = await supabase
      .from("shopCart")
      .delete()
      .eq("id_sell", item);

    console.log("error delete", error);
    await getCartItems();
  };

  //
  const addTocart = async (
    idProducto,
    productName,
    price,
    count,
    description,
    img
  ) => {
    let dataInsert = {
      name: productName,
      description: description,
      price: price,
      totalItem: count,
      totalPrice: price * count,
      created_at: new Date(),
      id_user: id_user.value,
      id_product: idProducto,
      img_url: img,
    };
    const { data, error } = await supabase
      .from("shopCart")
      .insert(dataInsert)
      .select();
    console.log("error", error);
    // console.log("data", data);
    await getCartItems();
  };

  //
  const getCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("shopCart")
        .select()
        .eq("id_user", id_user.value);
      console.log("error", error);
      // console.log("data", data);
      // console.log("total de articulos", data.length);

      itemsInCart.items = data;
      itemTotal.value = itemsInCart.items.length;
      // console.log("itemsInCart.items", itemsInCart);
      // console.log("itemsInCart.items tamaño", itemsInCart.items.length);
    } catch (error) {
      console.log("catch error", error);
    }
  };

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", id_user.value)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        userInfo.username = data.username;
        userInfo.website = data.website;
        userInfo.avatar_url = data.avatar_url;
        userInfo.full_name = data.full_name;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const updateProfile = async () => {
    try {

      const updates = {
        id: id_user.value,
        username: userInfo.username,
        full_name: userInfo.full_name,
        website: userInfo.website,
        avatar_url: userInfo.avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if(!error) alert("Actualizado Con Exito")
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      getProfile();
    }
  };
  return {
    getCartItems,
    addTocart,
    deleteProd,
    signOut,
    session,
    getS,
    checkAuth,
    emailSession,
    updatePassword,
    itemsInCart,
    itemTotal,
    getProfile,
    userInfo,
    updateProfile
  };
});
