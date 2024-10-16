import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-12 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center justify-center">
        <Link
          href="/"
          prefetch={true}
          className="flex w-full items-center justify-center md:w-auto"
        >
          <LogoSquare />
        </Link>
      </div>
      <div className="flex justify-end md:absolute md:right-6">
        <CartModal />
      </div>
    </nav>
  );
}
