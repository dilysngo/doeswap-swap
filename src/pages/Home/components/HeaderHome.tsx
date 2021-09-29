import React from 'react'
import styled from 'styled-components'
import ProfileAccount from './ProfileAccount'
import CardInfoWallet from './CardInfoWallet'

const Container = styled.div`
  width: 100%;
  background: linear-gradient(356.65deg, #BAE3FF 2.84%, #B2DFFF 49.59%, #44CAFF 97.32%);
`
const Body = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;  

  min-height: 240px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 10px;

`

const Index = () => {
  return (
    <Container>
      <Body>
        <ProfileAccount />
        <CardInfoWallet />
      </Body>
    </Container>
  )
}

export default Index
