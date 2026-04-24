import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

function toObjectId(id) {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return new ObjectId(id);
}

async function resolveId(params) {
    const { id } = await params;
    const _id = toObjectId(id);

    if(!_id) {
        return { _id: null, error: NextResponse.json({error: 'Invalid ID'}, { status: 400 })};
    }

    return { _id, error: null};
}

export async function GET(request, { params }) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const records = await getCollection('records');

    const record = await records.findOne({ _id });

    if (!record) {
        return NextResponse.json({ error: 'Not Found'}, {status: 404});
    }

    return NextResponse.json(record);
}

export async function PUT(request, {params}) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const body = await request.json();
    delete body._id;

    const records = await getCollection('records');

    const updatedRecord = await records.findOneAndUpdate(
        { _id }, 
        { $set: body }, 
        { returnDocument: 'after' }
    )

    if (!updatedRecord) {
        return NextResponse.json({ error: 'Not found'}, {status: 404});
    }

    return NextResponse.json(updatedRecord);
}

export async function DELETE(request, { params }) {
    const {_id, error} = await resolveId(params);
    if (error) {
        return error;
    }

    const records = await getCollection('records');

    const { deletedCount } = await records.deleteOne({ _id });

    if (deletedCount === 0) {
        return NextResponse.json({error: 'Not Found'}, { status: 404});
    }

    return NextResponse.json({ deleted: _id.toString()});
}