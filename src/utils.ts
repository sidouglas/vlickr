import { ClassNameValue, twMerge } from 'tailwind-merge';

export function getAspectRatio(w: number | string, h: number | string): [string, number, number] {
  const width = Number(w);
  const height = Number(h);
  // Calculate the greatest common divisor (GCD) of width and height
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor: number = gcd(width, height);

  // Calculate the aspect ratio
  const aspectWidth: number = width / divisor;
  const aspectHeight: number = height / divisor;

  return [`${aspectWidth}/${aspectHeight}`, aspectWidth, aspectHeight];
}

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(...inputs);
}

export function urlEncode(str: string): string {
  return encodeURIComponent(str).replace(/%20/g, '+');
}

export function urlDecode(str: string): string {
  return decodeURIComponent(str.replace(/\+/g, '%20'));
}
