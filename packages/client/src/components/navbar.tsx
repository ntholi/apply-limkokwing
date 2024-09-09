import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <Logo className='h-8 w-auto mr-4' />
          <div className='hidden md:flex space-x-4'>
            <Link to='/' className='hover:text-foreground/60'>
              Home
            </Link>
            <Link to='/courses' className='hover:text-foreground/60'>
              Courses
            </Link>
            <Link to='/apply' className='hover:text-foreground/60'>
              Apply
            </Link>
          </div>
        </div>
        <div className='hidden md:block'>
          <Link to='/account' className='hover:text-foreground/60'>
            Account
          </Link>
        </div>
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-white focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1'>
            <Link to='/' className='block text-white hover:text-gray-300'>
              Home
            </Link>
            <Link
              to='/courses'
              className='block text-white hover:text-gray-300'
            >
              Courses
            </Link>
            <Link to='/apply' className='block text-white hover:text-gray-300'>
              Apply
            </Link>
            <Link
              to='/account'
              className='block text-white hover:text-gray-300'
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
