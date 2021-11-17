import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import store from "../../Redux/Store";
import ChatService from "../../services/socket";

function Edit(): JSX.Element {
  const _chatService = useRef<ChatService>(new ChatService());
  const vecation = store.getState().vecation;
  const history = useHistory();
  const { register, handleSubmit } = useForm<ProductModel>({
    defaultValues: {
      Name: vecation.Name,
      Place: vecation.Place,
      Price: vecation.Price,
      Start_Date: vecation.Start_Date,
      End_Date: vecation.End_Date,
    },
  });
  async function postProduct(product: ProductModel) {
    try {
      const response = await axios.patch<ProductModel>(
        "http://localhost:3000/api/update/" + vecation.Vecation_ID,
        ProductModel.convertToFormData(product)
      );
      _chatService.current.connect();
      _chatService.current.send("somthing");
      alert("You have been added.");
      history.push("/admin");
    } catch (err :any) {
      if (err.message=="Request failed with status code 403"|| err.message=="Request failed with status code 401" ) {
        alert("login again please!!");
        history.push("/login");}
      console.log(err);
    }
  }

  return (
    <div className="add-product-form container">
      <form onSubmit={handleSubmit(postProduct)} encType="multipart/form-data">
        <div className="form-group row">
          <div className="form-group col-md-6">
            <label htmlFor="Name">Name:</label>
            <input
              className="form-control"
              type="text"
              {...register("Name")}
              id="Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="Place">Place:&nbsp;</label>
            <input className="form-control" {...register("Place")} id="Place" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="Price" className="col-sm-2 col-form-label">
              Price:&nbsp;
            </label>
            <input className="form-control" {...register("Price")} id="Price" />
          </div>
        </div>
        <div className="form-group row">
          <div className="form-group col-md-6">
            <label htmlFor="Start_Date" className="col-sm-2 col-form-label">
              Start_Date:&nbsp;
            </label>
            <input
              className="form-control"
              type="date"
              {...register("Start_Date")}
              id="Start_Date"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="End_Date" className="col-sm-2 col-form-label">
              End_Date:&nbsp;
            </label>
            <input
              className="form-control"
              type="date"
              {...register("End_Date")}
              id="End_Date"
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="img" className="col-sm-2 col-form-label">
            Choose Picture:&nbsp;
          </label>
          <input
            type="file"
            className="form-control-file"
            id="img"
            {...register("img")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
}

export default Edit;
