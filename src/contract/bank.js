
export const bankAddress = '0x3bA50D79452cc71a71DAC77fc9BD61a7DbB00Ae4';
export const bankAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'transferLog',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'a',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'b',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'getUserBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.8.2 <0.9.0;

// contract Back{
//     //用户 银行
//     //账本
//     uint totalAmount;
//     //用户
//     mapping(address=>uint) users;

//     event transferLog(bool,bytes);

//     modifier checkAmount(uint _amount){
//         require(_amount>0,"amount must bigger than 0");
//         _;
//     }

//     modifier checkBalance(){
//         _;
//         require(address(this).balance==totalAmount,"amount must equal with totalAmount");b 
//     }

//     function deposit(uint _amount)public payable checkBalance checkAmount(_amount){
//         require(_amount==msg.value,"amount must equal with msg.value");
//         users[msg.sender]+=_amount;
//         totalAmount+=_amount;
//     }

//     function withdraw(uint _amount)public payable checkBalance{
//         require(users[msg.sender]>=_amount,"balance not enough");
//         (bool sent, bytes memory data)=msg.sender.call{value:_amount}("");
//         users[msg.sender]-=_amount;
//         totalAmount-=_amount;
//         emit transferLog(sent,data);
//     }
//     //返回合约余额和账本余额
//     function getBalance()public view  returns(uint a,uint b){
//         return (address(this).balance,totalAmount);
//     }


//     function transfer(address _to,uint _amount)public{
//         require(users[msg.sender]>=_amount,"balance not enough");
//         users[msg.sender]-=_amount;
//         users[_to]+=_amount;
//     }

//     //查询用户余额
//     function getUserBalance(address _address)public view returns(uint){
//         return users[_address];
//     }
// }