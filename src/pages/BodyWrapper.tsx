import React from 'react'
import styled from 'styled-components'
import { Card } from "doeswap-libs-uikit"

const BodyWrapper = styled(Card)`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 6px;
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.1);
  z-index: 5;
`
export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <BodyWrapper>{children}</BodyWrapper>
  )
}
