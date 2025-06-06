import { BUILD } from '@app-data';
import { globalStyles } from '@app-globals';
import { supportsConstructableStylesheets } from '@platform';
import { CMP_FLAGS } from '@utils';

import type * as d from '../declarations';

export function createShadowRoot(this: HTMLElement, cmpMeta: d.ComponentRuntimeMeta) {
  const shadowRoot = BUILD.shadowDelegatesFocus
    ? this.attachShadow({
        mode: 'open',
        delegatesFocus: !!(cmpMeta.$flags$ & CMP_FLAGS.shadowDelegatesFocus),
      })
    : this.attachShadow({ mode: 'open' });

  /**
   * If constructable stylesheets are supported, we can use them to
   * add the global styles to the shadow root.
   */
  if (supportsConstructableStylesheets) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(globalStyles);
    shadowRoot.adoptedStyleSheets.push(sheet);
  }
}
