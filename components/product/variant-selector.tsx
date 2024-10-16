'use client';

import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product, ProductOption, ProductVariant } from 'lib/shopify/types';
import { useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  product,
  options,
  variants
}: {
  product: Product;
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const [message, formAction] = useFormState(addItem, null);
  const [isPending, startTransition] = useTransition();
  const { pending } = useFormStatus();

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));

  const handleVariantSelection = (
    optionNameLowerCase: string,
    value: string,
    isAvailableForSale: boolean
  ) => {
    if (isAvailableForSale) {
      const newState = updateOption(optionNameLowerCase, value);
      const selectedVariant = combinations.find((combination) =>
        Object.entries(newState).every(([key, value]) => combination[key] === value)
      );
      if (selectedVariant) {
        formAction(selectedVariant.id);
      }
    }
  };

  return options.map((option) => (
    <form key={option.id} action={formAction}>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();
            const optionParams = { ...state, [optionNameLowerCase]: value };

            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );

            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    handleVariantSelection(optionNameLowerCase, value, !!isAvailableForSale);
                  });
                }}
                key={value}
                aria-disabled={!isAvailableForSale || pending}
                disabled={!isAvailableForSale || pending}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                  {
                    'cursor-default ring-2 ring-blue-600': isActive && isAvailableForSale,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600':
                      !isActive && isAvailableForSale,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                      !isAvailableForSale || pending
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  ));
}