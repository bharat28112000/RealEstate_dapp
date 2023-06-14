// connnecting to metamask

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();
console.log(signer)


//show form by clicking the button

const showFormButton = document.getElementById('showFormButton');
    const createPropertyForm = document.getElementById('box');

    showFormButton.addEventListener('click', function() {
        createPropertyForm.classList.toggle('hidden');
    });




let account;

document.getElementById('connectButton').addEventListener('click', async () => {
    try {
        await ethereum.request({method: 'eth_requestAccounts'});
        // await displayAccountAddress();

        const accounts = await provider.listAccounts();
        console.log(accounts)
    
        if(accounts.length > 0) {
            account = accounts[0];
            console.log(account)
            document.getElementById('accountAddress').textContent = `Connected Account: ${account}`;
            document.getElementById('connectButton').style.display = 'none';
        }
        else {
            document.getElementById('accountAddress').textContent = 'No account connected';
            document.getElementById('connectButton').style.display = 'block';
        }

        const b = document.getElementById("getownedProperty")
        b.disabled = false;
    }
    catch (error) {
        console.error(error)
        alert('Error connecting to account')
    }
})

//####################################################################################################################################################


//user entering the property details and updating the blockchain

const contractaddress = "0xd2EA0E37b0A3d4760F9FD9a0698C55235FAF6623";
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "auctions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "propertyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "highestBid",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "highestBidder",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "ended",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "properties",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "forSale",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "imageurl",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "verified",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "propertyToOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "propertyToSeller",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "propertyVerificationStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_imageurl",
        "type": "string"
      }
    ],
    "name": "createProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "getProperty",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "forSale",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "imageurl",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "verified",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "verifyProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "buyProperty",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "listPropertyForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "sellProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "getPropertySeller",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_propertyId",
        "type": "uint256"
      }
    ],
    "name": "startAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "placeBid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getAuctionsLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_auctionId",
        "type": "uint256"
      }
    ],
    "name": "endAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contract = new ethers.Contract(contractaddress, abi, signer);
console.log(contract)


document.getElementById('createPropertyForm').addEventListener('submit' , async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('url').value;

    // document.getElementById('createPropertyForm').reset();
    try {
        const tx = await contract.createProperty(name, description, price, image);
        await tx.wait();

        document.getElementById('createPropertyForm').reset();
        await getPropertyList();

        

    } catch (error){
        console.log(error)
    }
})


//############################################################################################################################################



// listing the properties in display

let buyButton;
let prevowner;

async function getPropertyList(price=null, sale=null) {

    const propertyList = document.getElementById('propertyList');
    propertyList.innerHTML = '';
    
    const totalproperties = await contract.totalSupply();
    // const tx = await contract.auctions(3);
    // console.log("###"+tx)
    
    // console.log("b"+totalproperties)
    
    console.log(propertyList)

    for(let i=0; i< totalproperties; i++)
    {
        const propertyId = await contract.tokenByIndex(i);
        // console.log("$" + propertyId)
        const property = await contract.getProperty(propertyId);
        // console.log('a'+property.price
        const powner = await contract.propertyToSeller(propertyId);

        if(property.forSale) {
            const listItem = document.createElement('li');

            if(price == null)
            {
                listItem.innerHTML = `
                <img src=${property.imageurl} /><br>
                <strong>TokenId: ${propertyId}<br>
                <strong>${property.name}</strong><br>
                <small>Owner: ${property.owner}<br></small>
                <small>Prev Owner: ${powner}</small><br>
                Description: ${property.description}<br>
                Price: ${property.price} ETH<br>
               
                For Sale: ${property.forSale ? 'Yes' : 'No'}<br>
                Verified: ${property.verified ? 'Yes' : 'No'}<br>
                <br><br>
                `;
            }
            else
            {
                
                listItem.innerHTML = `
                <img src=${property.imageurl} /><br>
                <strong>TokenId: ${propertyId}<br>
                <strong>${property.name}</strong><br>
                Description: ${property.description}<br>
                Price: ${price} ETH<br>
                <small>Owner: ${property.owner}</small><br>
                For Sale: ${property.forSale ? 'Yes' : 'No'}
                <br><br>
                `;
            }


            auctionsButton = document.createElement('button');
            auctionsButton.innerText = 'Start Auction'

            auctionsButton.addEventListener('click', async () => {
              try{
                
                console.log("^"+propertyId)
                let tx = await contract.startAuction(propertyId);
                tx.wait();

              } catch(error) {
                console.error(error);
                alert('error while starting auction');
              } 
            })

            biddButton = document.createElement('button');
            biddButton.innerText = "Bid"

            biddButton.addEventListener('click', async () => {
              try {
                const name = prompt('Enter the name:');
                biddButton.setAttribute('data-name', name);

                const bid = prompt('Enter the biding price:');
                biddButton.setAttribute('data-price', bid);
              
                const options = {
                    value: bid,
                    gasLimit: 300000
                };
        
                let tx = await contract.connect(provider.getSigner()).placeBid(propertyId, name, options);
                await tx.wait()
                
                await getPropertyList();
        
                alert('Property bidding successfully done')
                } catch(error) {
                    console.error(error);
                    alert('error while bidding');
                } 
            })

            auctioneButton = document.createElement('button');
            auctioneButton.innerText = 'End Auction'

            auctioneButton.addEventListener('click', async () => {
              try{

                let tx = await contract.endAuction(propertyId);
                tx.wait();


              } catch(error) {
                console.error(error);
                alert('error while ending auction');
              } 
            })

            br = document.createElement('br');

            verifyButton = document.createElement('button');
            verifyButton.innerText = 'Verify';
            verifyButton.setAttribute('data-propertyid', propertyId);

            verifyButton.addEventListener('click', async () => {
              try {
                
                    let tx = await contract.verifyProperty(propertyId);
                    await tx.wait()
                    
                    tx = await contract.propertyVerificationStatus(propertyId)
                    console.log(tx)

                    await getPropertynow();
            
                    alert('Property verified successfully')
                    } catch(error) {
                        console.error(error);
                        alert('error while verifying');
                    }    
            })


            
              
              listItem.appendChild(verifyButton);
              listItem.appendChild(br);
              listItem.appendChild(auctionsButton);
              listItem.appendChild(auctioneButton);
              // listItem.appendChild(br);
              listItem.appendChild(biddButton);
              // listItem.appendChild(br);
              propertyList.appendChild(listItem);


            prevowner = property.name;
            
            

        }
    }

    






}



//##########################################################################################################################################


//listing your properties in display when clickin the button

// const showFormButton = document.getElementById('showFormButton');
//     const createPropertyForm = document.getElementById('box');

//     showFormButton.addEventListener('click', function() {
//         createPropertyForm.classList.toggle('hidden');
//     });

//

let powner;

let isPropertiesVisible = false;

const button = document.getElementById('getownedProperty');
const yp = document.getElementById('yourPropertiesSection')
button.addEventListener('click', async function() {
  
    isPropertiesVisible = !isPropertiesVisible;
    if(isPropertiesVisible)
    {
      yp.style.display = 'block'
      button.textContent = 'Hide Your Properties'
    }
    else
    {
      yp.style.display = 'none'
      button.textContent = 'Your Properties'
    }

    const propertyList = document.getElementById('ownedProperty');
    propertyList.innerHTML = '';

    // button.style.display = 'none'
    let ownedproperties;

    console.log(account)
    var flag = false;
    const totalproperties = await contract.totalSupply();
    
    for(let i=0; i< totalproperties; i++)
    {
        const chk = await contract.ownerOf(i);
        console.log("....."+chk)
        if(chk === account)
        {
          
          console.log('hi111')
          flag = true;
          const propertyId = await contract.tokenByIndex(i);
          const property = await contract.getProperty(propertyId);
          
          powner = await contract.propertyToSeller(propertyId);
          console.log("#"+powner)

          console.log(property)
  
  
              const listItem = document.createElement('li');
              listItem.innerHTML = `
              
              <strong>
              <img src=${property.imageurl} /><br>
              <strong>TokenId: ${propertyId}</strong><br>
              <strong>${property.name}</strong><br>
              Description: ${property.description}<br>
              Price: ${property.price} ETH<br>
              <small>Previous Owner: ${powner}<br>
              Owner: ${property.owner}<br></small>
              For Sale: ${property.forSale ? 'Yes' : 'No'}
              <br><br>
              </strong>`;

            sellButton = document.createElement('button');   //jaise hi property create ho rhi hai uske corresponding buy property button create ho jaegi
            sellButton.innerText = 'Sell';
            sellButton.setAttribute('data-propertyid', propertyId);

            prevowner = property.name;
            sellButton.addEventListener('click', async () => {
            // await buyPropertynow(propertyId, property.price);
            try {
                const sellprice = prompt('Enter the Price:');
                sellButton.setAttribute('data-price', sellprice);
        
                const options = {
                    value: sellprice,
                    gasLimit: 300000,
                };
        
                let tx = await contract.connect(provider.getSigner()).listPropertyForSale(propertyId, sellprice)
                await tx.wait()
                
                await getPropertyList();
        
                alert('Property Listed successfully')
                } catch(error) {
                    console.error(error);
                    alert('error while Listing');
                }    
          })
            
            listItem.appendChild(sellButton);
            propertyList.appendChild(listItem);
        }
        
    }

    if(!flag)
    {
      // const myDiv = document.getElementById('yourPropertiesSection');
      // myDiv.textContent = 'No Properties yet !!';

      const myDiv = document.getElementById('yourPropertiesSection');

      const h2Element = document.createElement('h2');
      h2Element.textContent = 'Heading 2';

      h2Element.style.color = 'red';
      myDiv.appendChild(h2Element);


    }


});



getPropertyList()