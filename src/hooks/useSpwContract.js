import Web3 from 'web3'
import { useMemo } from 'react'
import { STAKING_SMART_CONTRACT, STAKING_TOKEN_CONTRACT } from '../constants'
import STAKING_CONTRACT_ABI from '../constants/abis/staking_contract_abi.json'
import STAKING_TOKEN_CONTRACT_ABI from '../constants/abis/bep20_staking_abi.json'

export async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    // await window.ethereum.enable()
    return true
  }

  if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
    return true
  }

  if (window.BinanceChain) {
    window.web3 = new Web3(window.BinanceChain)
    return true
  }
  // else {
  //   window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  // }
  return null
}

export async function loadBlockchainData(account) {
  const { web3 } = window

  const decimals = 18

  // ETH Balance
  const ethBalance = await web3.eth.getBalance(account) / +`1e${decimals}`

  // Token Balance
  const networkId = await web3.eth.net.getId()

  return {
    address: account,
    balance: ethBalance,
    decimals,
    chainId: networkId,
  }
}

// returns null on errors
function useContract(address, ABI) {
  const { web3 } = window

  return useMemo(() => {
    if (!web3?.eth || !address || !ABI) return null

    try {
      return new web3.eth.Contract(ABI, address)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [web3, address, ABI])
}

// New
export function useStakingContract() {
  return useContract(STAKING_SMART_CONTRACT, STAKING_CONTRACT_ABI)
}
export function useStakingTokenContract() {
  return useContract(STAKING_TOKEN_CONTRACT, STAKING_TOKEN_CONTRACT_ABI)
}
