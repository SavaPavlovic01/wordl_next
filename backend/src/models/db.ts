import { Client } from "pg";

async function init_db(){
    const client = new Client({
      connectionString: "postgres://postgres:123@127.0.0.1:5432/test",
    });
  
    await client.connect()
  
    return client 
}

export default init_db;