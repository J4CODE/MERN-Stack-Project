// Products JS
import React, {
  Component
}
from 'react';
import axios from 'axios';
export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      currentPage: 1,
      paginationCount: 5,
    }
  }
  // Begin calling the data from the database
  componentDidMount() {
    axios.get('/inv/')
      .then(response => {
        this.setState({
          inventory: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  // Call for the previous page button
  previousPage = () => {
    if (this.state.currentPage !== 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      })
    }
  }
  // Call for the next page button
  nextPage = () => {
    if (this.state.currentPage + 1 <= Math.ceil(this.state.inventory.length / this.state.paginationCount)) {
      this.setState((prevState) => ({
        currentPage: (prevState.currentPage + 1)
      }))
    }
  }
  // Mapping the GET data
  inventoryList() {
    // Slicing data for table pagination
    return this.state.inventory.slice(
      (this.state.paginationCount * (this.state.currentPage - 1)),
      (this.state.paginationCount * (this.state.currentPage))).map((inventory) => {
      return ( <
        tr key = {
          inventory._id
        } >
        <
        td > {
          inventory.description
        } < /td> <
        td > {
          inventory.quantity
        } < /td> <
        /tr>
      );
    })
  }
  render() {
      // This will render the previous/next page buttons
      let previousEligible = false
      if (this.state.currentPage <= 1) {
        previousEligible = false
      }
      else {
        previousEligible = true
      }
      let nextEligible = true
      if (this.state.currentPage + 1 > Math.ceil(this.state.inventory.length / this.state.paginationCount)) {
        nextEligible = false
      }
      else {
        nextEligible = true
      }
