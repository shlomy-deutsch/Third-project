import axios from "axios";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { SetProducts } from "../../Redux/GlobalState";
import store from "../../Redux/Store";
import ChatService from "../../services/socket";
import ProductCardAdmin from "../ProductCard/ProductCard-Admin";
import css from "./ProductList.module.css";
import Button from "@material-ui/core/Button";

interface ProductListState {
  products?: ProductModel[] | any;
}

class ProductListAdmin extends Component<{}, ProductListState> {
  private chatService: ChatService = new ChatService();

  public constructor(props: {}) {
    super(props);
    this.state = {
      products: [],
    };
    const allproducts = store.getState().products;

    this.setState({ products: allproducts });
  }

  public async componentDidMount(): Promise<void> {
    this.chatService.connect();
    this.chatService.socket.on("msg-from-server", async (msg: any) => {
      try {
        const response1 = await axios.get<ProductModel[]>(
          "http://localhost:3000/api/products"
        );
        store.dispatch(SetProducts(response1.data));
        const allproducts = store.getState().products;
        this.setState({ products: allproducts });
      } catch (err:any) {
        if (
          err.message == "Request failed with status code 403" ||
          err.message == "Request failed with status code 401"
        ) {
          alert("login please!!");
        }
        console.error(err + "שגיאה בכל המוצרים");
      }
    });
    try {
      const response1 = await axios.get<ProductModel[]>(
        "http://localhost:3000/api/products"
      );
      store.dispatch(SetProducts(response1.data));
      const allproducts = store.getState().products;
      this.setState({ products: allproducts });
    } catch (err:any) {
      if (
        err.message == "Request failed with status code 403" ||
        err.message == "Request failed with status code 401"
      ) {
        alert("login please!!");
      }
      console.error(err + "שגיאה בכל המוצרים");
    }
  }
  public render(): JSX.Element {
    return (
      <div className="product-list-container">
        <div className={css.productTitleActions}>
          <NavLink to="/admin/add">
            <Button variant="outlined" color="secondary">
              Add Vecation
            </Button>
          </NavLink>

          <NavLink to="/home">
            {" "}
            <Button variant="outlined" color="secondary">
              {" "}
              Live Reports
            </Button>
          </NavLink>
        </div>
        <div className="product-list">
          {this.state.products?.map((product: ProductModel, i: any) => (
            <ProductCardAdmin key={i} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductListAdmin;
