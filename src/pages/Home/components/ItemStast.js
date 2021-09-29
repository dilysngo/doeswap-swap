import React from "react"

const Index = ({ item }) => {
  return (
    <div className="item-stats">
      <div className="title">{item.title}</div>
      <div className="des">
        {item.logo && (
          <img src={item.logo} alt="" width="20" />
        )}
        <span>{item.description}</span> 
      </div>
    </div>
  )
}
export default Index;