export const redpackAddress="0x6D2Ad50711de25CA81418C7E70F08C4a9C045b48"
export const redpackAbi=[
	{
		"inputs": [],
		"name": "rob",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_average",
				"type": "bool"
			}
		],
		"name": "send",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "Send",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "average",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "process",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.8.2 <0.9.0;


// contract RedPack{
//     //红包是否进行
//     bool public process;
//     //红包数量
//     uint public amount;
//     //是否均值
//     bool public average;

//     event Send(bool,bytes);
//     //发红包
//     function send(uint _amount,bool _average)public payable {
//         require(process==false,"redpack is ribbing");
//         require(msg.value>0,"your redpack is blank");
//         process=true;
//         average=_average;
//         amount=_amount;
//     }

//     //抢红包
//     function rob()public payable  {
//         require(process==true,"no redpack");
//         if(amount==1){
//             (bool sent, bytes memory data) =msg.sender.call{value:address(this).balance}("");
//             emit Send(sent,data);
//             process=false;
//         }else{
//             if(average){
//                 //等值红包
//                 (bool sent, bytes memory data) =msg.sender.call{value:address(this).balance/amount}("");
//                 emit Send(sent,data);
//             }else{
//                 // unit256 a=uint256(abi.encode(msg.sender,block.timestamp));
//                 uint256 num=0;
//                 while(num==0){
//                     num=uint256(keccak256(abi.encodePacked(block.timestamp,msg.sender)))%10;
//                 }
//                 (bool sent, bytes memory data) =msg.sender.call{value:address(this).balance*num/10}("");
//                 emit Send(sent,data);

//             }
//         }
//         //红包数量减1
//         amount-=1;
//     }

//     //红包详情
//     //红包余额,红包数量,红包分配方式,抢红包是否进行中
//     function getInfo()public view returns(uint ,uint ,bool ,bool){
//         return (address(this).balance,amount,average,process);
//     }
// }