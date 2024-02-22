import { SpinnerLoading } from './spinner-loading';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export const TaskInifiniteScrollSkeleton = () => {
  return (
    <div
      className={`${shimmer} flex w-full flex-col items-start justify-start gap-6`}
    >
      <div className="absolute self-center">
        <SpinnerLoading />
      </div>
    </div>
  );
};
