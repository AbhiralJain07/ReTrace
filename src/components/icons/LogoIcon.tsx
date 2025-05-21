import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>ReTrace Logo</title>
      <path d="M10.5 19.5A7.5 7.5 0 0 0 18 12h3" />
      <path d="M13.5 4.5A7.5 7.5 0 0 0 6 12H3" />
      <circle cx="12" cy="12" r="2" />
      <path d="m17 17 2.5 2.5" />
      <path d="m7 7-2.5-2.5" />
    </svg>
  );
}
