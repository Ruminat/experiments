import { TPageDefinition } from "../../../../components/rm-page/definitions";
import { preHTML } from "../../../../lib/lit/preHTML";
import { Page404View } from "./view";

const pageDefinition: TPageDefinition = {
  render: () => preHTML`<${Page404View}></${Page404View}>`,
};

export default pageDefinition;
