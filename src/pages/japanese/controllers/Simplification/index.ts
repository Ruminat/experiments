import { ReactiveController, ReactiveControllerHost } from "lit";
import { processJapaneseText } from "../../models/Simplification/api";
import { TSimplifiedResult } from "../../models/Simplification/definition";
import { fromBackendSimplifiedResult } from "../../models/Simplification/schema";

export class SimplificationController implements ReactiveController {
  protected host: ReactiveControllerHost;

  public isLoading = false;

  public result?: TSimplifiedResult;

  public error?: string = "";

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  public hostConnected() {}

  public hostDisconnected() {}

  public async simplify(sentence: string): Promise<void> {
    if (this.isLoading) return;

    const text = sentence.trim();

    if (text === "") {
      this.error = "";
      this.result = undefined;
      this.host.requestUpdate();
      return;
    }

    this.isLoading = true;
    this.error = "";
    this.host.requestUpdate();

    try {
      const result = await processJapaneseText(text);
      if (result instanceof Error) throw result;

      this.result = fromBackendSimplifiedResult(result);
      this.isLoading = false;
    } catch (error) {
      console.log(`simplify(${sentence}) errror:`, error);
      this.error = (error as Error).message;
    } finally {
      this.host.requestUpdate();
    }
  }
}
