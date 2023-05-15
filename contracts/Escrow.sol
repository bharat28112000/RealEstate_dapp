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

    mapping(uint => bool) public isListed;

    constructor(address _nftaddress, address payable _seller, address _inspector, address _lender) {
        nftAddress = _nftaddress;
        seller = _seller;
        inspector = _inspector;
        lender = _lender;
    }

    //list() function whi call karega joh apni property list krna chahta hai
    // i.e. escrow ko dena

    function list(uint256 _nftID) public {
        IERC721(nftAddress).transferFrom(msg.sender, address(this), _nftID);

        isListed[_nftID] = true;
        
    }

}