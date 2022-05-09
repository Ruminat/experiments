import { TPageLoader } from "../../../../components/rm-page/definitions";

const loader: TPageLoader = () => import(/* webpackChunkName: "page-about" */"./index");

export const pageAboutRoutes = [
  { name: "about", path: "/about", loader },
];

export function getPageAboutUrl(): string {
  return "/about";
}
