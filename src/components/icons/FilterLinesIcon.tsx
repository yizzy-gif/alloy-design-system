import type { SVGProps } from 'react';

export interface FilterLinesIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
  strokeWidth?: number;
}

/** FilterLinesIcon — three stacked horizontal lines decreasing in width · viewBox 0 0 24 24 */
export const FilterLinesIcon = ({ size = 24, color = 'currentColor', strokeWidth, ...props }: FilterLinesIconProps) => {
  const s = typeof size === 'number' ? size : parseFloat(size as string);
  const sw = strokeWidth ?? (s <= 12 ? 2 : s <= 16 ? 1.75 : s <= 20 ? 1.5 : 1.25);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={sw}
      {...props}
    >
      <path
        d="M3 6H21M6 12H18M9 18H15"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

FilterLinesIcon.displayName = 'FilterLinesIcon';
