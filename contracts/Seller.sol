//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
contract Seller{
    address ADMIN;
    uint pass=140;
    constructor(){
        ADMIN=msg.sender;
    }

    struct seller{
        address uniqueAddress;
        string Name;
        string ID;
        uint Bank_Account;
        uint sel_wal;
    }
    struct Product{
        string product_name;
        address seller_address;
        string product_ID;
        uint product_price;
    }
    modifier onlyADMIN(){
        require(msg.sender==ADMIN);
        _;
    }
  mapping(address=>seller)public sell;
  mapping(address=>Product)public prod;
  seller[] _sell_arr;
Product[] no_of_products;

function isverified()public view onlyADMIN returns(bool){
    return true;
}
function setSeller(address _unq,string memory _name,string memory _id,uint account,uint am)public{
require(isverified());
require(!isSellerAvailable(_unq));
sell[_unq]=seller(_unq,_name,_id,account,am);
_sell_arr.push(seller(_unq,_name,_id,account,am));
}
function isSellerAvailable(address _seller_unq)public view returns (bool){
    for(uint i=0;i<_sell_arr.length;i++){
        if(_sell_arr[i].uniqueAddress==_seller_unq)
        return true;
    }
    return false;
}
function setProduct(string memory _p_name,address _seller_unq,string memory product_id,uint _pro_price)public{
require(isSellerAvailable(_seller_unq));
prod[_seller_unq]=Product(_p_name,_seller_unq,product_id,_pro_price);
no_of_products.push(Product(_p_name,_seller_unq,product_id,_pro_price));
}
function getSellers()public view returns (address[] memory,string[] memory,string[] memory,uint[] memory){
    address[] memory newadd=new address[](_sell_arr.length);
    string[] memory newName=new string[](_sell_arr.length);
    string[] memory newId=new string[](_sell_arr.length);
    uint[] memory newAcc=new uint[](_sell_arr.length);
    for(uint i=0;i<_sell_arr.length;i++){
        newadd[i]=_sell_arr[i].uniqueAddress;
        newName[i]=_sell_arr[i].Name;
        newId[i]=_sell_arr[i].ID;
        newAcc[i]=_sell_arr[i].Bank_Account;
    }
    return(newadd,newName,newId,newAcc);
}
function getProductsthroughSeller(address unq)public view returns(string[] memory,address[] memory,string[] memory,uint[] memory){
    string[] memory newstr=new string[](no_of_products.length);
    address[] memory newadr=new address[](no_of_products.length);
    string[] memory newid=new string[](no_of_products.length);
    uint[] memory newprice=new uint[](no_of_products.length);
    for(uint i=0;i<no_of_products.length;i++){
        if(unq==no_of_products[i].seller_address){
        newstr[i]=no_of_products[i].product_name;
        newadr[i]=no_of_products[i].seller_address;
        newid[i]=no_of_products[i].product_ID;
        newprice[i]=no_of_products[i].product_price;
            }
    }
            return(newstr,newadr,newid,newprice);
}
function getSellerthroughtProducts(string memory p_name,uint p_price)public view returns(address[] memory,string[] memory,string[] memory,uint[] memory,uint[] memory){
address[] memory newad=new address[](no_of_products.length);
string[] memory newna=new string[](no_of_products.length);
string[] memory nid=new string[](no_of_products.length);
uint[] memory nacc=new uint[](no_of_products.length);
uint[] memory price_p=new uint[](no_of_products.length);
for(uint i=0;i<no_of_products.length;i++){
    if((p_price>=no_of_products[i].product_price) && 
    keccak256(abi.encodePacked(p_name))==keccak256(abi.encodePacked(no_of_products[i].product_name)) ){
           newad[i]=no_of_products[i].seller_address;
           newna[i]=sell[no_of_products[i].seller_address].Name;
           nid[i]=sell[no_of_products[i].seller_address].ID;
           nacc[i]=sell[no_of_products[i].seller_address].Bank_Account;
        price_p[i]=no_of_products[i].product_price;
    }
}
return (newad,newna,nid,nacc,price_p);
}

function getProducts()public view returns(string[] memory,address[] memory,string[] memory,uint[] memory){
    string[] memory newstr=new string[](no_of_products.length);
    address[] memory newadr=new address[](no_of_products.length);
    string[] memory newid=new string[](no_of_products.length);
    uint[] memory newprice=new uint[](no_of_products.length);
    for(uint i=0;i<no_of_products.length;i++){
        newstr[i]=no_of_products[i].product_name;
        newadr[i]=no_of_products[i].seller_address;
        newid[i]=no_of_products[i].product_ID;
        newprice[i]=no_of_products[i].product_price;
            }
            return(newstr,newadr,newid,newprice);
}
function login(address ad,uint password)public view returns(uint){
if(ad==ADMIN){
    if(password==pass){
        return 1;
    }
}
else{
    for(uint i=0;i<_sell_arr.length;i++){
        if(_sell_arr[i].uniqueAddress==ad){
           if( _sell_arr[i].Bank_Account==password){
               return 2;
           }
        }
    }
}
return 3;
}
function delivered(address se,uint cred)public {
    require(isSellerAvailable(se));
    sell[se].sel_wal+=cred;
}
function viewBal(address s)public view returns(uint){
require(isSellerAvailable(s));
return sell[s].sel_wal;
}
}
