import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Information from "./components/information"
import List from "./components/inventory-list"
import Update from "./components/modify-list"
import Create from "./components/create-item"
import Remove from "./components/remove-item"

function App() {
  return (
    <Router>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{marginBottom: "20px"}}>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand"><i className="fab fa-uncharted"></i>&nbsp; DMES  | Data Management Enterprise Systems</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link text-success font-weight-bold">Home</Link>
              </li>
              <li className="navbar-item">
              <Link to="/list" className="nav-link font-weight-bold">Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/update" className="nav-link font-weight-bold">Replenish / Utilize</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link font-weight-bold">Add Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/remove" className="nav-link font-weight-bold">Delete Products</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={Information} />
        <Route path="/list" exact component={List} />
        <Route path="/update/" component={Update} />
        <Route path="/create/" component={Create} />
        <Route path="/remove/" component={Remove} />
    </Router>
      );
}

export default App;
