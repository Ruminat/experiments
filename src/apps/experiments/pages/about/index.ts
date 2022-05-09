import { TPageDefinition } from "../../../../components/rm-page/definitions";
import { preHTML } from "../../../../lib/lit/preHTML";
import { PageAboutView } from "./view";

const pageDefinition: TPageDefinition = {
  render: () => preHTML`<${PageAboutView}></${PageAboutView}>`,
};

export default pageDefinition;
