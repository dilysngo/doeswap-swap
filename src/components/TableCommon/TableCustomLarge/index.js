import './styles.css'
import React, { useMemo } from 'react'
import { Text } from 'horaswap-libs-uikit'
import { Table, Card } from 'antd'
import { trim, get } from 'lodash'

export const defaultScroll = { x: 0 }
export const pageSizeOptions = ['10', '20', '30', '100']

const CardTableCustom = ({
  id = '',
  columns = [],
  dataSource = [],
  extra,
  title = 'Default Table Name',
  customTableClassName = '',
  customCardContainerClass = '',
  customPagination = {},
  customScroll = {},
  defaultPageSize = 10,
  showHeader = true,
  onClick = () => undefined,
  ...tableProps
}) => {
  const paginationSetting = useMemo(
    () => ({
      pageSizeOptions,
      defaultPageSize,
      showSizeChanger: true,
      total: customPagination.total ? customPagination.total : 0,
      showTotal: (total) => <Text>{`Total ${total} items`}</Text>,
    }),
    [defaultPageSize, customPagination]
  )

  const { innerWidth: width } = window

  return (
    <Card className={`report-card ${customCardContainerClass}`} title={title} extra={extra}>
      <Table
        showHeader={showHeader}
        rowKey={(record) => `${trim(id)}-${get(record, 'id')}`}
        className={`report-table ${customTableClassName}`}
        dataSource={dataSource}
        columns={columns}
        pagination={{ ...paginationSetting, ...customPagination }}
        scroll={{ ...defaultScroll, customScroll }}
        onRow={(record, rowIndex) => onClick(record, rowIndex)}
        size={width < 480 ? 'middle' : ''}
        {...tableProps}
      />
    </Card>
  )
}

export default CardTableCustom
