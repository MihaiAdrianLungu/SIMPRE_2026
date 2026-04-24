import { getCollection } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const records = await getCollection('records');
    const allRecords = await records.find({}).toArray();
    return NextResponse.json(allRecords);
}

export async function POST(request) {
    const body = await request.json();

    const records = await getCollection('records');

    const { insertedId } = await records.insertOne(body);

    return NextResponse.json({_id: insertedId, ...body }, { status: 201});
}