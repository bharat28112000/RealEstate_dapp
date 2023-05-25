// connnecting to metamask

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();
console.log(signer)



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

const contractaddress = "0x4C90070c715EE81f8614f41FB5f38EeFAD0A1084";
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
  }
];

const contract = new ethers.Contract(contractaddress, abi, signer);
console.log(contract)

document.getElementById('createPropertyForm').addEventListener('submit' , async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    try {
        const tx = await contract.createProperty(name, description, price);
        await tx.wait();

        await getPropertyList();

        document.getElementById('createPropertyForm').reset();

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
    // console.log("b"+totalproperties)
    
    for(let i=0; i< totalproperties; i++)
    {
        const propertyId = await contract.tokenByIndex(i);
        const property = await contract.getProperty(propertyId);
        // console.log('a'+property.price)
        

        if(property.forSale) {
            const listItem = document.createElement('li');

            if(price == null)
            {
                listItem.innerHTML = `
                <strong>TokenId: ${propertyId}<br>
                <strong>${property.name}</strong><br>
                Description: ${property.description}<br>
                Price: ${property.price} ETH<br>
                Owner: ${property.owner}<br>
                For Sale: ${property.forSale ? 'Yes' : 'No'}
                `;
            }
            else
            {
                
                listItem.innerHTML = `
                <strong>TokenId: ${propertyId}<br>
                <strong>${property.name}</strong><br>
                Description: ${property.description}<br>
                Price: ${price} ETH<br>
                Owner: ${property.owner}<br>
                For Sale: ${property.forSale ? 'Yes' : 'No'}
                `;
            }


            buyButton = document.createElement('button');   //jaise hi property create ho rhi hai uske corresponding buy property button create ho jaegi
            buyButton.innerText = 'Buy';
            buyButton.setAttribute('data-propertyid', propertyId);
            // prevowner = await contract.propertytoSeller(propertyId);


            prevowner = property.name;
            buyButton.addEventListener('click', async () => {
            // await buyPropertynow(propertyId, property.price);
            try {
                const name = prompt('Enter the name:');
                buyButton.setAttribute('data-name', name);
        
                const options = {
                    value: property.price,
                    gasLimit: 300000,
                };
        
                let tx = await contract.connect(provider.getSigner()).buyProperty(propertyId, name, options);
                await tx.wait()
                
                await getPropertyList();
        
                alert('Property purchased successfully')
                } catch(error) {
                    console.error(error);
                    alert('error while purchasing');
                }    
          })
            
            listItem.appendChild(buyButton);
            propertyList.appendChild(listItem);

        }
    }
}



//##########################################################################################################################################



//

const button = document.getElementById('getownedProperty');
button.addEventListener('click', async function() {
  
    const propertyList = document.getElementById('ownedProperty');
    propertyList.innerHTML = '';

    button.style.display = 'none'
    let ownedproperties;

    console.log(account)

    const totalproperties = await contract.totalSupply();
    
    for(let i=0; i< totalproperties; i++)
    {
        const chk = await contract.ownerOf(i);
        console.log(chk)
        if(chk === account)
        {
          console.log('hi')
          const propertyId = await contract.tokenByIndex(i);
          // const tokenID = await contract.tokenByIndex(propertyId);
          const property = await contract.getProperty(propertyId);
          // prevowner = await contract.propertytoSeller(propertyId)
          
          console.log(prevowner)
        

          console.log(property)
  
  
              const listItem = document.createElement('li');
              listItem.innerHTML = `
              <strong>TokenId: ${propertyId}</strong><br>
              <strong>${property.name}</strong><br>
              Description: ${property.description}<br>
              Price: ${property.price} ETH<br>
              Previous Owner: ${prevowner}<br>
              Owner: ${property.owner}<br>
              For Sale: ${property.forSale ? 'Yes' : 'No'}
              `;

            if(property.forSale)
            {

            }
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


              propertyList.appendChild(listItem);
        }
        
    }

});



getPropertyList()