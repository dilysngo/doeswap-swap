import React from 'react'
import styled from 'styled-components'
import { Text } from "doeswap-libs-uikit"
import useI18n from 'hooks/useI18n'
import config from './listConfig'
import Link from '../Link'

const WrapperFooterDivStyled = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    li {
      padding: 5px 10px;
      &:hover {
        border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

export default function Footer() {
  const T = useI18n()

  return (
    <>
      <WrapperFooterDivStyled>
        <ul>
          {config.map((entry, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`footer-${entry.href}-${index}`}>
                <Link href={entry.href} target={entry.target}>
                  <Text color="textSubtle" fontSize="18px" fontWeight={500} >
                    {T(9999 - index, entry.label)}
                  </Text>
                </Link>
              </li>
            )
          })}
        </ul>
      </WrapperFooterDivStyled>
    </>
  )
}
