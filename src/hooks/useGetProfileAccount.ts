
import { useEffect, useState, useReducer, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { loadWeb3, loadBlockchainData, useCreateTokenContract } from 'hooks/useSpwContract'
import { setAccountToState } from 'state/application/actions'
import Misc from 'helpers/Misc'
import useInterval from 'hooks/useInterval'
import { BASE_TOKEN } from 'constants/index'

export default function useLoadProfileAccount() {
  const dispatch = useDispatch()

  const [, forceUpdate] = useReducer((x) => x + 1, 0)
  const [web3IsActive, setWeb3IsActive] = useState<boolean>(false)

  const contractBep20 = useCreateTokenContract(BASE_TOKEN.address)

  const getProfileAccont = useCallback(async () => {
    if (!contractBep20?.methods) {
      forceUpdate() 
      await Misc.sleep(1000); 
    }

    if (contractBep20) {
      let resultAccount
      const resultToken = {}
      try {
        resultAccount = await loadBlockchainData(byAccount)
        if (contractBep20) {
          await Promise.all([
            contractBep20.methods.balanceOf(byAccount).call(),
            contractBep20.methods.symbol().call(),
            contractBep20.methods.name().call(),
            contractBep20.methods.decimals().call(),
          ]).then(([balance, symbol, name, decimals]) => {
            resultToken[contractBep20._address] = {
              balance: balance / +`1e${decimals}`,
              symbol,
              name,
              decimals,
              address: contractBep20._address
            }
          })
        }
        dispatch(
          setAccountToState({
            ...resultAccount, 
            mainToken: { ...(resultToken?.[BASE_TOKEN.address] || {}) },
            assets: resultToken
          })
        )
      } catch (e) {
        console.error('E0001', e) 
      }
    }
  }, [byAccount, contractBep20, dispatch])

  const connectionWeb3 = useCallback(async () => {
    const isWalletAvailable = loadWeb3()
    if(!isWalletAvailable) {
      forceUpdate()
      await Misc.sleep(1000);
    } else {
      setWeb3IsActive(true);
    }
  }, []) 
  useEffect(() => {
    if(!web3IsActive) {
      connectionWeb3()
    } else {
      getProfileAccont()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionWeb3, web3IsActive])
  
  useInterval(async () => {
    if(web3IsActive) {
      getProfileAccont()
    }
  }, 2000)
}
