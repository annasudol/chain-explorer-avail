import React, { useEffect, useState } from 'react';

// import { MainLayout } from '@/components/MainLayout';

const HomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>Home {isClient ? 'client' : 'server'}</div>
    // <MainLayout>
    // {isClient && (
    //   <div className="flex flex-col items-center justify-center gap-8 px-6 sm:py-12 md:flex-row">
    //     app
    //   </div>
    // )}
    // </MainLayout>
  );
};

export default HomePage;
