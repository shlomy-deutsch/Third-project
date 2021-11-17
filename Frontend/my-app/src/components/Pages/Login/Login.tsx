import axios from "axios";
import { SetUsernameAction, Setuserid } from "../../Redux/GlobalState";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import LoginModel from "../../../Models/LoginModel";
import store from "../../Redux/Store";
import "./Login.css";
import ifLogedIn from "../../services/authentucation";

function Login(): JSX.Element {
  console.log("AddProduct");
  const history = useHistory();
  const { register, handleSubmit } = useForm<LoginModel>();

  async function postProduct(product: any) {
    try {
      const response = await axios.post<LoginModel>(
        "http://localhost:3000/api/login",
        product
      );
      let username = store.getState().username;
      let userid = store.getState().userid;
      const addedProduct = response.data;
      sessionStorage.setItem("user", JSON.stringify(addedProduct));
      store.dispatch(SetUsernameAction((username = addedProduct.username)));
      store.dispatch(Setuserid((userid = addedProduct.User_ID)));
      ifLogedIn();
      alert("GREAT!!!!");
      addedProduct.Admin === 0
        ? history.push("/products")
        : history.push("/admin");
    } catch (err) {
      console.log(err);
      alert("שגיאה בקוד או בשם משתמש");
    }
  }

  return (
    <div className="add-product-form container-xl ">
      <form onSubmit={handleSubmit(postProduct)}>
        {/* <div className="form-group"> */}
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="username">username:&nbsp;</label>
            <input
              className="form-control"
              {...register("username")}
              id="username"
            />
          </div>
        </div>

        <div className="form-group row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="password">Password:</label>
            <input
              className="form-control"
              type="password"
              {...register("password")}
              id="password"
            />
          </div>
        </div>
        <br />
        <div className=" d-flex justify-content-center">
          <NavLink to="/register">
            <a>מעבר להרשמה</a>
          </NavLink>{" "}
          ?עוד לא נרשמת
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
