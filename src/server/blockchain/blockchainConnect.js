const Web3 = require('web3');
const jwt = require('../services/jwt');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
const defaultAccount = '0x1D9E020B8951337487B85273E01fD27425b45f57';
web3.eth.defaultAccount = defaultAccount;

const contract = require('../../contracts/ControlAcceso.json');

const ControlAcceso = web3.eth.Contract(contract.abi, '0x50dced960691aeA590E0759e7547e0A013A53D1b');

// web3.eth.getAccounts(console.log);

function register(req, res, next) {
  console.log(`body: ${Object.values(req.body)}`);
  const name = req.body.hostname;
  const address = req.body.hostAddress;

  ControlAcceso.methods.addUser(address, name, false).send({ from: defaultAccount, gas: 6721975 }, 
    (error, result) => {
      console.log(error);
      console.log(result);
      if (result) {
        res.status(200).json({ status: 'success', message: 'host registrado correcamente ' });
      } else {
        res.status(400).json({ status: 'error', message: 'username already exist' });
      }
    });
}

function login(req, res, next) {
  console.log(`body: ${Object.values(req.body)}`);
  const message = req.body.m;
  const signedMessage = req.body.sm;
  const address = req.body.a;

  let key = web3.eth.accounts.recover(message, signedMessage);
  console.log(key)
  if (key == address) {
    // const token = jwt.createToken(user);
    ControlAcceso.methods.addressToUser(address).call({ from: defaultAccount })
      .then((result) => {
        console.log(result.userAddress);
        const token = jwt.createToken(result.userAddress);
        console.log(`token: ${token}`)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ data: token });
      });
  } else {
    res.status(400).json({ status: 'error', message: 'no cool' });
  }
  /* web3.eth.personal.ecRecover(web3.utils.utf8ToHex(message), signedMessage)
    .then((result) => {
      if (result) {
        console.log(result);
        res.status(200).json({ status: 'success', message: 'todo cool' });
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(400).json({ status: 'error', message: 'no cool' });
    }); */

  /* web3.eth.personal.ecRecover(web3.utils.utf8ToHex(message), signedMessage, (error, result) => {
    if (result) {
      console.log(result);
      res.status(200).json({ status: 'success', message: 'todo cool' });
    } else {
      console.log(error);
      res.status(400).json({ status: 'error', message: 'no cool' });
    }
  }); */

/*   ControlAcceso.methods.addUser(address, name, false).send({ from: defaultAccount, gas: 6721975 }, 
    (error, result) => {
      console.log(error);
      console.log(result);
      if (result) {
        res.status(200).json({ status: 'success', message: 'host registrado correcamente ' });
      } else {
        res.status(400).json({ status: 'error', message: 'username already exist' });
      }
    }); */
}

function removeHost(req, res, next) {
  const name = req.body.hostname;
  const address = req.body.hostAddress;

  ControlAcceso.methods.removeUser(address).send({ from: defaultAccount, gas: 6721975 }, 
    (error, result) => {
      console.log(error);
      console.log(result);
      if (result) {
        res.status(200).json({ status: 'success', message: 'host eliminado correcamente ' });
      } else {
        res.status(400).json({ status: 'error', message: 'host does not exist' });
      }
    });
}

module.exports = {
  register,
  removeHost,
  login
};
