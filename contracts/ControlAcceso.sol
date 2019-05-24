pragma solidity ^0.5.0;

contract ControlAcceso {
    address public owner;
    address nullAddress = 0x0000000000000000000000000000000000000000;
    uint public userCount;
    mapping(address => User) public addressToUser;
    // mapping(uint => address) public idToUserAddress;
    address[] public usersArray;
    /*

     */
    struct User {
        address userAddress;
        string username;
        uint id;
        bool admin;
        uint creationDate;
    }

    event CreateUser(
        address userAddress,
        string username,
        uint id,
        bool admin
    );

    event RemoveUser(
        address userAddress
    );

    constructor() public {
        owner = msg.sender;
        userCount = 1;
        User memory _newUser = User(owner, "admin", userCount, true, now);
        addressToUser[owner] = _newUser;
        usersArray.push(msg.sender);
        emit CreateUser(owner, "admin", userCount, true);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAdmin {
        // require(addressToUser[msg.sender].userAddress != nullAddress && addressToUser[msg.sender].admin == true, "Only admins can call this function");
        require(addressToUser[msg.sender].admin == true, "Only admins can call this function");
        _;
    }

    function addUser(address _userAddress, string memory _username, bool _admin) public onlyAdmin {
        require(checkUsername(_username) && addressToUser[_userAddress].id == 0, "This username already exist");
        userCount++;
        User memory _newUser = User(_userAddress, _username, userCount,_admin, now);
        addressToUser[_userAddress] = _newUser;
        // idToUserAddress[userCount] = _userAddress;
        usersArray.push(_userAddress);
        emit CreateUser(_userAddress, _username, userCount, _admin);
    }


    /* 
        !!! Función de testeo, ELIMINAR O COMENTAR LUEGO.
    */
    function getUser(uint index) public view returns (string memory){
        require(index >= 0 && index < userCount);
        return addressToUser[usersArray[index]].username;
    }

    /*  Función que comprueba si un userame está en uso.
        Disminuye mucho la eficiencia del contrato, pues puede 
        conllevar un gran gasto de gas al crecer el
        número de usuarios. 
    */
    function checkUsername(string memory _username) public view returns(bool) {
         for(uint i = 0; i < userCount; i++) {
            // address exu = usersArray[i];
            string memory aux = addressToUser[usersArray[i]].username;
            //string memory aux = addressToUser[idToUserAddress[i]].username;
            if(stringToBytes32(_username) == stringToBytes32(aux)) {
                return false;
            }
        }
        return true;
    }

    // Utilidad para pasar pasar de string a bytes32 y poder comparar cadenas.
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    /*
        Busca en el array de usuarios la posición del usuario con address _user.
        Devuelve una tupla con un booleano que indica si se ha encontrado y un 
        entero que indica la posición donde se ha encontrado.
     */
    function findUserIndex(address _user) private view returns (bool, uint) {
        for(uint i = 0; i < userCount; i++) {
            if(_user == usersArray[i]) {
                return (true,i);
            }
        }
        return (false, 0);
    }

    function removeUser(address _userAddress) public {
        // requerir que sea admin o el propio usuario
        require (addressToUser[_userAddress].userAddress != nullAddress, 'user not found');
        bool finded;
        uint index;
        (finded, index) = findUserIndex(_userAddress);

        if(finded) {
            address lastUser = usersArray[userCount-1];
            addressToUser[lastUser].id = index+1; // puede que sobre
            usersArray[index] = lastUser;
            delete addressToUser[_userAddress];
            delete usersArray[userCount-1];
            emit RemoveUser(_userAddress);
            userCount--;
        }
    }
}