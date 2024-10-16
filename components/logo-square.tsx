import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center',
        {
          'h-[75px] w-[69px] md:h-[100px] md:w-[92px]': !size,
          'h-[30px] w-[30px] md:h-[15px] md:w-[15px]': size === 'sm'
        }
      )}
    >
      <LogoIcon
        className={clsx({
          'h-[75px] w-[69px] md:h-[100px] md:w-[92px]': !size,
          'h-[10px] w-[10px] md:h-[5px] md:w-[5px]': size === 'sm'
        })}
      />
    </div>
  );
}
