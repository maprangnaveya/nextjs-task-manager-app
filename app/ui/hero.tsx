import { auth } from '@/auth';

export const Hero = async () => {
  const session = await auth();
  return (
    <div className="h-fit p-2 md:p-6">
      <h1 className="text-4xl font-bold">
        Hello There, {session?.user?.name || '...'}
      </h1>
      <p>Have a nice day!</p>
    </div>
  );
};
