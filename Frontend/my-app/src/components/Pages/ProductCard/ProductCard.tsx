import ProductModel from "../../../Models/ProductModel";
import { useHistory } from "react-router-dom";
import axios from "axios";
import idModel from "../../../Models/idModel";
import store from "../../Redux/Store";
import { Card, Form } from "react-bootstrap";
import { useState } from "react";

interface ProductCardProps {
  product: ProductModel | any;
  followes: boolean | number | any;
}

export default function ProductCard(props: ProductCardProps) {
  console.log(props.product);

  const [check, setChek] = useState<boolean>(props.followes);
  const history = useHistory();

  async function folow(e: any) {
    const userid = store.getState().userid;
    const a = e.target.id;

    const id = +a.slice(1);
    const send = { id: id, userid: userid };
    if ((document.getElementById(a) as HTMLInputElement).checked == true) {
      try {
        const response = await axios.post<idModel|any>(
          "http://localhost:3000/api/folow",
          send
        );
        const addedProduct = response.data;
        alert("You Folowing!");
        setChek(true);
      } catch (err:any) {
        if (err.message=="Request failed with status code 403") {
          alert("login again please!!");
          history.push("/login");}
        console.log("Error while trying to folow", err);
       
      }
    } else {
      try {
        const response = await axios.post<idModel>(
          "http://localhost:3000/api/unfolow",
          send
        );
        const addedProduct = response.data;
        alert("You unFolowing!");
        setChek(false);
      } catch (err:any) {
        if (err.message=="Request failed with status code 403") {
          alert("login again please!!");
          history.push("/login");}
        console.log("Error while trying to unfolow", err);
       
      }
    }
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          "http://localhost:3000/api/products/images/" +
          props.product.Image_Name
        }
      />
      <Card.Body>
        <Card.Title> Name: {props.product.Name}</Card.Title>
        <Card.Text>
          Price: {props.product.Price}
          <br />
          Place: {props.product.Place}
          <br />
          Start: {props.product.Start_Date.substring(0, 10)}
          <br />
          End: {props.product.End_Date.substring(0, 10)}
        </Card.Text>
        <Form>
          <Form.Check
            type="switch"
            id={"a" + props.product.Vecation_ID}
            label="FOLLOW ME"
            onChange={folow}
            checked={check ? true : false}
          />
        </Form>
      </Card.Body>
    </Card>
  );
}
