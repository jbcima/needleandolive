import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="fixed z-50 right-[24px] top-[63px] bg-neutral-50 md:right-[24px] md:top-[74px] flex h-11 w-11 items-center justify-center text-black transition-colors dark:text-white">
      <ShoppingCartIcon
        className={clsx('h-11 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 bg-black text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
