import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  console.warn('Warning: MONGODB_URI environment variable is not defined.');
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  if (client) {
    return client;
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDb() {
  const clientInstance = await getMongoClient();
  return clientInstance.db('logic_museum');
}

interface MongoDoc {
  _id: ObjectId | string;
  [key: string]: unknown;
}

// Map MongoDB _id (ObjectId) to string id for compatibility with the rest of the codebase
function mapDoc(doc: MongoDoc | null | undefined) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return {
    id: _id.toString(),
    ...rest
  };
}

export async function getMechanisms() {
  try {
    const db = await getDb();
    const collection = db.collection('programming_logic_items');
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
    return docs.map(doc => mapDoc(doc as unknown as MongoDoc));
  } catch (error) {
    console.error('MongoDB getMechanisms error:', error);
    return [];
  }
}

export async function addMechanism(item: { title: string; description: string; code_example: string; category: string }) {
  try {
    const db = await getDb();
    const collection = db.collection('programming_logic_items');
    const newItem = {
      title: item.title,
      description: item.description,
      code_example: item.code_example,
      category: item.category,
      created_at: new Date().toISOString()
    };
    const result = await collection.insertOne(newItem);
    return { id: result.insertedId.toString(), ...newItem };
  } catch (error: unknown) {
    console.error('MongoDB addMechanism error:', error);
    const message = error instanceof Error ? error.message : 'Failed to add mechanism';
    throw new Error(message);
  }
}

export async function deleteMechanism(id: string) {
  try {
    const db = await getDb();
    const collection = db.collection('programming_logic_items');
    
    let query: Record<string, unknown> = { _id: id };
    if (ObjectId.isValid(id)) {
      query = {
        $or: [
          { _id: new ObjectId(id) },
          { _id: id }
        ]
      };
    }
    
    await collection.deleteOne(query);
    return { success: true };
  } catch (error: unknown) {
    console.error('MongoDB deleteMechanism error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete mechanism';
    throw new Error(message);
  }
}

export async function getMessages() {
  try {
    const db = await getDb();
    const collection = db.collection('contact_messages');
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();
    return docs.map(doc => mapDoc(doc as unknown as MongoDoc));
  } catch (error) {
    console.error('MongoDB getMessages error:', error);
    return [];
  }
}

export async function addMessage(item: { name: string; email: string; message: string }) {
  try {
    const db = await getDb();
    const collection = db.collection('contact_messages');
    const newItem = {
      name: item.name,
      email: item.email,
      message: item.message,
      created_at: new Date().toISOString()
    };
    const result = await collection.insertOne(newItem);
    return { id: result.insertedId.toString(), ...newItem };
  } catch (error: unknown) {
    console.error('MongoDB addMessage error:', error);
    const message = error instanceof Error ? error.message : 'Failed to send message';
    throw new Error(message);
  }
}

export async function deleteMessage(id: string) {
  try {
    const db = await getDb();
    const collection = db.collection('contact_messages');
    
    let query: Record<string, unknown> = { _id: id };
    if (ObjectId.isValid(id)) {
      query = {
        $or: [
          { _id: new ObjectId(id) },
          { _id: id }
        ]
      };
    }
    
    await collection.deleteOne(query);
    return { success: true };
  } catch (error: unknown) {
    console.error('MongoDB deleteMessage error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete message';
    throw new Error(message);
  }
}
