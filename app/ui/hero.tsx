import { auth } from '@/auth';

export const Hero = async () => {
  const session = await auth();
  console.log('!!! session: ', session);
  return (
    <div className="h-10 px-6 py-20">
      <h1 className=" text-4xl font-bold">
        Hello There, {session?.user?.name || '...'}
      </h1>
      <p>Have a nice day!</p>
    </div>
  );
};
