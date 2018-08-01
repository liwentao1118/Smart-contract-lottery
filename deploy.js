const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'length deal such have donate crime boat provide original used crime raise';
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b5193966085f4ae0a469a7a77215b0ba");
const web3= new Web3(provider)
const {interface,bytecode}=require('./compile')

deploy=async()=>{
    let account = await web3.eth.getAccounts();
    let contract = await new  web3.eth.Contract(JSON.parse(interface)).deploy({
        data:bytecode
    }).send({
        from:account[0],
        gas:'1000000'
    });
    console.log(interface)
    console.log(contract.options.address)
}
deploy()
