import Footer from 'components/layout/footer';
import { List } from 'components/list';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <List />
      <Footer />
    </>
  );
}
