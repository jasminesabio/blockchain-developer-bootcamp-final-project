import React, { Component } from 'react';
import Web3 from 'web3'
// import logo from '../logo.png';
import './App.css';
import Jaslist from '../abis/Jaslist.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Jaslist.networks[networkId]
    if(networkData) {
      const jaslist = web3.eth.Contract(Jaslist.abi, networkData.address)
      this.setState({ jaslist })
      this.setState({ loading: false })
    } else {
      window.alert('Jaslist contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }
  }

  addItem(name, description, price) {
    this.state.loading({ loading: true })
    this.state.jaslist.methods.createItem(name, description, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
                { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                : <Main account={this.state.account} />
                }
              {/* <Main /> */}
            </main>
          </div>
        </div>  
      </div>
    );
  }
}

export default App;
