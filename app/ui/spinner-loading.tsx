import Image from 'next/image';
import { LegacyRef } from 'react';

export const SpinnerLoading = () => {
  return <Image src="./spinner.svg" alt="spinner" width={50} height={50} />;
};
