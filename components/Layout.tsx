import React, { ReactNode } from 'react'
import Head from 'next/head'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>First Date Conversation App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  )
}

export default Layout