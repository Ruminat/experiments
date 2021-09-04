import { TemplateResult } from "lit-element";

export const tagName = "rm-tabs";

export type TRmTab = {
  name: string;
  label: string | TemplateResult;
  href?: string;
  onClick?: (name: string, label: string | TemplateResult, href?: string) => void;
}
