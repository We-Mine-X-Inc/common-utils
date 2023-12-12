import { gql } from "@apollo/client";
import { Environment } from "wemine-apis";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";

export function insertMiningWork({
  env,
  data,
}: {
  env: Environment;
  data: any;
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
