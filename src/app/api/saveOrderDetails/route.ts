import connectToDatabase from "@/lib/connectToDatabase";
import orderModel from "@/lib/model/order";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    await connectToDatabase();
    const body = await req.json();
    try {
        const data = await orderModel.create(body);
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
}