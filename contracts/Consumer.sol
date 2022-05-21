//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
contract consumer{
  address ADMIN1;
  uint pass=140;
    constructor(){
       ADMIN1=msg.sender;
    }
    modifier onlyADMIN1(){
        require(msg.sender==ADMIN1);
        _;
    }
    function isverifiedConsumer()public view onlyADMIN1 returns(bool){
        return true;
    }
    struct Consumer{
        address uniqueAddress_Consumer;
        string cname;
        string cid;
        string actual_address;
        uint pinCode;
        string state;
        string country;
        uint account_balance;
        uint bank_accountC;
    }
    struct ProductsBought{
        address _seller_address;
        address c_address;
        string product_name;
        string product_Id;
        uint product_Price;
    }
    mapping(address=>Consumer)public cons;
    mapping(address=>ProductsBought)public pbhm;
    Consumer[] con;
   ProductsBought[] pba;
    function setConsumer(address adj,string memory _cname,string memory _cid,string memory _acad,uint _pc,string memory _state,string memory _country,uint balance,uint account_number)public{
     require(isverifiedConsumer());
     require(!isConsumerAvailable(adj));
     cons[adj]=Consumer(adj,_cname,_cid,_acad,_pc,_state,_country,balance,account_number);
     con.push(Consumer(adj,_cname,_cid,_acad,_pc,_state,_country,balance,account_number));
     
    }
    function isConsumerAvailable(address un)public view returns(bool){
        for(uint i=0;i<con.length;i++){
            if(con[i].uniqueAddress_Consumer==un)
            return true;
        }
        return false;
    }
    function addBalancetoWallet(address unqa,uint money)public{
      require(isConsumerAvailable(unqa));
      cons[unqa].account_balance+=money;
    }
    function BUYaPRODUCT(address consumer_address,address _seller_address,string memory _seller_name,string memory product_name,string memory id,uint product_price)public 
     returns(string memory,string memory ,string memory,string memory,address,uint,bool){
require(isConsumerAvailable(consumer_address));
if(cons[consumer_address].account_balance>=product_price){
    cons[consumer_address].account_balance= cons[consumer_address].account_balance-product_price;
    pbhm[consumer_address]=ProductsBought(_seller_address,consumer_address,product_name,id,product_price);
    pba.push(ProductsBought(_seller_address,consumer_address,product_name,id,product_price));
        return (cons[consumer_address].cname,_seller_name,product_name,id,_seller_address,product_price,true);
}
return  (cons[consumer_address].cname,_seller_name,product_name,id,_seller_address,product_price,false);
    }
    function giveRatingTOSellerandProduct(address sell_add,string memory product_name,string memory product_ID,uint sellerR,uint productR)public view returns(address,string memory,string memory,uint,uint,bool){
     for(uint i=0;i<pba.length;i++){
         if(pba[i]._seller_address==sell_add){
             if((keccak256(abi.encodePacked(product_name))==keccak256(abi.encodePacked(pba[i].product_name))) && 
             keccak256(abi.encodePacked(product_ID))==keccak256(abi.encodePacked(pba[i].product_Id))){
 return (sell_add,product_name,product_ID,sellerR,productR,true);
             }
         }
     }
     return (sell_add,product_name,product_ID,sellerR,productR,false);
    }
    function loginC(address ad,uint password)public view returns(uint){
if(ad==ADMIN1){
    if(password==pass){
        return 1;
    }
}
else{
    for(uint i=0;i<con.length;i++){
        if(con[i].uniqueAddress_Consumer==ad){
           if( con[i].bank_accountC==password){
               return 2;
           }
        }
    }
}
return 3;
}
function checkBalance(address c_adda)public view returns(uint){
require(isConsumerAvailable(c_adda));
        return cons[c_adda].account_balance;
}
    }