import { NextResponse } from "next/server";
import productModel from "@/lib/model/product";
import { productSchemaValidator } from "@/lib/model/schemaValidators";
import connectToDatabase from "@/lib/connectToDatabase";

export async function POST(req: Request, res: Response) {
    await connectToDatabase();
    const body = await req.json();
    try {
        try {
            const validatedData = productSchemaValidator.safeParse(body);
            if (!validatedData.success) {
                return NextResponse.json('schema validation fails', {
                    status: 400,
                    statusText: 'failure'
                })
            }
            const data = await productModel.create(validatedData.data);
            return NextResponse.json(data, {
                status: 200,
                statusText: 'success'
            })
        } catch (error) {
            return NextResponse.json(error, {
                status: 400,
                statusText: 'failure'
            })
        }
    } catch (error) {
        return NextResponse.json(error, {
            status: 400,
            statusText: 'failure'
        })
    }
}