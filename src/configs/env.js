import { dev, preprod, prod, stg } from "env";
var env = {
  dev,
  stg,
  preprod,
  prod,
};
export const envType = "prod";
export default env[envType];
