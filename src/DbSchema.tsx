import { Parser } from "@dbml/core";
import { db1 } from "./fixtures/db1.dbml";

export function DbSchema() {
  const { db } = useDbSchema();

  console.log("**", db.schemas[0].tables);

  return (
    <div>
      {db.schemas[0].tables.map((table) => (
        <DbTable key={table.name} table={table} />
      ))}
    </div>
  );
}

function useDbSchema() {
  const db = Parser.parse(db1, "dbml");

  return {
    db,
  };
}

function DbTable({ table }: { table: any }) {
  return (
    <div>
      <div>{table.name}</div>
      <ul>
        {table.fields.map((field) => (
          <DbField key={field.name} field={field} />
        ))}
      </ul>
    </div>
  );
}

function DbField({ field }: { field: any }) {
  return <li>{field.name}</li>;
}
