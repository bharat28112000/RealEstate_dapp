//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address public nftAddress;
    address payable public seller;
    address public inspector;
    address public lender;

    modifier onlySeller() {
    require(msg.sender == seller , "only seller can list his property");
    _;
    }

    modifier onlyBuyer(uint256 _nftID) {
        require(msg.sender == buyer[_nftID], "only buyer can lend the property");
        _;
    }

    modifier onlyInspector() {
        require(msg.sender == inspector, "only inspector can check the property dispute");
        _;
    }

    mapping(uint256 => bool) public isListed;
    mapping(uint256 => uint256) public purchasePrice;
    mapping(uint256 => uint256) public escrowAmount;
    mapping(uint256 => address) public buyer;
    mapping(uint256 => bool) public inspectionPassed;
    mapping(uint256 => mapping(address => bool)) public approval;

    constructor(address _nftaddress, address payable _seller, address _inspector, address _lender) {
        nftAddress = _nftaddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    //list() function whi call karega joh apni property list krna chahta hai
    // i.e. escrow ko dena
    // modifier isliye because instead of seller koyi or uski property list na 
    // kr ske

    function list(uint256 _nftID, address _buyer, uint256 _purchasePrice, uint256 _escrowAmount) public payable onlySeller {
    
        // yeh seller ki nft to contract ke pass bhej dega

        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        purchasePrice[_nftID] = _purchasePrice;
        escrowAmount[_nftID] = _escrowAmount;
        buyer[_nftID] = _buyer;
    }

    function depositmoney(uint _nftID) public payable onlyBuyer(_nftID) {
        require(msg.value >= escrowAmount[_nftID]);
    }

    function updateInspectionStatus(uint256 _nftID, bool _passed) public onlyInspector { 
        inspectionPassed[_nftID] = _passed;
    }

    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }
    
    function cancelSale(uint256 _nftID) public {
        if(inspectionPassed[_nftID] == false)
            payable(buyer[_nftID]).transfer(address(this).balance);
        else {
            payable(seller).transfer(address(this).balance);
        }
    }

    // yeh function smart contract ko ether receive krne mein help karega
    receive() external payable{}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function finalizeSale(uint256 _nftID) public {
        require(inspectionPassed[_nftID]);
        require(approval[_nftID][buyer[_nftID]]);
        require(approval[_nftID][seller]);
        require(approval[_nftID][lender]);
        require(address(this).balance >= purchasePrice[_nftID]);

        isListed[_nftID] = false;

    // what it will do is yeh contract mein jinta bhi balance hai use 
    // seller ke wallet mein daal dega    

    (bool success, ) = payable(seller).call{value: address(this).balance}("");
    require(success);

    IERC721(nftAddress).transferFrom(address(this), buyer[_nftID], _nftID);

    }

     

}