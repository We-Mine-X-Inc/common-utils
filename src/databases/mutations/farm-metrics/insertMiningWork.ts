import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";
import { UpdateDataObject as UpdateDataObject } from "../update-data-obj";

export function insertMiningWork({
  env,
  data,
}: {
  env: Environment;
  data: UpdateDataObject;
}) {
  return gql`
  mutation {
    insertOne${getMiningWorkGraphSchemaName(env, {
      embeddedInFunction: true,
    })}(data: ${data}) {
        _id
    }
  }`;
}
