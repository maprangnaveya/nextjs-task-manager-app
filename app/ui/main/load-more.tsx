'use client';

import Image from 'next/image';

export function LoadMore() {
  return (
    <>
      <section>
        <div>
          <Image src="./spinner.svg" alt="spinner" width={50} height={50} />
        </div>
      </section>
    </>
  );
}
