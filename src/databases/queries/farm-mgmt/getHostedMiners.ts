import { gql } from "@apollo/client/core";
import { getHostedMinerGraphSchemaName } from "../../environment-tables";
import { Environment } from "wemine-apis";
import { makeGraphQLInputCompatible } from "../../json-manipulation";

const MAX_NUM_OF_MINER_IDS = 600;

export function getHostedMiners({
  env,
  query,
}: {
  env: Environment;
  query: Omit<any, "_id">;
}) {
  const schemaName = getHostedMinerGraphSchemaName(env, {
    forManyDocuments: true,
  });
  const compatibleQuery = makeGraphQLInputCompatible(query);
  return gql`
  query {
    ${schemaName}(query: ${compatibleQuery}, limit: ${MAX_NUM_OF_MINER_IDS}, sortBy: FRIENDLYMINERID_ASC) {
      _id
      API
      ipAddress
      friendlyMinerId
      macAddress
      status {
        lastOnlineDate
        networkStatus
        poolIsBeingSwitched
        isFarmManaged
        operatingError
      }
      miner {
        marketDetails {
          model
          description
          efficiency
          wattage
          expectedHashrate
          coin {
            symbol
          }
        }
        operationDetails {
          expectedHashRateRange {
            minimum
            maximum
          }
          expectedFanSpeedRange {
            minimum
            maximum
          }
          expectedInletTempRange {
            minimum
            maximum
          }
          expectedOutletTempRange {
            minimum
            maximum
          }
        }
      }
      powerController {
        managementMetadata {
          friendlyPowerControllerId
        }
      }
    }
  }`;
}
