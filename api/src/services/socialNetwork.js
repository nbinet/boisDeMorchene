import { socialNetwork } from "../db/schema.js";
import { db } from "../db/setup.js";

export const findAllSocialNetwork = db.select().from(socialNetwork).prepare();