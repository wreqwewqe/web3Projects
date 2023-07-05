import { bankAbi, bankAddress } from '@/contract/bank.js';
import { Button, Form, Input, message } from 'antd';
import { ethers, formatEther, parseEther } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

export default function Bank() {
  console.log('eeee', parseEther('1'));
  console.log('我改变了重新刷新了');
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  let contract = new ethers.Contract(bankAddress, bankAbi, initialState.signer);
  useEffect(() => {
    if (initialState.chainId !== '0x5') {
      message.error('请切换到goerli网络');
    }
  }, []);

  // console.log(window.ethereum)
  const [contractBalance, setContractBalance] = useState('');
  //存款
  const [amount, setAmount] = useState('');

  const [addressBalance, setAddressBalance] = useState('');
  const depositIpt = useRef();
  const addressIpt = useRef();
  const withdrawIpt = useRef();
  const [form] = Form.useForm();

  const getContractBalances = async () => {
    const res = await contract.getBalance();
    console.log('res', res);
    console.log('res.target', res[0], typeof res[0]);
    setContractBalance(formatEther(res[0]));
    setAmount(formatEther(res[1]));
    // setAmount("yyy");
  };

  const deposit = async () => {
    console.log('deposit', parseEther(depositIpt.current.input.value));
    const rx = await contract.deposit(
      parseEther(depositIpt.current.input.value),
      {
        value: parseEther(depositIpt.current.input.value),
      },
    );
    console.log('rx', rx);
    const r = await rx.wait();
    console.log('r', r);
  };

  const getOneBalance = async () => {
    const tx = await contract.getUserBalance(addressIpt.current.input.value);

    setAddressBalance(formatEther(tx));
    console.log('tx', tx);
  };

  const withdraw = async () => {
    console.log(
      'parseEther(withdrawIpt.current.input.value)',
      parseEther(withdrawIpt.current.input.value),
    );
    const tx = await contract.withdraw(
      parseEther(withdrawIpt.current.input.value),
    );
    const r = await tx.wait();
    console.log('提', r);
  };
  //转账
  const onFinish = async (v) => {
    console.log('vv', v);
    const tx = await contract.transfer(v.to, parseEther(v.amount));
    const o = await tx.wait();
    console.log('o', o);
  };
  return (
    <div>
      <div className={styles.section}>
        <Button type="primary" onClick={getContractBalances}>
          查询合约和合约账本余额
        </Button>
        <br />
        <div>合约余额:{contractBalance + 'ether'}</div>
        <br />
        <div>合约账本余额:{amount + 'ether'}</div>
      </div>
      <div className={styles.section}>
        <h2>存款(ether)</h2>
        <Input
          placeholder="输入存款金额"
          ref={depositIpt}
          style={{ width: '25rem' }}
        ></Input>
        <Button onClick={deposit}>确定</Button>
      </div>
      <div className={styles.section}>
        <h2>查询余额(ether)</h2>
        <Input
          placeholder="输入地址查询余额"
          ref={addressIpt}
          style={{ width: '25rem' }}
        ></Input>
        <Button onClick={getOneBalance}>确定</Button>
        <div>账户余额:{addressBalance + 'ether'}</div>
      </div>
      <div className={styles.section}>
        <h2>提款(ether)</h2>
        <Input
          placeholder="输入提款金额"
          ref={withdrawIpt}
          style={{ width: '25rem' }}
        ></Input>
        <Button onClick={withdraw}>确定</Button>
      </div>
      <div className={styles.section}>
        <h2>转账(ether)</h2>
        <Form
          name="basic"
          // labelCol={{
          // 	span: 8,
          // }}
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
          onFinish={onFinish}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item
            label="收款账户地址"
            name="to"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="转账金额(ether)"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
