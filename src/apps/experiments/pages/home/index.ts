import { TPageDefinition } from "../../../../components/rm-page/definitions";
import { preHTML } from "../../../../lib/lit/preHTML";
import { PageHomeView } from "./view";

const pageDefinition: TPageDefinition = {
  render: () => preHTML`<${PageHomeView}></${PageHomeView}>`,
};

export default pageDefinition;
