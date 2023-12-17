import { gql } from "@apollo/client";
import { UpdateDataObject } from "../update-data-obj";
import { getMinerErrorGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";

export function insertMinerError({
  env,
  data,
}: {
  env: Environment;
  data: UpdateDataObject;
}) {
  return gql`
    mutation {
      insertOne${getMinerErrorGraphSchemaName(env, {
        embeddedInFunction: true,
      })}(data: ${JSON.stringify(data)}) {
        _id
        stackTrace
      }
    }
  `;
}
