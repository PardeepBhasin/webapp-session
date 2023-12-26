import connectToDatabase from "@/lib/connectToDatabase";
import orderModel from "@/lib/model/order";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        await connectToDatabase();
        const data = await orderModel.find();
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