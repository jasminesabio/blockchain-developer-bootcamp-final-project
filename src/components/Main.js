import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add Item</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.itemName.value
          const description = this.itemDescription.value
          const price = window.web3.utils.toWei(this.itemPrice.value.toString(), 'Ether')
          this.props.addItem(name, description, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="itemName"
              type="text"
              ref={(input) => { this.itemName = input }}
              className="form-control"
              placeholder="Item Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="itemDescription"
              type="text"
              ref={(input) => { this.itemDescription = input }}
              className="form-control"
              placeholder="Item Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="itemPrice"
              type="text"
              ref={(input) => { this.itemPrice = input }}
              className="form-control"
              placeholder="Item Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
        <p>&nbsp;</p>
        <h2>Buy Item</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="itemList">
            { this.props.items.map((item, key) => {
              return(
                <tr key={key}>
                  {/* <th scope="row">{item.id.toString()}</th> */}
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{window.web3.utils.fromWei(item.price.toString(), 'Ether')} Eth</td>
                  <td>{item.owner}</td>
                  <td>
                    { !item.purchased
                      ? <button
                          name={item.id}
                          value={item.price}
                          onClick={(event) => {
                            this.props.buyItem(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
