import React, {Component} from 'react';
import axios from 'axios';
export default class UpdateList extends Component {
constructor(props) {
super(props);
this.onChangeDescription = this.onChangeDescription.bind(this);
this.onChangeQuantity = this.onChangeQuantity.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.state = {
inventory: [],
newItemDescription: '',
newItemQuantity: '',
currentPage: 1 ,
paginationCount: 5,
}
}
// Starting lifecycle and calling for data from database
componentDidMount() {
axios.get('/inv/')
.then(response => {
this.setState({inventory: response.data});
})
.catch(function (error) {
console.log(error);
})
}
// Function to change state value
onChangeDescription(e) {
this.setState({
newItemDescription: e.target.value
});
}
// Function to change state value
onChangeQuantity(e) {
this.setState({
newItemQuantity: e.target.value
})
}
// Helper function to change state value, since is array must create copy and modify copy
onChangeItem(id) {
// Creating copy of current inventory state and concatenating new object
const holderArray = this.state.inventory.concat({_id: id, description: this.state.newItemDescription, quantity: this.state.newItemQuantity})
// Setting new state
this.setState({
inventory: holderArray
})
}
// Function called when button is pressed
async onSubmit(e) {
e.preventDefault()
const newItem = {
description: this.state.newItemDescription,
quantity: this.state.newItemQuantity
}
await axios.post('/inv/', newItem)
.then(res => {
console.log(res.data.message);
this.onChangeItem(res.data.id);
})
this.setState({
newItemDescription: '',
newItemQuantity: ''
})
}
// Function call for previous page button
previousPage = () => {
if (this.state.currentPage !==1){
this.setState({
currentPage: this.state.currentPage - 1})
}
}
// Function call for next page button
nextPage = () => {
if (this.state.currentPage + 1 <= Math.ceil(this.state.inventory.length/this.state.paginationCount)){
this.setState((prevState) => ({currentPage: (prevState.currentPage + 1)}))
}
}
// Mapping out GET data
inventoryList() {
// Slicing data for table pagination
return this.state.inventory.slice(
(this.state.paginationCount * (this.state.currentPage - 1)),
(this.state.paginationCount * (this.state.currentPage))).map((inventory) =>{
return(
<tr key={inventory._id}>
  <td>{inventory.description}</td>
  <td>{inventory.quantity}</td>
</tr>
);
})
}
render() {
// Conditional setup for rendering previous/next page buttons
let previousEligible = false
if (this.state.currentPage<=1){
previousEligible = false
}
else{
previousEligible = true
}
let nextEligible = true
if(this.state.currentPage + 1 > Math.ceil(this.state.inventory.length/this.state.paginationCount)){
nextEligible = false
}
else{
nextEligible = true
}
return (
<div className="container mt-4">
  <h3 className="text-success font-weight-bold">Add Products</h3>
  <form onSubmit={this.onSubmit}>
    <div className="form-group text-white">
      <label>Item Name: </label>
      <input type="text"
        className="form-control"
        value={this.state.newItemDescription}
        onChange={this.onChangeDescription}/>
    </div>
    <div className="form-group text-white">
      <label>Quantity: </label>
      <input type="number"
        className="form-control"
        value={this.state.newItemQuantity}
        onChange={this.onChangeQuantity}/>
    </div>
    <div className="form-group mb-5">
      <input type="submit" value="Create " className="btn btn-success"/>
    </div>
  </form>
  <h4 className="text-success font-weight-bold">Current Inventory</h4>
  <table className="table table-striped table-bordered table-hover" style={{marginTop:20}}>
    <thead>
      <tr>
        <th className="text-success font-weight-bold">Item Name</th>
        <th className="text-success font-weight-bold">Quantity</th>
      </tr>
    </thead>
    <tbody className="text-white">
      {this.inventoryList()}
    </tbody>
  </table>
  {previousEligible && <button className="btn btn-success" onClick={this.previousPage}>Previous Page</button>}
  {nextEligible && <button className="btn btn-success" onClick={this.nextPage} style={{float: 'right'}}>Next Page</button>}
  <footer className="mt-5 pt-5 text-white container">
    <hr className="mt-5 bg-success">
    </hr>
    <h3 className="mt-5 pt-5 mb-5 text-center"><i className="fab fa-uncharted"></i><span className="text-uppercase"> Data Management</span> Enterprise Systems</h3>
    <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center">
          <div className="col-sm-12 col-sm-4 col-md-4">
            <h5 className="text-success font-weight-bold">Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a className="text-white text-decoration-none" href="#top">Home</a></li>
              <li><a className="text-white text-decoration-none" href="#top">About</a></li>
              <li><a className="text-white text-decoration-none" href="#top">FAQ</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Get Started</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Videos</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <h5 className="text-success font-weight-bold">Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a className="text-white text-decoration-none" href="#top">Home</a></li>
              <li><a className="text-white text-decoration-none" href="#top">About</a></li>
              <li><a className="text-white text-decoration-none" href="#top">FAQ</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Get Started</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Videos</a></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            <h5 className="text-success font-weight-bold">Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a className="text-white text-decoration-none" href="#top">Home</a></li>
              <li><a className="text-white text-decoration-none" href="#top">About</a></li>
              <li><a className="text-white text-decoration-none" href="#top">FAQ</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Get Started</a></li>
              <li><a className="text-white text-decoration-none" href="#top">Last Link</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul className="list-inline social text-center">
              <li className="list-inline-item"><a href="https://www.facebook.com" rel="noopener noreferrer" target="_blank"><i className="fab fa-facebook-f text-success h3 p-3"></i></a></li>
              <li className="list-inline-item"><a href="https://twitter.com" rel="noopener noreferrer" target="_blank"><i className="fab fa-twitter text-success h3 p-3"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com" rel="noopener noreferrer" target="_blank"><i className="fab fa-instagram text-success h3 p-3"></i></a></li>
              <li className="list-inline-item"><a href="mailto:name@email.com" rel="noopener noreferrer" target="_blank"><i className="fa fa-envelope text-success h3 p-3"></i></a></li>
            </ul>
          </div>
          <hr>
          </hr>
        </div>
        <div className="row mb-5">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
            <p><a className="text-white text-decoration-none h5" href="https://en.wikipedia.org/wiki/Enterprise_data_management" rel="noopener noreferrer" target="_blank">Data Management Enterprise Systems &copy; 2021</a></p>
          </div>
          <hr>
          </hr>
        </div>
      </div>
    </section>
  </footer>
</div>
)}
}