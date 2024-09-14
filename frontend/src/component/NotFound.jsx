import React from 'react';

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
      <h1 className='text-5xl p-4 mb-2 font-semibold'>404 - Page Not Found</h1>
      <p className='text-lg'>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
