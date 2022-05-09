import { TPageLoader } from "../../../../components/rm-page/definitions";

const loader: TPageLoader = () => import(/* webpackChunkName: "page-home" */"./index");

export const pageHomeRoutes = [
  { name: "home", path: "/", loader },
];

export function getPageHomeUrl(): string {
  return "/";
}
