import Navbar from '@/components/layouts/navigation/navbar';
import React from 'react';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='font-outfit relative pt-16'>
      <Navbar />
      <div className='px-4 lg:px-10'>{children}</div>
    </div>
  );
}
