'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <Image src="/images/logo.svg" width={48} height={48} alt={`${APP_NAME} Logo}`} priority />
      <div className="w-1/3 rounded-lg p-6 text-center shadow-md"> </div>
      <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
      <p className="text-destructive">The page you are looking for does not exist.</p>
      <Button variant="outline" className="mt-4 ml-2" onClick={() => (window.location.href = '/')}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
