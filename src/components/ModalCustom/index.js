import './styles.css'
import React from 'react'
import { Modal } from 'antd'
import { Text } from 'horaswap-libs-uikit'
import ButtonMain from 'components/ButtonMain'
import { Dots } from 'components/swap/styleds'

const WithdrawModal = (props) => {
  const {
    visible,
    title,
    className,
    handleOk = () => undefined,
    handleCancel = () => undefined,
    btnLoading,
    footer,
    footerLabel,
    children,
    ...otherProps
  } = props

  return (
    <Modal
      centered
      className={`${className} custom-modal`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<Text fontSize={20}>{title}</Text>}
      footer={
        footer || (
          <ButtonMain width="100%" key="submit" type="submit" onClick={handleOk} disabled={btnLoading}>
            {footerLabel}
            {btnLoading && <Dots />}
          </ButtonMain>
        )
      }
      {...otherProps}
    >
      {children}
    </Modal>
  )
}

export default WithdrawModal
