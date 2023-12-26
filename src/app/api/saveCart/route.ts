import { NextResponse } from "next/server";
import { cartSchemaValidator } from "@/lib/model/schemaValidators";
import connectToDatabase from "@/lib/connectToDatabase";
import cartModel from "@/lib/model/cart";
import { headers } from 'next/headers';

export async function POST(req: Request, res: Response) {
    await connectToDatabase();
    const headerList = headers();
    const authHeader = headerList.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const body = await req.json();
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Token verified successfully.");
        try {
            const validatedData = cartSchemaValidator.safeParse(body);
            if (!validatedData.success) {
                return NextResponse.json(`schema validation fails, ${validatedData}`, {
                    status: 400,
                    statusText: 'failure'
                })
            }
            console.log("Data validated", validatedData);
            const model = new cartModel(validatedData.data);
            const data = await model.save();
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