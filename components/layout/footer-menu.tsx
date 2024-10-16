'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block py-2 text-sm underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active,
            'text-neutral-500 dark:text-neutral-400': !active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul className="flex flex-col items-center md:flex-row">
        {menu.map((item: Menu, index) => (
          <span key={item.title} className="flex items-center">
            <FooterMenuItem item={item} />
            {index < menu.length - 1 && (
              <span className="mx-2 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
            )}
          </span>
        ))}
      </ul>
    </nav>
  );
}