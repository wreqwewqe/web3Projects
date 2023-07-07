import React,{useState} from 'react'
import {useModel} from "umi"
import {Button,Modal,Form,Input, message} from "antd"
import {ethers} from "ethers"
import {mutiSignAddress,mutiSignAbi} from "@/contract/mutiSign.js"
export default function CreateEvidence() {
  const [open,setOpen]=useState(false);
  const [form]=Form.useForm();
  const { initialState, loading, error, refresh, setInitialState } =
  useModel('@@initialState');
   let contract = new ethers.Contract(mutiSignAddress, mutiSignAbi, initialState.signer);
  return (
    <div>
    <Button
      type="primary"
      onClick={() => {
        setOpen(true);
      }}
    >
     创建存证合约
    </Button>
    <Modal
      open={open}
      title="创建存证合约"
      okText="确定"
      cancelText="取消"
      onCancel={()=>{setOpen(false)}}
      onOk={() => {
          form
          .validateFields()
          .then(async(values) => {
              console.log("values",values);
              console.log("values.spli",values.singers.split(","))
              const tx=await contract.createEvidence(values.evidenceName,values.content,values.singers.split(","));
              console.log("tx",tx);
              const res=await tx.wait();
              console.log("res",res);
              message.success("创建成功");
              setOpen(false);
          })
          .catch((info) => {
            //   console.log('Validate Failed:', info.revert.args[0]);
              message.error(info);
              setOpen(false);
          });
      }}
      >
      <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
          modifier: 'public',
          }}
      >
          <Form.Item
            name="evidenceName"
            label="存证名字"
            rules={[
                {
                required: true,
                message: 'Please input the title of collection!',
                },
            ]}
          >
          <Input />
          </Form.Item >
          <Form.Item name="content"  label="存证内容"   rules={[
                {
                required: true,
                message: 'Please input the title of collection!',
                },
            ]}>
          <Input type="textarea" />
          </Form.Item>
          <Form.Item name="singers" label="需要签名的地址(如果有多个,用逗号分开)"   rules={[
                {
                required: true,
                message: 'Please input the title of collection!',
                },
            ]}>
            <Input type="textarea" />
          </Form.Item>
      </Form>
  </Modal>
  </div>
  )
}
