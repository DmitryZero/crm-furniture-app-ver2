import type { Category, Prisma } from '@prisma/client'
import { input, z } from 'zod'
import { prisma } from '../db'
import Result from '~/utils/ResultType'
import { NextApiRequest, NextApiResponse } from 'next'

type CategoryCreate = Prisma.CategoryGetPayload<{
    select: {
        categoryId: true,        
        categoryName: true,
        parentCategoryId: true,
    }
}>

const categoryCreateScheme = z.object({
    categoryId: z.string().uuid(),
    categoryName: z.string(),
    parentCategoryId: z.string().uuid().nullable()
}).strict() satisfies z.ZodType<CategoryCreate>

const CategoryController = {
    async createCategory(item: any): Promise<Result<Category>> {   
        const result = categoryCreateScheme.safeParse(item);
        if (!result.success) {
           return ({result: false, error: result.error.message, statusCode: 404});
        } 
        else {
            try {
                const dt = result.data;
                const item = await prisma.category.create({data: {
                    categoryId: dt.categoryId,
                    categoryName: dt.categoryName,
                    parentCategory: {
                        connect: dt.parentCategoryId ? { categoryId: dt.parentCategoryId } : undefined
                    }
                }});     
                return ({result: true, data: item, statusCode: 200});           
            } catch (error) {
                return ({result: false, error:  "ERROR: " + error, statusCode: 400});
            }
        }
    }     
}

export default CategoryController;