import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { ChainId, Token } from '@pancakeswap/sdk'
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists'
import { AppState } from '../index'
import { replaceTokenList } from './actions'
import { DEFAULT_TOKEN_LIST_URL } from '../../constants/lists'

type TagDetails = Tags[keyof Tags]
export interface TagInfo extends TagDetails {
  id: string
}

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo

  public readonly tags: TagInfo[]

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
    this.tags = tags
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

export type TokenAddressMap = Readonly<{ [chainId in ChainId]: Readonly<{ [tokenAddress: string]: WrappedTokenInfo }> }>

/**
 * An empty result, useful as a default.
 */
const EMPTY_LIST: TokenAddressMap = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
}

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
  typeof WeakMap !== 'undefined' ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList): TokenAddressMap {
  const result = listCache?.get(list)
  if (result) return result

  const map = list.tokens.reduce<TokenAddressMap>(
    (tokenMap, tokenInfo) => {
      const tags: TagInfo[] =
        tokenInfo.tags
          ?.map((tagId) => {
            if (!list.tags?.[tagId]) return undefined
            return { ...list.tags[tagId], id: tagId }
          })
          ?.filter((x): x is TagInfo => Boolean(x)) ?? []
      const token = new WrappedTokenInfo(tokenInfo, tags)
      if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
      return {
        ...tokenMap,
        [token.chainId]: {
          ...tokenMap[token.chainId],
          [token.address]: token,
        },
      }
    },
    { ...EMPTY_LIST }
  )
  listCache?.set(list, map)
  return map
}

/**
 * @param url: File name will select list token.
 * @param
 * @returns { url, tokenList }
 */
export function useGetTokenListFromApi({ organization, repos, filename, query, url = DEFAULT_TOKEN_LIST_URL }): any {
  const dispatch = useDispatch()
  const [tokenList, setTokenList] = useState({})

  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: `https://api.github.com/repos/${organization}/${repos}/git/trees/main${query}`,
        // url: `https://api.github.com/repos/${organization}/${repos}/git/blobs/b28e225b0d3c8ef4aef06b75215734291c6fcf82`,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          Accept: 'application/vnd.github.v3+json',
        },
      }).then((responTrees) => {
        if (responTrees.status === 200) {
          const tree = responTrees.data.tree.find((v) => v.path === filename)
          const fileUrl = tree.url
          axios({
            method: 'get',
            url: fileUrl,
            headers: {
              'content-type': 'application/json;charset=UTF-8',
              Accept: 'application/vnd.github.v3+json',
            },
          }).then((responFile) => {
            if (responFile.status === 200) {
              const buffer = JSON.parse(Buffer.from(responFile.data.content, 'base64').toString('ascii') || '{}')
              dispatch(replaceTokenList({ url, tokenList: buffer }))

              setTokenList({ url, tokenList: buffer })
            }
          })
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, [dispatch, url, organization, repos, filename, query])

  return tokenList
}

export function useTokenList(url: string | undefined): TokenAddressMap {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lists = useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl)
  // const listsFromApi = useGetTokenListFromApi(url)
  // const lists = listsFromApi // .current ? listsFromApi : listsDefault;

  return useMemo(() => {
    if (!url) return EMPTY_LIST
    const current = lists[url]?.current
    if (!current) return EMPTY_LIST
    try {
      return listToTokenMap(current)
    } catch (error) {
      console.error('Could not show token list due to error', error)
      return EMPTY_LIST
    }
  }, [lists, url])
}

export function useSelectedListUrl(): string | undefined {
  return useSelector<AppState, AppState['lists']['selectedListUrl']>((state) => state.lists.selectedListUrl)
}

export function useSelectedTokenList(): TokenAddressMap {
  return useTokenList(useSelectedListUrl())
}

export function useSelectedListInfo(): { current: TokenList | null; pending: TokenList | null; loading: boolean } {
  const selectedUrl = useSelectedListUrl()
  const listsByUrl = useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl)
  const list = selectedUrl ? listsByUrl[selectedUrl] : undefined
  return {
    current: list?.current ?? null,
    pending: list?.pendingUpdate ?? null,
    loading: list?.loadingRequestId !== null,
  }
}

// returns all downloaded current lists
export function useAllLists(): TokenList[] {
  const lists = useSelector<AppState, AppState['lists']['byUrl']>((state) => state.lists.byUrl)

  return useMemo(
    () =>
      Object.keys(lists)
        .map((url) => lists[url].current)
        .filter((l): l is TokenList => Boolean(l)),
    [lists]
  )
}
