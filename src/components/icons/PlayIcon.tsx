import type { SVGProps } from 'react';

export interface PlayIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height in px. Overridden by .artwork CSS when used inside a Button. */
  size?: number | string;
  strokeWidth?: number;
}

/** PlayIcon — rightward-pointing play triangle with rounded corners · viewBox 0 0 24 24 */
export const PlayIcon = ({ size = 24, color = 'currentColor', strokeWidth, ...props }: PlayIconProps) => {
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
        d="M6 4.75C6 4.18 6 3.89 6.12 3.74C6.22 3.6 6.38 3.52 6.55 3.51C6.75 3.49 6.98 3.65 7.45 3.97L18.5 11.38C18.89 11.64 19.09 11.77 19.15 11.94C19.21 12.08 19.21 12.24 19.15 12.38C19.09 12.55 18.89 12.68 18.5 12.94L7.45 20.35C6.98 20.67 6.75 20.82 6.55 20.81C6.38 20.8 6.22 20.71 6.12 20.58C6 20.42 6 20.14 6 19.57V4.75Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

PlayIcon.displayName = 'PlayIcon';
