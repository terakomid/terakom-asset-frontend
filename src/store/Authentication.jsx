import { atom, selector } from "recoil";
import http from "../component/api/Api";

const authentication = atom({
   key: "authentication",
   default: selector({
      key: "default-authentication",
      get: async () => {
         let auth = false;
         let user = null;
         try {
            const { data } = await http.get(`/profile`);
            auth = data.meta.status === "success" ? true : false;
            user = data.data;
         } catch {
            auth = false;
            user = null;
         }
         return {
            auth,
            user,
         };
      },
   }),
});

export { authentication };
