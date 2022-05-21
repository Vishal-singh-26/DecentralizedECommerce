//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
contract Escrow{
    struct escrowAccount{
        address consumerAdd;
        address selleradd;
        uint wallet;
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
    struct Seller{
         address uniqueAddress;
        string Name;
        string ID;
        uint Bank_Account;
    }

    escrowAccount[] escrow;
    function createAnEscrowAccount(address cons_ad,address sell_ad)public  returns(bool){
        if(escrowExists(sell_ad,cons_ad))
        return true;
    escrow.push(escrowAccount(cons_ad,sell_ad,0));
    return true;
    }
    function consumerBoughtProducts(uint product_price,address cons_add,address sells_add)public{
           if(createAnEscrowAccount(cons_add,sells_add)){
              for(uint i=0;i<escrow.length;i++){
                  if(escrow[i].consumerAdd==cons_add && escrow[i].selleradd==sells_add){
                      escrow[i].wallet+=product_price;
                  }
              }
           }
    }
    function escrowExists(address sells_add,address cons_add)public view returns(bool){
        for(uint i=0;i<escrow.length;i++){
            if(escrow[i].selleradd==sells_add && escrow[i].consumerAdd==cons_add){
                return true;
            }
        }
        return false;
    }
    function Product_Issues_At_ConsumerSide(address consumerA,address sellerA)public returns(uint){
            require(escrowExists(sellerA,consumerA));
            uint credit_Amount=0;
            for(uint i=0;i<escrow.length;i++){
                if(escrow[i].selleradd==sellerA && escrow[i].consumerAdd==consumerA){
                    credit_Amount+=escrow[i].wallet;
                    escrow[i].wallet=0;
                    break;
                }
            }
            return credit_Amount;
    }
function Product_Delivered_SuccessFully(address consA,address sellsA)public returns (uint){
        require(escrowExists(sellsA,consA));
            uint credit_Amount=0;
            for(uint i=0;i<escrow.length;i++){
                if(escrow[i].selleradd==sellsA && escrow[i].consumerAdd==consA){
                    credit_Amount+=escrow[i].wallet;
                    escrow[i].wallet=0;
                    break;
                }
            }
return credit_Amount;
}
function escrowAccountBalance(address c,address s)public view returns(uint){
     
       uint credit=0;
     for(uint i=0;i<escrow.length;i++){
                if(escrow[i].selleradd==s && escrow[i].consumerAdd==c){
                    credit+=escrow[i].wallet;
                    break;
                }
            }
            return credit;
}
}