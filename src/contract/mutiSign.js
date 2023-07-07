export const  mutiSignAddress="0x334876f486a69955652f67419a0efcdbe382922b"
export const  mutiSignAbi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "signers",
				"type": "address[]"
			}
		],
		"name": "createEvidence",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			}
		],
		"name": "getContent",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			}
		],
		"name": "getInfo",
		"outputs": [
			{
				"internalType": "bool",
				"name": "finished",
				"type": "bool"
			},
			{
				"internalType": "address[]",
				"name": "signed",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "singers",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			}
		],
		"name": "sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// SPDX-License-Identifier: GPL-3.0

// pragma solidity >=0.8.2 <0.9.0;


// contract Evidence{
//     //需要签名的列表
//     address[] signers;
//     //已经签名的列表
//     address[] signed;
//     //存的消息
//     string content;

//     //创建合约的时候,构造器
//     constructor(string memory _content,address[] memory _signers){
//         signers=_signers;
//         content=_content;
//     }
//     //是否可以签名
//     function canSign()public view returns(bool){
//         for(uint256 i=0;i<signers.length;i++){
//             if(tx.origin==signers[i]){
//                 return true;
//             }
//         }
//         return false;
//     }
    
//     //签名
//     function sign() public  returns(bool){
//         require(canSign(),"you have no permission");
//         //是否已经签名
//         for(uint256 i=0;i<signed.length;i++){
//             if(tx.origin==signed[i]){
//                 return true;
//             }
//         }
//         signed.push(tx.origin);
//         return true;
//     }

//     //验证是否所有已经完成签名
//     function isAllSigned()public view returns(bool){
//         if(signers.length==signed.length){
//             return true;
//         }
//         return false;
//     }
//     //获取存证状态信息(是否已经签名完成,已签列表,需签列表)
//     function getInfo()public view returns(bool,address[] memory,address[] memory){
//         return (isAllSigned(),signed,signers);
//     }

//     function getContent() public view returns(string memory){
//         require(isAllSigned(),"cant get content");
//         return content;
//     }
// }


// contract Factory{
//     mapping(string=>address) evidences;

//     //创建存证合约(存证的名字,签名内容,需签列表)
//     function createEvidence(string memory _key,string memory _content,address[] memory signers)public{
//         require(evidences[_key]==address(0),"this evidence have existed");
//         Evidence evidence=new Evidence(_content,signers);
//         evidences[_key]=address(evidence);
//     }
//     //给指定名字的存证进行签名
//     function sign(string memory _key)public {
//         require(evidences[_key]!=address(0),"no this evidence");
//         require(Evidence(evidences[_key]).canSign(),"you cant sign");
//         Evidence(evidences[_key]).sign();

//     }

//     //查询存证签名信息
//     function getInfo(string memory _key)public view returns(bool finished,address[] memory signed,address[] memory singers){
//         require(evidences[_key]!=address(0),"this evidence isn't exsit");
//         return Evidence(evidences[_key]).getInfo();
//     }

//     //获取存证信息
//     function getContent(string memory _key)public view returns(string memory){
//         require(evidences[_key]!=address(0),"this evidence isn't exsit");
//         return Evidence(evidences[_key]).getContent();
//     }
// }




