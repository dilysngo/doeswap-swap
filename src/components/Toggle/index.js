import React from 'react'
import { Text, Toggle } from 'horaswap-libs-uikit'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const WrapperText = styled(Text)`
  font-size: 20px;
  margin-left: 10px;
  white-space: nowrap;
`

const Index = ({ title, checked, onChange, scale = 'sm' }) => {
  return (
    <>
      <Wrapper>
        <Toggle checked={checked} onChange={onChange} scale={scale} />
        <WrapperText>{title}</WrapperText>
      </Wrapper>
    </>
  )
}

export default Index
