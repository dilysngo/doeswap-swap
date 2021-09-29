import { Text } from "horaswap-libs-uikit";
import React from "react"
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';

const Container = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  
  flex: 0 0 50%;
  max-width: 50%;
`
const Cover = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  margin-right: 20px;
` 

const Index:React.FC = () => {
  const { account } = useWeb3React()
  const splitText = account ? `${account.substring(0, 3)}......${account.substring(account.length, account.length - 3)}` : "--"
  return (
    <Container className="header-container">
      <Cover src="/images/cover-profile.png" alt="" />
      <Text>Connect with {splitText}</Text>
    </Container> 
  )
}

export default Index;