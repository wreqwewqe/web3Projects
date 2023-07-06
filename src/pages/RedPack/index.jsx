import React,{useState} from 'react'
import {Input,Form,Button,Select,Modal,Spin,message} from "antd"
import {redpackAddress,redpackAbi} from "@/contract/redpack.js";
import {useModel} from "umi"
import {parseEther,formatEther,ethers} from 'ethers'
import styles from "./index.less"
export default function RedPack() {
    const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
     let contract = new ethers.Contract(redpackAddress, redpackAbi, initialState.signer);
    const [detailSpin,setDetailSpin]=useState(false);
    const [open,setOpen]=useState(false);
    const [form]=Form.useForm();
    const [detailOpen,setDetailOpen]=useState(false)
    const [detailForm]=Form.useForm();
    const bot=async ()=>{
       
       const tx= await contract.rob();
        console.log("tx",tx);
       const res=await tx.wait();
        console.log("res",res);
        message.success("抢红包成功")

    }
    const getInfo=async ()=>{

    }
    const getDetail=async()=>{
        setDetailOpen(true)
        const res=await contract.getInfo();
        detailForm.setFieldsValue({
            "balance":formatEther(res[0]),
            "amount":res[1],
            "average":res[2],
            "process":res[3]
        })
        console.log("红包详情",res);

    }
  return (
    <div>
        
         <Modal
            open={open}
            title="发送红包"
            okText="确定"
            cancelText="取消"
            onCancel={()=>{
                setOpen(false);
            }}
            onOk={() => {
                console.log("z")
                form
                .validateFields()
                .then(async (values) => {
                    setDetailSpin(true);
                    console.log("values",values);
                    const tx=await contract.send(values.amount,values.average,{value:parseEther(values.count)})
                    console.log("tx",tx);
                    const res=await tx.wait();
                    console.log("res",res);
                    setOpen(false);
                    setDetailSpin(false);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info.revert);
                    setOpen(false);
                    setDetailSpin(false);
                    message.error(info.revert.args[0]);
                });
            }}
            >
                <div className={styles.detailSpin}>
                    <Spin spinning={detailSpin} size="large"></Spin>
                </div>
            <Form
                name="basic"
                form={form}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={()=>{

                }}
                onFinishFailed={()=>{}}
                autoComplete="off"
            >
                <Form.Item
                    label="红包金额"
                    name="count"
                    rules={[
                        {
                        required: true,
                        message: '请输入红包金额!',
                        },
                    ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                    label="红包数量"
                    name="amount"
                    rules={[
                        {
                        required: true,
                        message: '请输入红包数量!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                label="是否平均分配"
                name="average"
                rules={[
                    {
                    required: true,
                    message: '请选择是否平均分配!',
                    },
                ]}>
                <Select
                
                    style={{
                        width: 120,
                    }}
                    options={[
                        {
                            value: true,
                            label: '平均',
                        },
                        {
                            value: false,
                            label: '随机',
                        }
                    ]}
                    />
                </Form.Item>

            </Form>
        </Modal>
        <div className={styles.section}>
            <Button  onClick={()=>{
                setOpen(true)
            }} type="primary">我是土豪,我要发红包</Button>
        </div>
       
        <div className={styles.section}> 
            <Button type="primary" onClick={bot}>我是屌丝,我要抢红包</Button>
        </div>
     
        <Modal
            open={detailOpen}
            title="红包详情"
            cancelText="取消"
            onCancel={()=>{
                setDetailOpen(false);
            }}
            >
           

            <Form
                name="basic"
                form={detailForm}
               
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                marginTop:"2rem"
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={()=>{

                }}
                onFinishFailed={()=>{}}
                autoComplete="off"
            >
                <Form.Item
                    label="红包余额"
                    name="balance"
                >
                <Input />
                </Form.Item>

                <Form.Item
                    label="红包剩余数量"
                    name="amount"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="红包分配方式"
                    name="average"
                
                >
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: true,
                                label: '平均',
                            },
                            {
                                value: false,
                                label: '随机',
                            }
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="红包进行中"
                    name="process"
                >
                    <Select
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: true,
                                label: '是',
                            },
                            {
                                value: false,
                                label: '否',
                            }
                        ]}
                    />
                </Form.Item>

            </Form>
        </Modal>
        <div className={styles.section}><Button onClick={getDetail} type='primary'>红包详情</Button></div>
    </div>
  )
}
