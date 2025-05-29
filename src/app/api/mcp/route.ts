import { type NextRequest, NextResponse } from 'next/server';
import {
  addDocument,
  getDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
  createQueryConstraints,
  type FirestoreCollection,
} from '@/lib/firebaseUtils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') as FirestoreCollection;
    const id = searchParams.get('id');
    
    if (!collection) {
      return NextResponse.json(
        { error: 'Collection parameter is required' },
        { status: 400 }
      );
    }
    
    // 単一ドキュメント取得
    if (id) {
      const data = await getDocument(collection, id);
      if (!data) {
        return NextResponse.json(
          { error: `Document with ID ${id} not found in ${collection}` },
          { status: 404 }
        );
      }
      return NextResponse.json({ data });
    }
    
    // コレクション全体を取得
    const whereField = searchParams.get('whereField') || undefined;
    const whereOperator = searchParams.get('whereOperator') as '==' | '!=' | '>' | '>=' | '<' | '<=' || undefined;
    const whereValue = searchParams.get('whereValue') || undefined;
    const orderByField = searchParams.get('orderByField') || undefined;
    const orderDirection = searchParams.get('orderDirection') as 'asc' | 'desc' || undefined;
    const limitCount = searchParams.get('limit') ? Number.parseInt(searchParams.get('limit') || '0', 10) : undefined;
    
    const constraints = createQueryConstraints({
      whereField,
      whereOperator,
      whereValue,
      orderByField,
      orderDirection,
      limitCount,
    });
    
    const data = await getDocuments(collection, constraints);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Firestore' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { collection, data } = await request.json();
    
    if (!collection || !data) {
      return NextResponse.json(
        { error: 'Collection and data are required' },
        { status: 400 }
      );
    }
    
    const docId = await addDocument(collection as FirestoreCollection, data);
    return NextResponse.json({ id: docId }, { status: 201 });
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json(
      { error: 'Failed to add document to Firestore' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { collection, id, data } = await request.json();
    
    if (!collection || !id || !data) {
      return NextResponse.json(
        { error: 'Collection, id, and data are required' },
        { status: 400 }
      );
    }
    
    await updateDocument(collection as FirestoreCollection, id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { error: 'Failed to update document in Firestore' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection') as FirestoreCollection;
    const id = searchParams.get('id');
    
    if (!collection || !id) {
      return NextResponse.json(
        { error: 'Collection and id parameters are required' },
        { status: 400 }
      );
    }
    
    await deleteDocument(collection, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to delete document from Firestore' },
      { status: 500 }
    );
  }
} 