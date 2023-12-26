import { create } from 'zustand';
import { z } from 'zod';
import { productSchemaValidator } from '../model/schemaValidators';

const useStore = create((set) => ({
    cartDetails: [],
    setCartDetails: (cartData: z.infer<typeof productSchemaValidator>) => set((state: any) => {
        return { cartDetails: [...state.cartDetails, ...cartData] };
    }),
}))

export default useStore;