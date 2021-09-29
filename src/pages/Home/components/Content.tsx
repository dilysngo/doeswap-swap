import React from 'react'
import { Button, useWalletModal } from 'doeswap-libs-uikit'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import useAuth from '../../../hooks/useAuth'

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/images/dashboard-bg.jpeg');
  background-size: cover;
  background-position: top right;
`
const Section1 = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 10px 10px;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  p {
    color: #023886;
    font-family: Sen;
    font-size: 20px;
    line-height: 24px;

    max-width: 440px;
    margin-top: 10px;
  }

  button {
    margin-top: 20px;
    background: #117bba;
    border-radius: 12px;
  }
`
const Section2 = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 40px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    width: 90px;
    height: auto;
  }

  h2 {
    color: #b9edff;
    font-family: Sen;
    font-weight: bold;
    font-size: 35px;
    line-height: 38px;
    margin-top: 35px;
    margin-bottom: 10px;
  }

  p {
    color: #023886;
    font-family: Sen;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
  }
`
const Index: React.FC = () => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account as any)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  return (
    <Container>
      <Section1>
        <img src="/images/title-content-text.png" alt="" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae tristique justo, ullamcorper habitant in aliquam
          arcu,
        </p>
        {account ? (
          <Button
            onClick={() => {
              onPresentAccountModal()
            }}
          >
            {accountEllipsis}
          </Button>
        ) : (
          <Button
            onClick={() => {
              onPresentConnectModal()
            }}
          >
            Connect to wallet
          </Button>
        )}
      </Section1>
      <Section2>
        <img src="images/logo.png" alt="" />
        <h2>
          Used by millions.
          <br />
          Trusted with billions.
        </h2>
        <p>PancakeSwap has the most users of any decentralized platform, ever.</p>
        <p>And those users are now entrusting the platform with over $9 billion in funds.</p>
      </Section2>
    </Container>
  )
}

export default Index
