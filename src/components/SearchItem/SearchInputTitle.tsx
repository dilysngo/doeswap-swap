import React from 'react'
import styled from 'styled-components'
import { Text, SearchIcon } from "doeswap-libs-uikit"

interface Props {
  title: string
  value: string
  placeholder: string
  onChange: () => void
}

const WrapperBox = styled.div``

const StyleButton = styled(Text).attrs({ role: 'button' })`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};

  padding: 5px 10px;
  border-radius: 6px;
  background-color: rgba(249, 174, 46, 0.2);
  font-size: 20px;
  font-weight: 300;
`
const TextLeft = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
`
const TextCustom = styled(Text)`
  font-size: 20px;
  margin-left: 10px;
`
const Input = styled.input`
  padding: 0;
  margin: 0;
  border: unset;
  outline: unset;
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`

const Index: React.FC<Props> = ({ title, placeholder, value, onChange, ...props }) => {
  return (
    <WrapperBox>
      <TextCustom>{title}</TextCustom>
      <StyleButton small bold>
        <Input value={value} placeholder={placeholder} onChange={onChange} {...props} />
        <TextLeft>
          <SearchIcon width="20px" color="primary" ml="4px" />
        </TextLeft>
      </StyleButton>
    </WrapperBox>
  )
}

export default Index
