import cartModel from "@/lib/model/cart";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    try {
        const data = await cartModel.find();
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