import { TPageDefinition } from "../../../../components/rm-page/definitions";
import { preHTML } from "../../../../lib/lit/preHTML";
import { PageExperimentJapaneseView } from "./view";

const pageDefinition: TPageDefinition = {
  render: () => {
    return preHTML`<${PageExperimentJapaneseView}></${PageExperimentJapaneseView}>`;
  }
};

document.title = "Japanese Language Tools";

export default pageDefinition;
