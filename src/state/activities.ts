import { customers } from "@/app/dashboard/customers/constant";
import { atom } from "recoil";


export const activityState = atom({
  key: "activitySatte",
  default: customers
});