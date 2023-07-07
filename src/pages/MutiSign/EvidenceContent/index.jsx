import React,{useState,useRef} from 'react'
import {useModel} from "umi"
import {mutiSignAddress,mutiSignAbi} from "@/contract/mutiSign.js"
import {ethers} from "ethers"
import {Button,Modal,Form,Input,message} from "antd"
export default function EvidenceContent() {
    const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
    const [open,setOpen]=useState(false);
    const [form]=Form.useForm();
    const ipt=useRef();
    let contract = new ethers.Contract(mutiSignAddress, mutiSignAbi, initialState.signer);
    const getContent=async ()=>{
        try{
            const tx=await contract.getContent(ipt.current.input.value);
            setOpen(true);
            console.log("tx",tx);
            form.setFieldsValue({
                content:tx
            })
        }catch(err){
            // console.log("ipt",ipt.current.input.value)
            console.log("eee",err.revert.args[0]);
            message.error(err.revert.args[0])
            setOpen(false);
        }
       
    }
  return (
    <div style={{marginTop:"3rem"}}>
        <h2>输入存证名称,查看存证的秘密</h2>
        <Input ref={ipt} style={{width:"20rem"}}></Input>
        <Button type="primary" onClick={getContent}>查看</Button>
        <Modal
            open={open}
            title="存证"

            cancelText="取消"
            footer={false}
            onCancel={()=>{
                setOpen(false)
            }}
         
            >
            <Form
                form={form}
                layout="vertical"
              
                initialValues={{
                modifier: 'public',
                }}
            >
                <Form.Item name="content" label="存证签名的内容">
                  <Input type="textarea" />
                </Form.Item>
        
            </Form>
        </Modal>
     </div>
  )
}
