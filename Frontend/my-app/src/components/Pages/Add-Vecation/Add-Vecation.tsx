import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";

function Add(): JSX.Element {
  const history = useHistory();
  const { register, handleSubmit } = useForm<ProductModel>();

  async function postProduct(product: ProductModel) {
    try {
      const response = await axios.post<ProductModel | any>(
        "http://localhost:3000/api/products",
        ProductModel.convertToFormData(product)
      );

      const addedProduct = response.data;
      
      alert("You have been added.");

      history.push("/admin");
    } catch (err:any) {
      if (err.message=="Request failed with status code 403" || err.message=="Request failed with status code 401" ) {
        alert("login again please!!");
        history.push("/login");}
      console.log("Error while trying to add product.", err);
    }
  }

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit(postProduct)} encType="multipart/form-data">
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="Name">Name:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("Name")}
              id="Name" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="Place">Place:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("Place")}
              id="Place" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="Price">Price:&nbsp;</label>
            <input
              className="form-control"
              type="text"
              {...register("Price")}
              id="Price" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="Start_Date">Start_Date:&nbsp;</label>
            <input
              className="form-control"
              type="date"
              {...register("Start_Date")}
              id="Start_Date" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="End_Date">End_Date:&nbsp;</label>
            <input
              className="form-control"
              type="date"
              {...register("End_Date")}
              id="End_Date" required
            />
          </div>
        </div>
        <div className="form-row d-flex justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="img"> Choose Picture:&nbsp;</label>

            <input
              className="form-control"
              type="file"
              {...register("img")}
              id="img" required
            />
          </div>
        </div>
        <br />
        <div className="form-row d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            ADD VECATION
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
