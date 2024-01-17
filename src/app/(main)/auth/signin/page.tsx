import React from 'react';
import LoginModal from '../LoginModal';

export default function SigninPage() {
  return (
    <div className='flex h-[90vh] w-screen flex-col items-center justify-center'>
      <LoginModal>Sign In</LoginModal>
      <p className='mt-5 font-mono text-xs text-gray-500'>
        Proper login form will be added later
      </p>
    </div>
  );
}
