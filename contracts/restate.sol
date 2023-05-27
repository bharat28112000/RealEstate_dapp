// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract RealEstateMarketplace is ERC721Enumerable {
    struct Property {
        string name;
        string description;
        uint256 price;
        bool forSale;
        string imageurl;
        bool verified;
    }

    Property[] public properties;
    address public admin;

    mapping(uint256 => address) public propertyToOwner;
    mapping(uint256 => address) public propertyToSeller;
    mapping(uint256 => bool) public propertyVerificationStatus;


    constructor() ERC721("RealEstateNFT", "RE") {
        admin = msg.sender;
    }

    modifier onlyVerifier() {
    require(msg.sender == admin, "Only the verifier can perform this action");
    _;
}

    function createProperty(
        string memory _name,
        string memory _description,
        uint256 _price,
        string memory _imageurl
    ) external {
        uint256 propertyId = properties.length;
        properties.push(Property(_name, _description, _price, true, _imageurl, false));
        _safeMint(msg.sender, propertyId);
        propertyToOwner[propertyId] = msg.sender;
        propertyToSeller[propertyId] = msg.sender;
    }

    function getProperty(uint256 _propertyId)
        external
        view
        returns (
            string memory name,
            string memory description,
            uint256 price,
            address owner,
            bool forSale,
            string memory imageurl,
            bool verified
        )
    {
        require(_exists(_propertyId), "Property does not exist");
        Property storage property = properties[_propertyId];
        return (
            property.name,
            property.description,
            property.price,
            propertyToOwner[_propertyId],
            property.forSale,
            property.imageurl,
            property.verified
        );
    }

    function verifyProperty(uint256 _propertyId) external onlyVerifier {
    require(_exists(_propertyId), "Property does not exist");
    properties[_propertyId].verified = true; // Set verified status to true after successful verification
    }

    function buyProperty(uint256 _propertyId, string memory name) external payable {
        require(_exists(_propertyId), "Property does not exist");
        Property storage property = properties[_propertyId];
        require(property.forSale, "Property is not for sale");
        require(msg.value == property.price, "Incorrect payment amount");

        address propertyOwner = ownerOf(_propertyId);
        address payable seller = payable(propertyOwner);
        seller.transfer(msg.value);
        _transfer(propertyOwner, msg.sender, _propertyId);
        property.name = name;
        propertyToOwner[_propertyId] = msg.sender;
        propertyToSeller[_propertyId] = propertyOwner;
        property.forSale = false;
    }

    function listPropertyForSale(uint256 _propertyId, uint256 _price) external {
        require(_exists(_propertyId), "Property does not exist");
        require(ownerOf(_propertyId) == msg.sender, "Not the property owner");
        Property storage property = properties[_propertyId];
        propertyToSeller[_propertyId] = msg.sender;
        property.price = _price;
        property.forSale = true;
        property.verified = false;
    }

    function sellProperty(uint256 _propertyId, uint256 _price) external {
        require(_exists(_propertyId), "Property does not exist");
        require(ownerOf(_propertyId) == msg.sender, "Not the property owner");
        Property storage property = properties[_propertyId];
        property.price = _price;
        property.forSale = true;
        propertyToSeller[_propertyId] = msg.sender;
    }

    function getPropertySeller(uint256 _propertyId) external view returns (address) {
        require(_exists(_propertyId), "Property does not exist");
        return propertyToSeller[_propertyId];
    }
}
