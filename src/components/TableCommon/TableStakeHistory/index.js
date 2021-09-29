import './styles.css'
import React, { useState, useMemo } from 'react'
import { Text } from 'horaswap-libs-uikit'
import { Tag } from 'antd'
import { get } from 'lodash'
import ReactTimeAgo from 'react-time-ago'

import { formatDate } from 'helpers/CommonHelper'
import TableCustomLarge from '../TableCustomLarge'

const PAGE_SIZE = 10

const Index = ({ filter, listStakeHistory, handleUstake: handleUntake = () => undefined, ...props }) => {
  const [loading] = useState(false)

  // => Hanlde params
  const [searchParams, setSearchParams] = useState({
    pageIndex: 1,
    pageSize: PAGE_SIZE,
  })

  const pagination = useMemo(
    () => ({
      total: listStakeHistory.length,
      current: searchParams.pageIndex,
      onChange: (page, pageRecord) => {
        setSearchParams({
          ...searchParams,
          pageIndex: page,
          pageSize: pageRecord,
        })
      },
    }),
    [searchParams, listStakeHistory]
  )

  const renderTable = useMemo(() => {
    const columns = [
      {
        title: '#',
        key: 'index',
        dataIndex: 'index',
        width: 50,
        render: (text, record, index) => {
          const pageIndex = get(searchParams, 'pageIndex', 0)
          const pageSize = get(searchParams, 'pageSize', 0)
          return <span>{(pageIndex - 1) * pageSize + index + 1}</span>
        },
      },
      {
        title: 'Plan',
        key: 'plan',
        dataIndex: 'plan',
        sorter: {
          compare: (a, b) => a.plan - b.plan,
        },
        render: (plan) => {
          return parseInt(plan) + 1
        },
      },
      {
        title: 'Age',
        key: 'start',
        dataIndex: 'start',
        sorter: {
          compare: (a, b) => a.start - b.start,
        },
        render: (start) => (start !== undefined ? <ReactTimeAgo date={parseInt(start) * 1000} locale="en-US" /> : ''),
      },
      {
        title: 'Value',
        key: 'amount',
        dataIndex: 'amount',
        sorter: {
          compare: (a, b) => a.amount - b.amount,
        },
        render: (amount) => amount,
      },
      {
        title: 'Start',
        key: 'start',
        dataIndex: 'start',
        sorter: {
          compare: (a, b) => a.start - b.start,
        },
        render: (start) => (start ? formatDate(start * 1000) : ''),
      },
      {
        title: 'Finish',
        key: 'finish',
        dataIndex: 'finish',
        align: 'right',
        sorter: {
          compare: (a, b) => a.finish - b.finish,
        },
        render: (finish) => {
          // if (record.isUnStake) {
          //   return (
          //     <Tag color="rgb(44,213,255)" key="Finish">
          //       Finish
          //     </Tag>
          //   )
          // }

          // const toDay = new Date().getTime()
          // if (toDay >= finish * 1000) {
          //   return (
          //     <Tag className="pointer" color="#ffb12c" key="unStake" onClick={() => handleUntake(record)}>
          //       UNSTAKE
          //     </Tag>
          //   )
          // }

          return finish ? formatDate(finish * 1000) : ''
        },
      },
      {
        title: '',
        key: 'finish',
        align: 'right',
        render: (text, record) => {
          if (record?.isUnStake) {
            return (
              <Tag color="rgb(44,213,255)" key="Finish">
                Inactive
              </Tag>
            )
          }

          if (record?.isExpired) {
            return (
              <Tag
                className="pointer"
                color="#ffb12c"
                key="unStake"
                onClick={() => handleUntake(record)}
                style={{ color: '#000000' }}
              >
                UNSTAKE
              </Tag>
            )
          }

          return (
            <Tag key="staking" color="green">
              Staking
            </Tag>
          )
        },
      },
    ]

    return (
      <TableCustomLarge
        id="stake-his"
        title={<Text>Stake History</Text>}
        showHeader
        customTableClassName="transaction-table"
        columns={columns}
        customPagination={pagination}
        defaultPageSize={PAGE_SIZE}
        dataSource={listStakeHistory.filter((v) => v.isUnStake === filter.type)}
        loading={loading}
        {...props}
      />
    )
  }, [pagination, listStakeHistory, loading, props, searchParams, handleUntake, filter.type])

  return (
    <>
      <div id="stake-history" className="table-stake-his">
        {renderTable}
      </div>
    </>
  )
}

export default React.memo(Index)
