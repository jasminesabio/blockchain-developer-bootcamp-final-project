import React, { Component } from 'react';
import './App.css';
import ticket from './ticket.png';

class Main extends Component {

  render() {
    return (
      <div id="content" className="center">
          <div className="aesthetic-windows-95-modal">
            <div className="aesthetic-windows-95-modal-title-bar">
              <div className="aesthetic-windows-95-modal-title-bar-text">
                SELL TICKET
              </div>

              <div className="aesthetic-windows-95-modal-title-bar-controls">
                <div className="aesthetic-windows-95-button-title-bar">
                  <button>X</button>
                </div>
              </div>
            </div> &nbsp;
            <div className="aesthetic-windows-95-modal-content">
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
                <button type="submit" className="aesthetic-windows-95-button">Sell Ticket</button>
              </form>       
              </div>
            </div>
          </div>
        &nbsp;


        <div className="wrapper">
          { this.props.items.map((item, key) => {
            return(
              <div className="card" key={key}>
                <div className="card-body">
                  <img src={ticket} alt="ticket" className="card-image"></img>
                  <h4 className="card-title">{item.name}</h4>
                  <h5 className="card-description">{item.description}</h5>
                  <p className="card-description">Owner: {item.itemOwner}</p>
                  <p>
                    { !item.purchased
                      ? <button
                          className="aesthetic-windows-95-button center"
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
      </div>
    );
  }
}

export default Main;
