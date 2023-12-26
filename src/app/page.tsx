import ProductCardComponent from '@/components/ProductCard/ProductCard';
import { MenuIcon } from 'lucide-react';

const getProducts = async () => {
  // TODO - Send token as authorization header with Bearer
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchProducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json();
  return data;
}
export default async function Home() {
  const data = await getProducts();
  return (
    <div className='flex gap-4 m-2'>
      <div className='w-1/4 flex flex-col gap-3'>
        <div className='border-2'>
          <div className='flex flex-col gap-4 items-center p-6'>
            <MenuIcon />
            <h2 className='font-bold'>OUR MENU</h2>
            <span>Explore our range of delicious Pizzas, delivered in 30 minutes!</span>
          </div>
          <div className='border-t-2 text-red-500 text-center p-4'>DISCOVER PIZZA</div>
        </div>
        <div className='border-2'>
          <div className='flex flex-col gap-4 items-center p-6'>
            <MenuIcon />
            <h2 className='font-bold'>NEARBY STORE</h2>
            <span>Explore our range of delicious Pizzas, delivered in 30 minutes!</span>
          </div>
          <div className='border-t-2 text-red-500 text-center p-4'>FIND STORE</div>
        </div>
        <div className='border-2'>
          <div className='flex flex-col gap-4 items-center p-6'>
            <MenuIcon />
            <h2 className='font-bold'>BIRTHDAY PARTY</h2>
            <span>Explore our range of delicious Pizzas, delivered in 30 minutes!</span>
          </div>
          <div className='border-t-2 text-red-500 text-center p-4'>BOOK NOW</div>
        </div>
        <div className='border-2'>
          <div className='flex flex-col gap-4 items-center p-6'>
            <MenuIcon />
            <h2 className='font-bold'>CATERING</h2>
            <span>Explore our range of delicious Pizzas, delivered in 30 minutes!</span>
          </div>
          <div className='border-t-2 text-red-500 text-center p-4'>BOOK NOW</div>
        </div>
      </div>
      <div className='w-3/4 grid grid-cols-4 gap-2'>
        {
          data && data.map((item: any) => {
            return <ProductCardComponent key={Math.random()} item={item} />
          })
        }
      </div>
    </div>
  )
}
