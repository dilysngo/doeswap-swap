/* eslint-disable import/order */
import './styles.css'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from 'horaswap-libs-uikit'
import { Form, Input } from 'antd'
import { get } from 'lodash'
import BigNumber from 'bignumber.js'
import CurrencyFormat from 'react-currency-format'

import { useStakingContract, useStakingTokenContract } from 'hooks/useSpwContract'
import { setOpenModalStake } from 'state/application/actions'
import { MODAL_TYPES, SPW } from '../../constants'
import { roundNumber } from 'helpers/CommonHelper'
import useToast from 'hooks/useToast'
import ModalCustom from 'components/ModalCustom'
import SelectNumberOption from 'components/SelectOptionNumber'
import Misc from 'helpers/Misc'

const MIN_STAKE = 10
// const MIN_WITHRAW = 5

const Index = () => {
  const dispatch = useDispatch()
  const [stakeForm] = Form.useForm()
  const { toastSuccess } = useToast()

  const contract = useStakingContract()
  const contractBep20 = useStakingTokenContract()

  const [, setAmountSwap] = useState(0)
  const [isApprove, setIsApprove] = useState(false)
  const [messError, setMessError] = useState(null)
  const [btnLoading, setBtnLoading] = useState(null)
  const [, setResultsTrx] = useState(null)

  const { account, modalOverview } = useSelector((state) => state.application)

  const handleModalClose = useCallback(async () => {
    dispatch(setOpenModalStake(null))
    stakeForm.resetFields()
    setMessError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeForm])

  const onStakeNow = useCallback(
    async (customer, token, dataModal, amount) => {
      if (!contract && !contractBep20) return

      setBtnLoading(true)

      const params = {
        account: customer.address,
        spender: process.env.REACT_APP_CONTRACT,
        ref: get(dataModal, 'data.ref') || token.address,
        amount: new BigNumber(amount).shiftedBy(token.decimals).toFixed(),
        plan: get(dataModal, 'data.package.plan'),
      }

      try {
        contractBep20.methods
          .approve(params.spender, params.amount)
          .send({ from: params.account })
          .on('error', () => {
            // setMessError(error?.message)
            setBtnLoading(false)
            setMessError('Transaction error')
          })
          .on('transactionHash', (hash) => {
            setResultsTrx({ transactionHash: hash })
          })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .on('receipt', async (receipt) => {
            setIsApprove(true)

            await Misc.sleep(300)

            contract.methods
              .invest(params.ref, params.plan, params.amount)
              .send({ from: account.address })
              .on('error', () => {
                setBtnLoading(false)
                setMessError('Transaction error')
              })
              .on('transactionHash', (hash) => {
                setResultsTrx({ transactionHash: hash })
              })
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .on('receipt', (receipt1) => {
                setBtnLoading(false)
                handleModalClose()
                toastSuccess('Stake Success.')
              })
          })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error', error)

        setBtnLoading(false)
      }
    },
    [account.address, contract, contractBep20, handleModalClose, toastSuccess]
  )

  /// => Handle Stake
  const handleModalOke = useCallback(async () => {
    setMessError(null)

    stakeForm.validateFields().then(async ({ amount }) => {
      const balance = get(account, `assets.${[SPW.address]}.balance`, 0) / `1e${SPW.decimals}`

      if (amount > parseFloat(balance)) {
        return stakeForm.setFields([
          {
            name: 'amount',
            errors: ['SPW not enough.!'],
          },
        ])
      }

      if (amount < MIN_STAKE) {
        return stakeForm.setFields([
          {
            name: 'amount',
            errors: [`and Amount must be greater than ${MIN_STAKE}`],
          },
        ])
      }

      if (modalOverview?.data?.package?.plan !== null) {
        return onStakeNow(account, SPW, modalOverview, amount)
      }
      return null
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, stakeForm, MIN_STAKE, modalOverview])
  // <= End

  // => Hanlde Select number option
  const handleSelectNumber = useCallback(
    (value) => {
      const maxValue = get(account, `assets.${[SPW.address]}.balance`, 0) / `1e${SPW.decimals}`

      const fee = 0
      const computedAmount = maxValue ? (maxValue * value) / 100 - fee : 0
      const amount = roundNumber(computedAmount)

      setAmountSwap(amount)
      stakeForm.setFieldsValue({ amount })
    },
    [account, stakeForm]
  )
  // <= End

  // Render other
  const renderButton = useMemo(() => {
    if (btnLoading) {
      return 'Loading'
    }

    if (!isApprove) {
      return 'Stake Now'
    }

    return 'Stake Now'
  }, [btnLoading, isApprove])

  return (
    <>
      <ModalCustom
        destroyOnClose
        className="modal-stake"
        visible={MODAL_TYPES.stake === get(modalOverview, 'type')}
        title={(() => {
          const swapFrom = get(modalOverview, 'title', '')
          return <>{`Stake ${swapFrom}`}</>
        })(modalOverview)}
        width={400}
        btnLoading={btnLoading}
        footerLabel={renderButton}
        handleOk={handleModalOke}
        handleCancel={handleModalClose}
      >
        <Form preserve={false} name="normal_login" form={stakeForm} className="swap-form login-form">
          <div className="lable-form flex-between">
            <Text>Amount</Text>
            <div className="balance">
              <CurrencyFormat
                value={roundNumber(get(account, `assets.${[SPW.address]}.balance`, 0) / `1e${SPW.decimals}`, 6)}
                displayType="text"
                thousandSeparator
              />{' '}
              <span>SPW</span>
            </div>
          </div>
          <Form.Item
            name="amount"
            initialValue={10}
            rules={[
              {
                required: true,
                message: 'Require amount',
              },
            ]}
            className="item-2"
          >
            <Input size="large" name="amount" onChange={(e) => setAmountSwap(e.target?.value || 0)} placeholder="Enter amount" />
          </Form.Item>
          <SelectNumberOption handleSelect={handleSelectNumber} />
          {messError && <div className="box-error">{messError}</div>}
        </Form>
      </ModalCustom>
    </>
  )
}

export default Index
