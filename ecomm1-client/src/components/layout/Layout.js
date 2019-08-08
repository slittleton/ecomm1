import React from 'react';
import Menu from './Menu';
const Layout = ({title = "title", description="description",children}) => {

  return(
    <div className="layout">
      <Menu/>
      <div className="page-heading-container">
        <h2 className="page-heading">{title}</h2>
        <p className="page-description">{description}</p>
      </div>
      <div className="layout-children">
        {children}
      </div>
    </div>
  )
}

export default Layout;