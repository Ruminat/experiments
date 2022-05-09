import { render, TemplateResult } from "lit";
import { appExperimentsRoutes } from "./apps/experiments/pages";
import { page404Loader } from "./apps/experiments/pages/404/route";
import { appJapaneseRoutes } from "./apps/japanese/pages";
import { TPageDefinition, TPageLoader } from "./components/rm-page/definitions";
import { mainStyles } from "./styles/main";
import { appendStyleToHead } from "./styles/utils";

appendStyleToHead(mainStyles);

const routes = [
  ...appExperimentsRoutes,
  ...appJapaneseRoutes,
];

async function loadCurrentPageView(currentPath: string): Promise<TemplateResult> {
  for (const route of routes) {
    const pathRegExp = new RegExp(`^${route.path}$`);
    if (pathRegExp.test(currentPath)) {
      const pageDefinition = await loadPageDefinition(route.loader);
      return pageDefinition.render();
    }
  }

  const pageDefinition = await loadPageDefinition(page404Loader);
  return pageDefinition.render();
}

async function loadPageDefinition(loader: TPageLoader): Promise<TPageDefinition> {
  const pageModule = await loader();
  const pageDefinition = pageModule.default;
  return pageDefinition;
}

loadCurrentPageView(location.pathname).then((result) => {
  render(result, document.body);
});
