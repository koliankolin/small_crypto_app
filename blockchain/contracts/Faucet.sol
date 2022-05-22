// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";
import "./IFaucet.sol";

contract Faucet is Ownable, IFaucet {
    uint totalFunders;
    mapping(uint => address) lutFunders;
    mapping(address => uint) funders;

    receive() external payable {  }

    modifier limit(uint amount) {
        require(amount < 100000000000000000, "Amount must be lower than 0.1 eth");
        _;
    }

    function addFunds() override external payable {
        if (funders[msg.sender] == 0) {
            lutFunders[totalFunders] = msg.sender;
            totalFunders++;
        }
        funders[msg.sender] += msg.value;
    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funders = new address[](totalFunders);

        for (uint i = 0; i < totalFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function withdraw(uint amount) override external onlyOwner limit(amount) {
        payable(msg.sender).transfer(amount);
    }
}

// 0x00000000000000000000000000000000000000000000000000000000f8a8fd6d
// 00000000000000000000000000000000