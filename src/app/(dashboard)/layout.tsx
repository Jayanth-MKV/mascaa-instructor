import { HomePage } from '@/components/component/home/home-page';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <HomePage>
      {children}
    </HomePage>
  )
}

export default layout