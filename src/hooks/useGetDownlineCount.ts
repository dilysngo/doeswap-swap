import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import { roundNumber } from 'helpers/CommonHelper'
import { SPW } from '../constants'

const useGetDownlinrCount = (contract: any) => {
  const { account } = useWeb3React()
  const [dataDownline, setDataDownline] = useState({
    listRefCount: {},
    listRefBonusCount: {},
  })

  const getUserDownlineCount = useCallback(() => {
    if (contract !== null && account) {
      try {
        Promise.all([
          contract.methods.getUserDownlineCount(account).call(),
          contract.methods.getUserDownlineRefBonus(account).call(),
        ]).then(([v1, v2]) => {
          setDataDownline({
            listRefCount: v1,
            listRefBonusCount: (() => {
              const data = Object.entries(v2)
              const result = data.map((ele: any) => {
                return roundNumber(new BigNumber(ele[1]).shiftedBy(-SPW?.decimals || -18).toNumber(), 5)
              })

              return { ...result }
            })(),
          })
        })
      } catch (error) {
        getUserDownlineCount()
        // eslint-disable-next-line no-console
        console.log('E0003', error)
      }
    }
  }, [account, contract])

  useEffect(() => {
    getUserDownlineCount()
  }, [getUserDownlineCount])

  return { dataDownline, getUserDownlineCount }
}

export default useGetDownlinrCount
