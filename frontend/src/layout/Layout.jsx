import React from 'react'
import NavMenuComp from '../components/NavMenuComp'

function Layout({ children }) {
  return (
    <div>
      <NavMenuComp />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout