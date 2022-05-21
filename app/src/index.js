// Import Web3 JS library
const Web3 = require('web3');

// Import the ABI definition of the DemoContract
const artifact = require('../../build/contracts/Seller.json');
const artifactc=require('../../build/contracts/consumer.json');
const artifacte=require('../../build/contracts/Escrow.json');
const contractAddress = '0x368f82B685Dc0d92Def843a2ab5Eca663726012E';
const Consumer_Address='0xE05c20dfbaACd93F962482424f13d4F9Ab08A6d5';
const Escrow_Address='0x0B3Dcb5958Fa9bD50aaf7d12F506A3eE07a67c3A';
const App = {
    web3: null,
    contractInstance: null,
    accounts: null,

    start: async function() {
        const { web3 } = this;
        // Get the accounts
        this.accounts = await web3.eth.getAccounts();
       
        console.log(this.accounts);

        this.contractInstance = new web3.eth.Contract(
            artifact.abi,
            contractAddress
        ); 
    
    },

    login: async function(){
      var ad=document.getElementById('address').value;
      var pa=document.getElementById('password').value;
     var ann=await this.contractInstance.methods.login(ad,pa).call();
      if(ann==3){
          
          const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  var tr=await this.contractInstance.methods.loginC(ad,pa).call();
  if(tr==3){
    alert("User Not Registered!!!");
  }
  if(tr==1){
    window.location.href='/ADMIN_PAGE.html';
          alert("Welcome ADMIN ");
  }
  if(tr==2){
    window.location.href='/Consumer1.html';
          alert("Welcome Consumer ");
  }
      }
      if(ann==1){
          window.location.href='/ADMIN_PAGE.html';
          alert("Welcome ADMIN ");
      }
      if(ann==2){
         window.location.href='/Seller_Page.html';
          alert("Welcome Seller ");
      }
  },
  setSeller: async function(){ 
     
    var ps=document.getElementById('Seller_UNQ').value;
  var ci=document.getElementById('Sell_Name').value;
    var ca=document.getElementById('Sell_Id').value;
    var po=document.getElementById('Seller_Account').value;
    
    await this.contractInstance.methods.setSeller(ps,ci,ca,po,0).send({
        from:this.accounts[0],
        gas:1000000
    })
    alert("Seller has been successfully set");
},
setProduct: async function(){
  var i=document.getElementById('Prod_Name').value;
  var s=document.getElementById('Seller_UNQ').value;
  var a=document.getElementById('Prod_Id').value;
  var o=document.getElementById('Prod_Price').value;
  
  await this.contractInstance.methods.setProduct(i,s,a,o).send({
      from:this.accounts[0],
      gas:1000000
  })
  alert("Product has been successfully set");
},
viewRegisteredProducts:async function(){
  var s=document.getElementById('Seller_UNQ').value;
  var res=await this.contractInstance.methods.getProductsthroughSeller(s).call();
  var {0:p_name,1:sell_addr,2:pro_id,3:pro_price}=res;
alert("Product_Name  "+p_name+"\n"+"Seller Address  "+sell_addr+"\n"+"Product Id  "+pro_id+"\n"+"Product price  "+pro_price);
},
setConsumer1 :async function(){
  var ps=document.getElementById('vadd').value;
  var ci=document.getElementById('cn').value;
  var ca=document.getElementById('C_id').value;
  var cnn=document.getElementById('ph_add').value;
  var po=document.getElementById('pin').value;
  var gen=document.getElementById('stat').value;
  var vp=document.getElementById('count').value;
  var vpas=document.getElementById('Acc_b').value;
  var ll=document.getElementById('b_a').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  await this.contractInstance.methods.setConsumer(ps,ci,ca,cnn,po,gen,vp,vpas,ll).send({
    from:this.accounts[0],
    gas:1000000
  })
alert("Consumer has been Successfully Set");
},
addBalance: async function(){
  var ps=document.getElementById('address').value;
 
  var ca=document.getElementById('amt').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  await this.contractInstance.methods.addBalancetoWallet(ps,ca).send({
    from:this.accounts[0],
    gas:1000000
  })
  alert(" Money has been added to your account");
},
escrow: async function(){
  var ad1=document.getElementById('S_address').value;
  var cnn=document.getElementById('C_address').value;
  var ca=document.getElementById('amtt').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifacte.abi,
    Escrow_Address
  );
  await this.contractInstance.methods.createAnEscrowAccount(ad1,cnn).send({
    from:this.accounts[0],
    gas:1000000
  })
  alert("Escrow account has been set up ");
},
getAvailableProducts:async function(){
  var re=await this.contractInstance.methods.getProducts().call();
  var {0:pro_name,1:sell_adr,2:pro_id,3:pro_price}=re;
  alert("Product_Name  "+pro_name+"\n"+"Seller Address  "+sell_adr+"\n"+"Product Id  "+pro_id+"\n"+"Product price  "+pro_price);

},
getAllSellers: async function(){
  var re=await this.contractInstance.methods.getSellers().call();
  var {0:unq_ad,1:s_name,2:s_id,3:bank_acc}=re;
  alert("Seller_UNQ_Address  "+unq_ad+"\n"+"Seller Name  "+s_name+"\n"+"Seller Id  "+s_id+"\n"+"Seller Account  "+bank_acc);
  
},
getProductsAccordingly:async function(){
  var ad1=document.getElementById('pn').value;
  var cnn=document.getElementById('pri').value;
  var er=await this.contractInstance.methods.getSellerthroughtProducts(ad1,cnn).call();
  var {0:s_unq,1:s_n,2:s_id,3:s_ba,4:p_price}=er;
  
  alert("Seller_UNQ_Address  "+s_unq+"\n"+"Seller Name  "+s_n+"\n"+"Seller Id  "+s_id+"\n"+"Seller Account  "+s_ba+"\n"+"Product Price "+p_price);


},
buy:async function(){
  var ps=document.getElementById('c_ad').value;
  var ci=document.getElementById('s_ad').value;
  var ca=document.getElementById('sn').value;
  var cnn=document.getElementById('pn').value;
  var po=document.getElementById('p_id').value;
  var gen=document.getElementById('pp').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  var r=await this.contractInstance.methods.BUYaPRODUCT(ps,ci,ca,cnn,po,gen).call();
  await this.contractInstance.methods.BUYaPRODUCT(ps,ci,ca,cnn,po,gen).send({
    from:this.accounts[0],
    gas:1000000
  })
  var{0:c_n,1:s_n,2:p_n,3:p_id,4:s_ad,5:p_p,6:res}=r;
if(res==true){
  alert("Transaction Successful ");
  alert("You have bought "+cnn+" from  "+ca+" at a price of  "+gen+" whose id Product id is  "+po);
  {
    const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifacte.abi,
    Escrow_Address
  );
  var es=await this.contractInstance.methods.consumerBoughtProducts(gen,ps,ci).send({
    from:this.accounts[0],
    gas:1000000
  })
  alert("Amount credited to Escrow Account");
  }
}
else{
  alert("Error in transaction please verify details of product and seller ")
}
},
giveRating:async function(){
  var ps=document.getElementById('Seller_UNQ').value;
  var ci=document.getElementById('pro_Name').value;
  var ca=document.getElementById('pro_Id').value;
  var cnn=document.getElementById('Seller_Rating').value;
  var po=document.getElementById('Product_Rating').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  var r=await this.contractInstance.methods.giveRatingTOSellerandProduct(ps,ci,ca,cnn,po).call();
  var {0:s_ad,1:pn,2:p_id,3:s_r,4:p_r,5:we}=r;
  if(we){
    alert("Rating Succesfully given");
    alert(" Seller Rating "+cnn+" Product Rating "+po);
  }
  else{
    alert("Error Please Check credentials and give feedback ");
  }
},
Product_Issues_At_ConsumerSidee:async function(){
  var ps=document.getElementById('C_address').value;
  var ci=document.getElementById('S_address').value;
var ty=0;
  const{ web3 } =this;

  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );

{
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifacte.abi,
    Escrow_Address
  );
  var ert=await this.contractInstance.methods.Product_Issues_At_ConsumerSide(ps,ci).call();
  ty=ert;



  var es=await this.contractInstance.methods.Product_Issues_At_ConsumerSide(ps,ci).send({
    from:this.accounts[0],
          gas:1000000})
  alert(" Amount credited back to Consumer Account from Escrow Account ");

}
{
  const{ web3 } =this;

  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  await this.contractInstance.methods.addBalancetoWallet(ps,ty).send({
    from:this.accounts[0],
    gas:1000000
  })
}
},
Product_Delivered:async function(){
  var ps=document.getElementById('C_address').value;
  var ci=document.getElementById('S_address').value;
var ty=0;

{
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifacte.abi,
    Escrow_Address
  );
  var ert=await this.contractInstance.methods.Product_Delivered_SuccessFully(ps,ci).call();
  ty=ert;



  await this.contractInstance.methods.Product_Delivered_SuccessFully(ps,ci).send({
    from:this.accounts[0],
          gas:1000000})
  alert(" Amount credited to Seller Account from Escrow Account ");

}
const{ web3 } =this;

  this.contractInstance=new web3.eth.Contract(
    artifact.abi,
    contractAddress
    
  );
  await this.contractInstance.methods.delivered(ci,ty).send({
    from:this.accounts[0],
    gas:1000000
  })

},
checkEscrowBal:async function(){
  var ps=document.getElementById('c_ad').value;
  var ci=document.getElementById('s_ad').value;
  const{ web3 } =this;
  this.contractInstance=new web3.eth.Contract(
    artifacte.abi,
    Escrow_Address
  );
  var wer=await this.contractInstance.methods.escrowAccountBalance(ps,ci).call();

  alert("Escrow Account balance "+wer);
},
checkBal:async function(){
  var ps=document.getElementById('c_ad').value;
  const{ web3 } =this;

  this.contractInstance=new web3.eth.Contract(
    artifactc.abi,
    Consumer_Address
  );
  var r=await this.contractInstance.methods.checkBalance(ps).call();
  alert(" Your Account Balance is "+r);
},
check_S_Bal:async function(){
  var ps=document.getElementById('Seller_UNQ').value;
  var r=await this.contractInstance.methods.viewBal(ps).call();
  alert(" Your Account Balance is "+r);
},
};
window.App = App;

window.addEventListener("load", function() {
    

    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );

  App.start();
 
});
