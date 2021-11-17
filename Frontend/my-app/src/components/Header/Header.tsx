import { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import store from "../Redux/Store";
import "./Header.css";

export function Header(): JSX.Element {
  function Username() {
    const [username, setViews] = useState(store.getState().username);
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setViews(store.getState().username);
      });
      return () => unsubscribe();
    }, []);

    useEffect(() => {
      console.log("I got a new views!", username);
    }, [username]);

    return (
      <div className="user">
        <p>{username == null ? "hello stranger" : "Hello " + username + "!!!"} </p>
      </div>
    );
  }

  return (
    <header>
      <Navbar>
        <Container>
          <Navbar.Brand href="/login">login</Navbar.Brand>
          <Navbar.Brand href="/login">logout</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <h1 className="headline">Welcome To Weekend Web</h1>
            <Navbar.Text>
              Signed in as:{" "}
              {/* <a href="#login"> */}
                <Username />
              {/* </a>s */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
