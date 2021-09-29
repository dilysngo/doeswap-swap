import { useEffect, useState, useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import Misc from 'helpers/Misc'
import { roundNumber } from 'helpers/CommonHelper'
import { SPW } from '../constants'

const useGetEventsLog = (contract: any) => {
  const { account } = useWeb3React()
  const [listStakeHistory, setDataEvents] = useState([])
  const [fetchError, setFetchError] = useState(false)

  const getEventsLogContract = useCallback(async () => {
    if (contract !== null && !!account) {
      const arr: any = []
      try {
        let count = 0
        let isNull = false

        const toDay = new Date().getTime()
        while (!isNull) {
          const result = await contract.methods.getUserDepositInfo(account, count).call()

          if (Object.keys(result).length > 0) {
            arr.push({
              ...result,
              id: count,
              amount: roundNumber(new BigNumber(result.amount || 0).shiftedBy(-SPW?.decimals || -18).toNumber(), 10),
              isExpired: toDay >= result?.finish * 1000,
            })
            count++

            await Misc.sleep(100) // wait for load data
          } else {
            isNull = true
            break
          }
        }
      } catch (error) {
        setFetchError(false)
      } finally {
        if (!fetchError) {
          setDataEvents(arr.reverse())
          setFetchError(false)
        }
      }
    }
  }, [account, contract, fetchError])

  useEffect(() => {
    getEventsLogContract()
  }, [getEventsLogContract])

  return { listStakeHistory, getEventsLogContract }
}

export default useGetEventsLog
