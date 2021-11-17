import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LoginModel from "../../../Models/LoginModel";
import { SetUsernameAction, Setuserid } from "../../Redux/GlobalState";
import store from "../../Redux/Store";
import ifLogedIn from "../../services/authentucation";
import "./Register.css";

function Register(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<LoginModel>();

  async function postProduct(product: any) {
    try {
      const response = await axios.post<LoginModel | any>(
        "http://localhost:3000/api/register",
        product
      );
      let addedProduct = response.data;

      let username = store.getState().username;
      let userid = store.getState().userid;
      sessionStorage.setItem("user", JSON.stringify(addedProduct));
      store.dispatch(SetUsernameAction((username = addedProduct.username)));
      store.dispatch(Setuserid((userid = addedProduct.User_ID)));
      if (response.data === "your username allready exist, please change it") {
        alert("your username allready exist, please change it");
        history.push("/register");
      }
      else{
      ifLogedIn();
      history.push("/products");}
     
    } catch (err:any) {
      console.log("Error while trying to add you.", err);
    }
  }

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit(postProduct)}>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="FirstName">First Name:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("First_Name")}
              id="FirstName" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="lastname">Last Name:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("Last_Name")}
              id="lastname" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="username">username:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("username")}
              id="username" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="password">Password:&nbsp;</label>
            <input
              className="form-control"
              type="password"
              {...register("password")}
              id="password" required
            />
          </div>
        </div>
        <br />
        <div className="form-row d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
