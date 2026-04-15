import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const TABLE = "notes";

export const handler = async (event) => {
  try {
    const method =
      event.requestContext?.http?.method || event.httpMethod;

    if (method === "POST") {
      const body = JSON.parse(event.body || "{}");

      const item = {
        id: Date.now().toString(),
        note: body.note
      };

      await dynamo.send(new PutCommand({
        TableName: TABLE,
        Item: item
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(item)
      };
    }

    if (method === "GET") {
      const data = await dynamo.send(new ScanCommand({
        TableName: TABLE
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(data.Items || [])
      };
    }

    // 🔥 DELETE yahi andar aayega
    if (method === "DELETE") {
      const id = event.pathParameters?.id;

      await dynamo.send(new DeleteCommand({
        TableName: TABLE,
        Key: { id }
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Deleted successfully 🔥" })
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};