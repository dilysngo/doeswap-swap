import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from "doeswap-libs-uikit"
import useI18n from 'hooks/useI18n'

interface Props {
  activeIndex?: number
}

const StyledNav = styled.div`
  padding-top: 20px;
  text-align: center;

  div {
    background-color: transparent;
  }

  a {
    color: #0B509A;
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 8px;
    box-shadow: unset;
  }

  a[variant='tertiary'] {
    background-color: transparent;
  }

  a[variant='subtle'] {
    background-color: #CDECF8;
  }
`
const GroupButton = styled(ButtonMenu)`
  color: red;
  background-color: red;
`

function Nav({ activeIndex = 0 }: Props) {
  const TranslateString = useI18n()
  return (
    <StyledNav>
      <GroupButton 
        activeIndex={activeIndex} 
        scale="sm" 
        variant="subtle"
      >
        <ButtonMenuItem id="swap-nav-link" to="/exchange" as={Link}>
          {TranslateString(9999, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(9999, 'Pool')}
        </ButtonMenuItem>
      </GroupButton>
    </StyledNav>
  )
}

export default Nav
