import { ModeToggle } from '@/components/mode-toggle';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex h-screen w-full items-center font-syne'>
      <nav className='fixed top-0 z-[1] w-full bg-transparent px-0 lg:px-6'>
        <div className='mx-4 flex items-center justify-end py-2'>
          <div className='flex items-center justify-center gap-2 font-normal'>
            <ModeToggle />
          </div>
        </div>
      </nav>
      <div className='hidden h-full w-1/2 flex-col items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 lg:flex'>
        <div className='flex max-w-lg flex-col items-start justify-center text-white'>
          <h1 className='text-3xl font-bold'>Welcome to {siteConfig.name}</h1>
          <p className='font-prompt'>{siteConfig.description}</p>
        </div>
      </div>
      <div className='flex w-full items-center justify-center lg:w-1/2'>
        {children}
      </div>
    </div>
  );
}
