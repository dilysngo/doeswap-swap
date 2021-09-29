import { Text, Flex } from 'horaswap-libs-uikit';
import React from "react"
import styled from 'styled-components';
import { AutoColumn } from '../../../components/Column/index';

const Container = styled.div`
  width: 100%;
  display: inline-flex;
  flex: 0 0 50%;
  max-width: 50%;

  align-items: center;
`
const Body = styled.div`
  width: 100%;
  height: 100%;
  max-height: 120px;
  padding: 20px 30px;
  border-radius: 26px;
  background: #FFFFFF;
`
const BoxWallet = styled.div`
  display:flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  padding: 4px 40px;

  background: #FFFFFF;
  border: 1px solid #023886;
  box-sizing: border-box;
  border-radius: 20px;

  img {
    width: 24px;
    height: 24px;
    background: #333;
    border-radius: 50%;
    margin-left: 10px;
  }

` 

const Index:React.FC = () => {

  return (
    <Container className="header-container">
      <Body>
        <Flex justifyContent="space-between" alignItems="center" height="100%">
          <AutoColumn>
            <Text fontSize="20px" fontWeight="600">$0</Text>
            <Text fontSize="16px">to collect</Text>
          </AutoColumn>
          <BoxWallet>
            <Text color="#023886">Binance</Text>
            <img src="/images/icons/bnb.png"  alt="" />
          </BoxWallet>
        </Flex>
      </Body>
    </Container> 
  )
}

export default Index;