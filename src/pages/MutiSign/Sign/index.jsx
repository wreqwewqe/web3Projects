import React,{useState,useRef} from 'react'
import {useModel} from "umi"
import {mutiSignAddress,mutiSignAbi} from "@/contract/mutiSign.js"
import {ethers} from "ethers"
import {Button,Modal,Form,Input,message} from "antd"
export default function Sign() {
    const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
    const ipt=useRef();
    let contract = new ethers.Contract(mutiSignAddress, mutiSignAbi, initialState.signer);
    const Sign=async ()=>{
        try{
            console.log("ipt.current.input.value",ipt.current.input.value);
            const tx=await contract.sign(ipt.current.input.value);
     
            console.log("tx",tx);
        }catch(err){
            console.log("eee",err);
            if(err.revert){
                message.error(err.revert.args[0])
            }else[
                message.error("签名出错")
            ]
           

        }
       
    }
  return (
    <div style={{marginTop:"3rem"}}>
        <h2>输入存证名称,对存证进行签名</h2>
        <Input ref={ipt} style={{width:"20rem"}}></Input>
        <Button type="primary" onClick={Sign}>签名</Button>
    
     </div>
  )
}
