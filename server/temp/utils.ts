import { Status, Request } from '../src/database';

/** Generate Campaign Id */
export function* campaignIdGenerator() {
  let i = 1;
  const prefix = "0G#";

  while (true) {
    let idS = i.toString().length;
    switch (idS) {
      case 1:
        yield `${prefix}00${i}`;
        break;
      case 2:
        yield `${prefix}0${i}`;
        break;
      case 3:
        yield `${prefix}${i}`;
        break;
      default:
        throw new Error("Number not allowed");
    }
    i += 1;
  }
}

const campaignIdIterator = campaignIdGenerator();
export const getCampaignId = () => {
  return campaignIdIterator.next().value as string;
};
/** End of generation of Campaign id */

function randomIndex(array: string[]) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

/** Generate Campaign Names */
const campaignNames = [
  "Clients VIP",
  "Clients VIP 02",
  "Clients VIP 03",
  "Clients Gold",
  "Clients Gold 02",
  "All Clients",
];

export const getCampaignName = () => randomIndex(campaignNames);
/** End of generation of campaign names */


const status = ["Active", "Pending", "Completed"];
const request = ["On Hold", "Submitted"];

export const getCampaignStatus = () => {
  return randomIndex(status) as Status;
}

export const getCampaignRequest = () => {
  return randomIndex(request) as Request;
}