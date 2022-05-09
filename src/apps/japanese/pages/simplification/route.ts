import { TPageLoader } from "../../../../components/rm-page/definitions";

const loader: TPageLoader = () => import(/* webpackChunkName: "page-simplification" */"./index");

export const pageJapaneseSimplificationRoutes = [
  { name: "simplification", path: "/japanese/simplification", loader }
];

export function getPageJapaneseUrl(): string {
  return "/japanese/simplification";
}
