import { getMenu } from 'lib/shopify';
import FooterMenu from './footer-menu';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const menu = await getMenu('footer');
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:gap-4 md:px-4 min-[1320px]:px-0">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
            <p>
              &copy; {copyrightDate} {copyrightName}
              {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
            </p>
          </div>
          <div className="md:ml-auto">
            <FooterMenu menu={menu} />
          </div>
        </div>
      </div>
    </footer>
  );
}