import { pageAboutRoutes } from "./about/route";
import { pageHomeRoutes } from "./home/route";

export const appExperimentsRoutes = [
  ...pageHomeRoutes,
  ...pageAboutRoutes,
];
