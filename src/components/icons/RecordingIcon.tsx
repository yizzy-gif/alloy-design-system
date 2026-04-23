import type { SVGProps } from 'react';

export interface RecordingIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
}

export const RecordingIcon = ({ size = 24, color = 'currentColor', strokeWidth, ...props }: RecordingIconProps) => {
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
        d="M3 10L3 14M7.5 6L7.5 18M12 3V21M16.5 6V18M21 10V14"
        stroke={color as string}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

RecordingIcon.displayName = 'RecordingIcon';
