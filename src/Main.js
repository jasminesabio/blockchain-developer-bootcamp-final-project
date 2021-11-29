import React, { Component } from 'react';
import './App.css';
import ticket from './ticket.png';

class Main extends Component {

  render() {
    return (
      <div id="content" class="center">
          <div class="aesthetic-windows-95-modal">
            <div class="aesthetic-windows-95-modal-title-bar">
              <div class="aesthetic-windows-95-modal-title-bar-text">
                SELL TICKET
              </div>

              <div class="aesthetic-windows-95-modal-title-bar-controls">
                <div class="aesthetic-windows-95-button-title-bar">
                  <button>X</button>
                </div>
              </div>
            </div> &nbsp;
            <div class="aesthetic-windows-95-modal-content">
              <div>
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
                    placeholder="Event Name"
                    required />
                </div> 
                <div className="form-group mr-sm-2">
                  <input
                    id="itemDescription"
                    type="text"
                    ref={(input) => { this.itemDescription = input }}
                    className="form-control"
                    placeholder="Event Description (Location, Date)"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="itemPrice"
                    type="text"
                    ref={(input) => { this.itemPrice = input }}
                    className="form-control"
                    placeholder="Price (in ETH)"
                    required />
                </div>
                <button type="submit" className="btn btn-primary" class="aesthetic-windows-95-button">Sell Ticket</button>
              </form>        
              </div>
            </div>
          </div>
        &nbsp;


        <div className="wrapper">
          { this.props.items.map((item, key) => {
            return(
              <div className="card" key={key}>
                <div className="card__body">
                  <img src={ticket} className="Ticket-logo" alt="ticket" class="card__image"></img>
                  <h4 className="card__title">{item.name}</h4>
                  <h5 className="card__description">{item.description}</h5>
                  {/* <h5 className="card__description">Price: {window.web3.utils.fromWei(item.price.toString(), 'Ether')} Eth</h5> */}
                  <p className="card__description">Owner: {item.itemOwner}</p>
                  <p>
                    { !item.purchased
                      ? <button
                          class="aesthetic-windows-95-button center"
                          name={item.sku}
                          value={item.price}
                          onClick={(event) => {
                          this.props.buyItem(event.target.name, event.target.value)
                          }}
                          >
                            Buy: {window.web3.utils.fromWei(item.price.toString(), 'Ether')} ETH
                          </button>
                          : null
                          }
                        </p>
                </div>
              </div>
            )
          })}
        </div>
        &nbsp;        

        {/* <h2>Buy Item</h2>
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
                  <th scope="row">{item.sku.toString()}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{window.web3.utils.fromWei(item.price.toString(), 'Ether')} Eth</td>
                  <td>{item.owner}</td>
                  <td>
                    { !item.purchased
                      ? <button
                          class="aesthetic-windows-95-button"
                          name={item.sku}
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
        </table> */}
      </div>
    );
  }
}

export default Main;
