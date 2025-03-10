import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Banner = () => {
  return (
    <div className='flex w-full flex-row gap-4'>
      <Card className='relative h-96 w-full rounded-lg border-none bg-gradient-to-r from-red-500 to-orange-500 text-white lg:w-1/2'>
        <CardHeader className='absolute bottom-2'>
          <CardTitle className='text-2xl font-bold'>
            Welcome to Vitube
          </CardTitle>
          <CardDescription className='text-base text-white'>
            Discover the new era of media sharing on Lens with Tape. A
            decentralized, user-centric approach to online media.
          </CardDescription>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
      <Card className='relative h-96 w-full rounded-lg border-none bg-gradient-to-r from-red-500 to-orange-500 text-white lg:w-1/4'>
        <CardHeader className='absolute bottom-2'>
          <CardTitle>Title of the #shorts</CardTitle>
          <CardDescription className='font-semibold text-white/90'>
            100K views
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='relative h-96 w-full rounded-lg border-none bg-gradient-to-r from-red-500 to-orange-500 text-white lg:w-1/4'>
        <CardHeader className='absolute bottom-2'>
          <CardTitle>Title of the #shorts</CardTitle>
          <CardDescription className='font-semibold text-white/90'>
            100K views
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
