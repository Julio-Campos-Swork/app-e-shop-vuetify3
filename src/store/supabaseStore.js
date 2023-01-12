import { defineStore } from "pinia";
import { ref, reactive, toRaw } from "vue";
import { supabase } from "../helpers/supabaseConfig";
import { useFakeStoreApi } from "./fakeStoreApi";


export const useSupabaseStore = defineStore("useSupabaseStore", () => {
  const fakeStore = useFakeStoreApi();

  const AllProducts = reactive({products: null});
  const session = ref();
  const emailSession = ref("");
  const itemsInCart = reactive({ items: [] });
  const itemTotal = ref(0);
  const id_user = ref("");
  const userInfo = reactive({
    username: "",
    website: "",
    avatar_url: "",
    full_name: "",
  });
  const btnAddLoading = ref(false)
  const favoriteData = reactive({favs: []})
  //functions
  const getS = async () => {
    try {
      await supabase.auth.getSession().then(({ data }) => {
        // console.log("getS", data);
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
    // console.log("item", item);
    const { error } = await supabase
      .from("shopCart")
      .delete()
      .eq("id_sell", item);

    console.log("error delete", error);
    await getCartItems();
  };


    const getAllProducts = async () => {
      const {data,error} = await supabase
      .from('AllProducts')

      .select();
      data.sort(((a,b) => a.id - b.id))

      let arrayFav = [];
      data.forEach(element => {
        if(element.fav == 1){
          arrayFav.push(element)
        }
        let arrayStock = [...Array(element.stock).keys()];
        element.stock = arrayStock;
      });
      favoriteData.favs = arrayFav;
      console.log("favoriteData.favs",favoriteData.favs)
      AllProducts.products = data;
      console.log("AllProducts.products", AllProducts.products)
      // console.log("error", error)



    }
  //
  const addTocart = async (
    idProducto,
    productName,
    price,
    count,
    description,
    img
  ) => {
    btnAddLoading.value = true;

    await getCartItems();

    if(itemsInCart.items == false){
      await newInsert(
        idProducto,
        productName,
        price,
        count,
        description,
        img
      );
    }else{

      let flag = false;
      itemsInCart.items.forEach((element, index) => {
        if(element.id_product == idProducto){
          let total = element.totalItem + count;
            updateTotalitem(element.id_sell, total);
            flag = true;
        }else{
          flag = false;
        }
      })
        if(flag == true){
          console.log("item encontrado")
        }else{

          await newInsert(
            idProducto,
            productName,
            price,
            count,
            description,
            img
          );
        }
      }
      setTimeout(() => {
        btnAddLoading.value = false;

      }, 1000);

  };

    const saveFakeApiInfo = () => {
      fakeStore.fakeProducts.products.forEach( element => {
        let insert = {
          id: element.id,
          title: element.title,
          price: element.price,
          description: element.description,
          category: element.category,
          image: element.image,
          fav: 0,
        };
        insertFake(insert);
      });
    }

    const insertFake = async (dataInsert) => {
      const { data, error } = await supabase
      .from("AllProducts")
      .insert(dataInsert)
      .select();
      console.log("data",data)
      console.log("error",error)
    }
  const newInsert = async (
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
    // console.log("error new insert", error);
    // console.log("data new insert", data);
    await getCartItems();
  };

  //
  const updateTotalitem = async (id_sell, newTotal) => {
    let update = {
      id_sell: id_sell,
      id_user: id_user.value,
      totalItem: newTotal,
    };
    const { data, error } = await supabase.from("shopCart").upsert(update);

    console.log("data updateTotalitem", data);
    console.log("error updateTotalitem", error);

    await getCartItems();
  };
  //
  const getCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("shopCart")
        .select()
        .eq("id_user", id_user.value);
      // console.log("error", error);
      console.log("data", data);
      // console.log("total de articulos", data.length);

      itemsInCart.items = data;
      let total = 0;
      itemsInCart.items.forEach((element) => {
         total += element.totalItem
      });
      itemTotal.value = total;
      console.log("itemTotal",itemTotal.value);
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
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (!error) alert("Actualizado Con Exito");
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    } finally {
      getProfile();
    }
  };

    const addToFav = async (productID, fav) => {
      let checkUpdate;
      (fav == 0) ? checkUpdate = 1 : checkUpdate = 0;
      let update = {
        id: productID,
        fav: checkUpdate,
      }
      const {data, error} = await supabase
      .from('AllProducts')
      .upsert(update);

      console.log("error",error)
      await getAllProducts();
    }


  const saveFavorites = async (idProducto,img) => {
    await getFavorites();
    let dataInsert = {
      created_at: new Date(),
      id_user: id_user.value,
      id_product: idProducto,
      img_url: img,
    };

    if(favoriteData.favs == false){
      const { data, error } = await supabase
        .from("favorites")
        .insert(dataInsert)
        .select();
        // console.log("error", error)
        // console.log("data", data)

    }else{
      let flag = false;
      favoriteData.favs.forEach(element => {
        if(element.id_product == idProducto){
          console.log("ya esta en favoritos")
          flag = true
        }else{
          flag = false;
        }
      });
      if(flag == true){
        console.log("ya esta en favoritos")
      }else{
        const { data, error } = await supabase
        .from("favorites")
        .insert(dataInsert)
        .select();
      }
    }

      await getFavorites();
  };

  const getFavorites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select()
      .eq("id_user", id_user.value)

      favoriteData.favs = data;
  }
  const deletefav = async (idProducto) => {
    const { data, error } = await supabase
    .from('favorites')
    .delete()
    .match({ id_product: idProducto })
     console.log("error", error)
      console.log("data", data)
      await getFavorites()
  };

  return {
    getCartItems,
    addTocart,
    deleteProd,
    signOut,
    getS,
    checkAuth,
    updatePassword,
    getProfile,
    updateProfile,
    newInsert,
    updateTotalitem,
    saveFavorites,
    getFavorites,
    deletefav,
    session,
    emailSession,
    itemsInCart,
    itemTotal,
    userInfo,
    btnAddLoading,
    favoriteData,
    saveFakeApiInfo,
    getAllProducts,
    AllProducts,
    addToFav,
  };
});
