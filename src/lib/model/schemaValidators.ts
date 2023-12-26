import { z } from 'zod';

export const productSchemaValidator = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        ingredients: z.array(z.string()),
        image: z.string()
    })
)

export const cartSchemaValidator = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    ingredients: z.array(z.string()),
    image: z.string(),
    status: z.string()
}
)