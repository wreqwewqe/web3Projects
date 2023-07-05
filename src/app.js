// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { ethers } from 'ethers';
//监听账户
window.ethereum.on('accountsChanged', handleAccountsChanged);
async function handleAccountsChanged(accounts) {
  window.location.reload();
}
//监听链id
window.ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise.
  console.log('chainid', chainId);
  window.location.reload();
}

export async function getInitialState() {
  const currentUser = await window.ethereum.request({ method: 'eth_accounts' });
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  console.log('currentUser', currentUser, chainId);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { name: '@umijs/max', signer, currentUser, chainId };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
