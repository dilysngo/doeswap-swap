import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, CopyIcon } from "doeswap-libs-uikit"

interface Props {
  title: string
  value: string
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

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'block' : 'none')};
  position: absolute;
  bottom: -22px;
  right: 0;
  left: 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
`

const CustomText = styled(Text)`
  font-size: 20px;
`

const TextLeft = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;
`

const Chilren = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const CopyToClipboard: React.FC<Props> = ({ title, value, children, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  return (
    <WrapperBox>
      <CustomText>{title}</CustomText>
      <StyleButton
        small
        bold
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(value)
            setIsTooltipDisplayed(true)
            setTimeout(() => {
              setIsTooltipDisplayed(false)
            }, 1000)
          }
        }}
        title={value}
        {...props}
      >
        <Chilren>{children}</Chilren>
        <TextLeft>
          <CopyIcon width="20px" color="primary" ml="4px" />
        </TextLeft>
        <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
      </StyleButton>
    </WrapperBox>
  )
}

export default CopyToClipboard
