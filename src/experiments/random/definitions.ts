import { TRmTab } from "../../components/rm-tabs/definitions";

export const tagName = "experiments-random";

export enum EPageRandomTabs {
  YES_NO = "yes-no",
  RANDOM_NUMBER = "random-number",
}

export const pageRandomTabs: TRmTab[] = [
  { name: EPageRandomTabs.YES_NO, label: "Yes/No" },
  { name: EPageRandomTabs.RANDOM_NUMBER, label: "Random Number" },
];
