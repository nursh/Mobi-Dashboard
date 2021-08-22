import { Status, Request } from '../src/database';

/** Generate Campaign Id */
export function* campaignIdGenerator() {
  let i = 1;
  const prefix = "OG#";

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


/** Generate Campaign Dates */
function getRandomDateValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function getRandomDay(month: number) {
  switch(month) {
    case 1:
      return getRandomDateValue(1, 28);
    case 3:
    case 5:
    case 8:
    case 10:
      return getRandomDateValue(1, 30);
    default: 
      return getRandomDateValue(1, 31);
  }
}

export const getCampaignDate = () => {
  const year = 2021;
  const month = getRandomDateValue(0, 11);
  const day = getRandomDay(month);
  const minute = getRandomDateValue(0, 59);
  const hour = getRandomDateValue(0, 23);
  return new Date(year, month, day, hour, minute); 
}
/** End of Generate Campaign Dates */


const status = [Status.ACTIVE, Status.PENDING, Status.COMPLETED];
const request = [Request.ON_HOLD, Request.SUBMITTED];

export const getCampaignStatus = () => {
  return randomIndex(status) as Status;
}

export const getCampaignRequest = () => {
  return randomIndex(request) as Request;
}