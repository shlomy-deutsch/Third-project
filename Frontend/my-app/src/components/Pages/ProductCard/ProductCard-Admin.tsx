import ProductModel from "../../../Models/ProductModel";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import idModel from "../../../Models/idModel";
import store from "../../Redux/Store";
import { Setvecation } from "../../Redux/GlobalState";
import { Card } from "react-bootstrap";
import ChatService from "../../services/socket";
import { useRef } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface ProductCardProps {
  product: ProductModel;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);
export default function ProductCardAdmin(props: ProductCardProps) {
  const classes = useStyles();
  const _chatService = useRef<ChatService>(new ChatService());
  const history = useHistory();
  async function deleteme(e: any) {
    e.preventDefault();
    const a = e.currentTarget.id;

    const id = +a.slice(1);

    try {
      const response = await axios.delete<idModel>(
        "http://localhost:3000/api/products/" + id
      );
      const addedProduct = response.data;
      if (response.status === 403) {
        alert("login again please!!");
        history.push("/login");
      }
      alert("You Deleted!");
      _chatService.current.connect();
      _chatService.current.send("somthing");
    } catch (err:any) {
      if (err.message=="Request failed with status code 403"|| err.message=="Request failed with status code 401" ) {
        alert("login again please!!");
        history.push("/login");}
      console.log("Error while trying to folow", err);
    }
  }
  function setid() {
    let vecationID = store.getState().vecation;
    store.dispatch(Setvecation((vecationID = props.product)));
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

        <Button
          id={"a" + props.product.Vecation_ID}
          onClick={deleteme}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon id={"a" + props.product.Vecation_ID} />}
        >
          Delete
        </Button>
        <NavLink to="/admin/edit">
          <Button
            onClick={setid}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </NavLink>

        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
      </Card.Body>
    </Card>
  );
}
