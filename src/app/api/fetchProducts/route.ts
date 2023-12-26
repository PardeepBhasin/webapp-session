import connectToDatabase from "@/lib/connectToDatabase";
import productModel from "@/lib/model/product";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    // TODO - Read authorization header from headers and split the authorization header and pull token after spliting
    try {
        const data = await productModel.find({
            status: 'approved'
        });
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