import { gql } from "@apollo/client";
import { Environment, MiningWork } from "wemine-apis";
import { getMiningWorkGraphSchemaName } from "../../environment-tables";

export function insertMiningWork(env: Environment, miningWork: MiningWork) {
  const newMiningWork = { ...miningWork, _id: undefined };
  return gql`
  mutation InsertOneMiningWork {
    insertOne${getMiningWorkGraphSchemaName(env, {
      embeddedInFunction: true,
    })}(
      data: ${{ ...newMiningWork }}) {
        _id
    }
  }`;
}
