// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error SBGNonTransferrable();

contract SoulboundGrade is ERC721, ERC721URIStorage, Ownable {
    constructor() ERC721("Soulbound Grade", "SBG") Ownable(msg.sender) {}

    /**
     * @notice mint the NFT with the grade data to the student
     * @param to student address
     * @param tokenId student id
     * @param uri grade data base64 encoded
     */
    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev override _update to prevent transfers
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        if (_ownerOf(tokenId) != address(0)) {
            revert SBGNonTransferrable();
        }

        return super._update(to, tokenId, auth);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
