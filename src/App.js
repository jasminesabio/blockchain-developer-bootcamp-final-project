import React, { Component } from 'react';
import Web3 from 'web3'
import logo from './logo.png';
import './App.css';
import Jaslist from './Jaslist.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.detectAccountChange()
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
      const itemCount = await jaslist.methods.itemCount().call()
      this.setState({ itemCount })
      // Load products
      for (var i = 1; i <= itemCount; i++) {
        const item = await jaslist.methods.items(i).call()
        this.setState({
          items: [...this.state.items, item]
        })
      }
      this.setState({ loading: false})
      // console.log(this.state.items)
    } else {
      window.alert('Jaslist contract not deployed to detected network.')
    }
  }
npm 
  detectAccountChange() {
    const ethereum = window.ethereum
    
    if(ethereum) {
      ethereum.on('accountsChanged', function (accounts) {
        console.log(accounts[0])
        // this.setState({ loading: false})
        window.location.reload()
      })
    }
  }

  

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      itemCount: 0,
      items: [],
      loading: true
    }

    this.addItem = this.addItem.bind(this)
    this.buyItem = this.buyItem.bind(this)
  }

  addItem(name, description, price) {
    this.setState({ loading: true })
    this.state.jaslist.methods.addItem(name, description, price).send({ from: this.state.account })
    .once('confirmation', (confirmation) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  buyItem(id, price) {
    this.setState({ loading: true })
    this.state.jaslist.methods.buyItem(id).send({ from: this.state.account, value: price })
    .once('confirmation', (confirmation) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row" class="container aesthetic-windows-95-container">
          <img src={logo} className="App-logo" alt="logo" class="center-logo"/>           
          <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" class="aesthetic-windows-95-boot-loader"><p className="text-center">Loading...</p></div>
                : <Main
                  items={this.state.items}
                  addItem={this.addItem}
                  buyItem={this.buyItem} />
              }
            </main>
          </div>
        </div>
        &nbsp;
      </div>
    );
  }
}

export default App;
