/* eslint-disable no-undef */
const ControlAcceso = artifacts.require('./ControlAcceso.sol');

contract('ControlAcceso', (accounts) => {
  before(async () => {
    this.controlAcceso = await ControlAcceso.deployed();
    this.owner = await this.controlAcceso.owner();
    this.noUser = '0xeEF023076D61BBEC2855fe224f3A8Ac510D0bFf8';
    // this.secondUser = '0x35bb4f0b115f8f7d4EcF2de7Cdc041f47453fD0F'

    this.firstUser = { userAddress: this.owner, username: 'admin', admin: true };
    this.secondUser = {
      userAddress: '0x35bb4f0b115f8f7d4EcF2de7Cdc041f47453fD0F',
      username: 'Secondary',
      admin: false
    };
    this.thirdUser = {
      userAddress: '0xe9A4b8429Ce4edfA7503Bf12338F2c657AaE3be1', 
      username: 'OtroMais',
      admin: false
    };
  });

  it('deploys succesfully', async() => {
    const address = await this.controlAcceso.address;

    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });
  it('list users - by address', async() => {
    const userCount = await this.controlAcceso.userCount();
    const usuario = await this.controlAcceso.addressToUser.call(this.firstUser.userAddress);
    assert.equal(userCount.toNumber(), 1);
    // assert.equal(usuario.id.toNumber(),1)
    assert.equal(usuario.userAddress, this.firstUser.userAddress);
    assert.equal(usuario.username, this.firstUser.username);
    assert.equal(usuario.admin, true);
    //assert.equal(usuario.admin, true)
  });
  it('adding user', async() => {
    const result = await this.controlAcceso.addUser(this.secondUser.userAddress, this.secondUser.username, false);
    const userCount = await this.controlAcceso.userCount();
    const event = result.logs[0].args;

    assert.equal(userCount.toNumber(), 2);
    assert.equal(event.userAddress, this.secondUser.userAddress);
    assert.equal(event.admin, false);
  });
  it('adding another user', async() => {
    const result = await this.controlAcceso.addUser(this.thirdUser.userAddress, this.thirdUser.username, false);
    const userCount = await this.controlAcceso.userCount();
    const event = result.logs[0].args;

    assert.equal(userCount.toNumber(), 3);
    assert.equal(event.userAddress, this.thirdUser.userAddress);
    assert.equal(event.admin, false);

    for (i = 0; i < userCount; i++) {
      const user = await this.controlAcceso.getUser(i);
      console.log(`${i}: ${user}`);
    }
  });
  it('remove user', async () => {
    const result = await this.controlAcceso.removeUser(this.secondUser.userAddress);
    const userCount = await this.controlAcceso.userCount();
    const event = result.logs[0].args;

    for (i = 0; i < userCount; i++) {
      const user = await this.controlAcceso.getUser(i);
      console.log(`${i}: ${user}`);
    }
    assert.equal(userCount.toNumber(), 2);
    assert.equal(event.userAddress, this.secondUser.userAddress);
  });
});