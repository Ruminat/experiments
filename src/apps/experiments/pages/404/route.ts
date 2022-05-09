import { TPageLoader } from "../../../../components/rm-page/definitions";

export const page404Loader: TPageLoader = () => import(/* webpackChunkName: "page-404" */"./index");
