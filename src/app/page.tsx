import { AcmeLogo, Button } from '@/app/components';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="md:h-18 flex h-20 shrink-0 items-end bg-blue-500 p-4">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 bg-purple-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl text-gray-800 md:leading-normal">
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Button>Login</Button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={700}
            className="hidden md:block"
            alt="Hero desktop"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Hero mobile"
          />
        </div>
      </div>
    </main>
  );
}
