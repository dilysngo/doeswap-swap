import React from 'react'
import styled from 'styled-components'
import { Card } from 'horaswap-libs-uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 440px;
  width: 100%;
  z-index: 5;
  border-radius: 25px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  padding: 10px 30px 20px 30px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
