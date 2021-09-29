import '../styles.css'
import React from 'react'
import Item from './ItemStast'

const TotalValueLocked = ({ data, width }) => {
  return (
    <div className="token-stats">
      <div className="item-stats-fram-box">
        {data.map((ele, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`token-stats-${index}`} className="token-stats-item" style={{ width }}>
            <Item item={ele} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TotalValueLocked
