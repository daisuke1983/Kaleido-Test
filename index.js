const Web3 = require('web3')
const Transaction = require('ethereumjs-tx')

const user = 'a0iwczh7br'
const pass = '_N1Ro0NojnmQxDgxWBp4dz0p_iGHS0zYYyCZ-VPZnyE'
// can't use websocket because of defect in web3js
const rpcEndpoint = 'a0rjang8h8-a0j621kkfj-rpc.au0-aws.kaleido.io'
const fromAddress = '0xe7C3E4Aa3f74210D5d39eEc3890b8fE45Eb3A04A'
const toAddress = '0x06A1d9D7F37B84d5F03D732A078A5766A28b7A17'
const privateKey = Buffer.from(
  '3404c2a0e15da9c1e91bfe90b60ae59450fcbc34750ace9a0ca4f86885867be7',
  'hex'
)

const url = `https://${user}:${pass}@${rpcEndpoint}`
const provider = new Web3.providers.HttpProvider(url)
const web3 = new Web3(provider)

web3.eth.getTransactionCount(fromAddress).then(nonce => {
  const rawTx = {
    nonce: web3.utils.numberToHex(nonce),
    from: fromAddress,
    to: toAddress,
    value: web3.utils.numberToHex(0),
    gas: web3.utils.numberToHex(50000),
    gasPrice: web3.utils.numberToHex(0)
  }

  const Tx = new Transaction(rawTx)
  Tx.sign(privateKey)

  web3.eth.sendSignedTransaction(
    '0x' + Tx.serialize().toString('hex'),
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        console.log('successfully sent')
      }
    }
  )
})
