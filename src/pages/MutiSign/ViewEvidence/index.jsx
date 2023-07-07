import React,{useRef,useState} from 'react'
import {Input,Button,Modal,Form,message,Select} from "antd"
import styles from "./index.less"
import {useModel} from "umi"
import {ethers} from "ethers"
import {mutiSignAddress,mutiSignAbi} from "@/contract/mutiSign.js"

export default function ViewEvidence() {
    const [form]=Form.useForm();
    const [open,setOpen]=useState(false);
    const { initialState, loading, error, refresh, setInitialState } =
     useModel('@@initialState');
    
   let contract = new ethers.Contract(mutiSignAddress, mutiSignAbi, initialState.signer);
    const ipt=useRef();
    const find=async()=>{
        if(ipt.current.input.value){
            try {
                const res=await contract.getInfo(ipt.current.input.value);
                setOpen(true)
                console.log("res",res);
                // console.log("finish",res[0])
              
                console.log("sssssss",res[1])
                console.log("singers",res[2])
                let signedList=[];
                let signers=[];
                for(let i=0;i<res[1].length;i++){
                    signedList.push(res.signed[i]);
                }
                
                for(let i=0;i<res[2].length;i++){
                    signers.push(res[2][i]);
                }
                console.log("signedList",signedList)
                console.log("singers",signers);

                form.setFieldsValue({
                    finished:res[0],
                    signed:signedList,
                    signers

                })
                
            } catch (error) {
                message.error("存证不存在");
                setOpen(false)
                
            }
        }else{
            message.error("请输入要查询的签证名称")

        }
     
    }
  return (
    <div className={styles.containers}>
        <h2>根据存证名称,查找存证</h2>
        <Input ref={ipt} className={styles.ipt} placeholder='输入存证名称'/> 
        <Button type="primary" onClick={find}>查找</Button>
        <Modal
            open={open}
            title="存证详情"

            cancelText="取消"
            footer={false}
            onCancel={()=>{
                setOpen(false)
            }}
         
            >
            <Form
                form={form}
                layout="vertical"
                name="需要签名的列表"
                initialValues={{
                modifier: 'public',
                }}
            >
                <Form.Item name="finished"
                label="是否签名完成">
                    <Select
                        style={{
                            width: 120,
                        }}
                        disabled
                        options={[
                            {
                                value: true,
                                label: "是",
                            },
                            {
                                value: false,
                                label: '否',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="signed"
                    label="已经签名的地址"
                    rules={[
                        {
                        required: true,
                        message: 'Please input the title of collection!',
                        },
                    ]}
                >
                 <Input type="textarea"/>
                </Form.Item>
                <Form.Item name="signers" label="需要签名的地址">
                  <Input type="textarea" />
                </Form.Item>
        
            </Form>
        </Modal>
    </div>
  )
}
