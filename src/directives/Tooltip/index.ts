import { noChange } from "lit";
import {Directive, directive, ElementPartInfo, PartInfo, PartType} from "lit/directive.js";
import tippy from "tippy.js";


// Define directive

class TooltipDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);

    console.log("SUS", { type: PartType, partInfo });

    if (partInfo.type !== PartType.ELEMENT) {
      throw new Error("The `tooltip` directive must be applied to an element!");
    }

    // const jija = partInfo as ElementPartInfo;

    console.log("MyDirective created", partInfo);

    tippy(partInfo.element, { content: "JIJA" });
  }

  render(content: string) {
    return noChange;
  }

}

// Create the directive function

export const tooltip = directive(TooltipDirective);


// Use directive

// const template = html`<div>${hello()}</div>`;
