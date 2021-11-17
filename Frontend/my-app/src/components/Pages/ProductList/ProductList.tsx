import axios from "axios";
import { Component } from "react";
import { Redirect, useHistory } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { SetProducts } from "../../Redux/GlobalState";
import store from "../../Redux/Store";
import ChatService from "../../services/socket";
import ProductCard from "../ProductCard/ProductCard";
import css from "./ProductList.module.css";

interface ProductListState {
  products?: ProductModel[] | any;
  userproducts?: ProductModel[] | any;
  newarrayuser?: ProductModel[] | any;
  newarrayproduct?: ProductModel[] | any;
}

class ProductList extends Component<{}, ProductListState> {
  private chatService: ChatService = new ChatService();

  public constructor(props: {}) {
    super(props);
    this.state = {
      products: [],
      userproducts: [],
      newarrayuser: [],
      newarrayproduct: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    this.chatService.connect();
    this.chatService.socket.on("msg-from-server", async (msg: any) => {
      let userid = store.getState().userid;
      const send = userid;
      try {
        const response = await axios.get<ProductModel[]>(
          `http://localhost:3000/api/folows/${send}`
        );
        this.setState({ userproducts: response.data });
      } catch (err) {
        console.error(err + "שגיאה בכל המוצרים");
      }
      try {
        const response1 = await axios.get<ProductModel[]>(
          "http://localhost:3000/api/products"
        );
        store.dispatch(SetProducts(response1.data));
        const allproducts = store.getState().products;
        this.setState({ products: allproducts });
      } catch (err) {
        console.error(err + "שגיאה בכל המוצרים");
      }
      const myarrayprod = this.state.products;
      const myarrayuser = new Array();
      for (const p of this.state.products) {
        for (const u of this.state.userproducts) {
          if (u.Vecation_ID == p.Vecation_ID) {
            myarrayuser.push(p);
            const index = myarrayprod.indexOf(p);
            if (index > -1) {
              myarrayprod.splice(index, 1);
            }
          }
        }
      }
      this.setState({ newarrayuser: myarrayuser });
      this.setState({ newarrayproduct: myarrayprod });
    });

    ///////////////////////////////////////
    let userid = store.getState().userid;
    const send = userid;

    try {
      const response = await axios.get<ProductModel[]>(
        `http://localhost:3000/api/folows/${send}`
      );

      this.setState({ userproducts: response.data });
    } catch (err:any) {
      if (
        err.message == "Request failed with status code 403" ||
        err.message == "Request failed with status code 401"
      ) {
        alert("login please!!");
      }
      console.error(err + "שגיאה בכל המוצרים");
    }
    try {
      const response1 = await axios.get<ProductModel[]>(
        "http://localhost:3000/api/products"
      );

      store.dispatch(SetProducts(response1.data));

      const allproducts = store.getState().products;
      this.setState({ products: allproducts });
    } catch (err) {
      console.error(err + "שגיאה בכל המוצרים");
    }
    let myarrayprod = this.state.products;
  
    let myarrayuser = new Array();
    
      for (const u of this.state.userproducts) {
        for (const p of myarrayprod) {
        if (u.Vecation_ID == p.Vecation_ID) {
          myarrayuser.push(p);
          const index = myarrayprod.indexOf(p);
          if (index > -1) {
            myarrayprod.splice(index, 1);
          }
        }
      }
    }
    await this.setState({ newarrayuser: myarrayuser });
    await this.setState({ newarrayproduct: myarrayprod });
  }

  public render(): JSX.Element {
    return (
      <div className="product-list-container">
        <div className={css.productTitleActions}></div>
        <div className="product-list">
          {this.state.newarrayuser.map((products: ProductModel, i: any) => (
            <ProductCard key={i} product={products} followes={true} />
          ))}
          {this.state.newarrayproduct.map((products: ProductModel, i: any) => (
            <ProductCard key={i} product={products} followes={false} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
