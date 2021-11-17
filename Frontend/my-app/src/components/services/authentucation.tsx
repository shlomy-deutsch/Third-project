import axios from "axios"
import LoginModel from "../../Models/LoginModel"

function ifLogedIn():any{
      const user:LoginModel|any = sessionStorage.getItem("user");
      const tuser = JSON.parse(user);
    axios.defaults.baseURL = 'http://localhost:3001/'
    axios.defaults.headers.common = {'Authorization': `bearer ${tuser.token}`}
     

   }

   export default ifLogedIn