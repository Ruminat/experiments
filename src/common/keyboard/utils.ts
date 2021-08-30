import { EControlKey, EKeyboardKeyCodes } from "./definitions";

export function isEnterOnly(event: KeyboardEvent): boolean {
  return event.code === EKeyboardKeyCodes.ENTER && withoutControlKeys(event);
}

export function withoutControlKeys(event: KeyboardEvent): boolean {
  return withControlKeys(event, []);
}

export function withControlKeys(event: KeyboardEvent, controlKeys: EControlKey[]): boolean {
  const shift = controlKeys.includes(EControlKey.META) === event.shiftKey;
  const ctrl = controlKeys.includes(EControlKey.CTRL) === event.ctrlKey;
  const alt = controlKeys.includes(EControlKey.ALT) === event.altKey;
  const meta = controlKeys.includes(EControlKey.META) === event.metaKey;
  return shift && ctrl && alt && meta;
}
