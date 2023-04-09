import type { Product, Prisma } from '@prisma/client'
import { input, z } from 'zod'
import { prisma } from '../db'
import Result from '~/utils/ResultType'
import { NextApiRequest, NextApiResponse } from 'next'

type ProductCreate = Prisma.ProductGetPayload<{
    select: {
        vendorCode: true,
        weight: true,
        size: true,
        productName: true,
        productImg: true,
        price: true,
        categoryId: true,
        description: true,
        productId: true
    }
}>

const productCreateScheme = z.object({
    vendorCode: z.string(),
    weight: z.string(),
    size: z.string(),
    productName: z.string(),
    productImg: z.string(),
    price: z.number(),
    categoryId: z.string().uuid(),
    description: z.string(),
    productId: z.string().uuid()
}).strict() satisfies z.ZodType<ProductCreate>

const ProductController = {
    createProduct: async function(item: any): Promise<Result<Product>> {
        const result = productCreateScheme.safeParse(item);
        if (!result.success) return({ result: false, error: result.error.message, statusCode: 400 });
        else {
            try {
                const dt = result.data;
                const item = await prisma.product.create({
                    data: {
                        vendorCode: dt.vendorCode,
                        weight: dt.weight,
                        size: dt.size,
                        productName: dt.productName,
                        productImg: dt.productImg,
                        price: dt.price,                        
                        description: dt.description,
                        productId: dt.productId,
                        category: {
                            connect: {categoryId: dt.categoryId}
                        }
                    }
                });
                return({ result: true, data: item, statusCode: 200 });
            } catch (error) {
                return({ result: false, error: "ERROR: " + error, statusCode: 400 });
            }
        }
    },  
    
    getAll: async function(): Promise<Result<Product[]>> {
        const items = await prisma.product.findMany();
        return({ result: true, data: items, statusCode: 200 });
    }
}

export default ProductController;