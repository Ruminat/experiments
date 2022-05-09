import { TemplateResult } from "lit";

export const tagName = "rm-page";

export type TPageDefinition = {
  render: () => TemplateResult;
};

type TPageModule = {
  default: TPageDefinition;
};

export type TPageLoader = () => Promise<TPageModule>;
