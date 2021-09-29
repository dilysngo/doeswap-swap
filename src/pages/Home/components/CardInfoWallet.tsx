import React from "react"
import { useWeb3React } from '@web3-react/core';
import { Text, Flex } from "doeswap-libs-uikit";
import { get } from 'lodash';
import styled from 'styled-components';
import { roundNumber } from 'helpers/CommonHelper';
import { AutoColumn } from '../../../components/Column/index';
import { useProfileAccount } from '../../../state/application/hooks';

const Container = styled.div`
  width: 100%;
  
  align-items: center;
  margin-top: 15px;

  display: inline-flex;
  flex: 0 0 100%;
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 0 0 50%;
    max-width: 50%; 
    margin-top: 0;
  }
`
const Body = styled.div`
  width: 100%;
  height: 100%;
  max-height: 120px;
  padding: 20px 30px;
  border-radius: 26px;
  background: #FFFFFF;
`
const CustomFlex = styled(Flex)`
  @media only screen and (max-width: 370px) {
    flex-direction: column;
    align-items: flex-start;

    & > div:last-child {
      margin-top: 4px;
    }
  }
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
  const { account } = useWeb3React()
  const userInfo = useProfileAccount()
  return (
    <Container className="header-container">
      <Body>
        <CustomFlex justifyContent="space-between" alignItems="center" height="100%">
          <AutoColumn>
            <Text fontSize="20px" fontWeight="600">{account ? roundNumber(get(userInfo, 'balance', 0), 8) : '--'}</Text>
            <Text fontSize="16px">to collect</Text>
          </AutoColumn>
          <BoxWallet>
            <Text color="#023886">Binance</Text>
            <img src="/images/icons/bnb.png"  alt="" />
          </BoxWallet>
        </CustomFlex>
      </Body>
    </Container> 
  )
}

export default Index;