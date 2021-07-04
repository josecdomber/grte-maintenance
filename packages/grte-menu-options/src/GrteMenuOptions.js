import { html, css, LitElement } from 'lit-element';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

export class GrteMenuOptions extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0.5rem;
        color: var(--grte-menu-options-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      menuOptions: { type: Array }
    };
  }

  render() {
    return html`
      <mwc-list>
        ${this.menuOptions.map(item => html`<mwc-list-item>${item}</mwc-list-item>`)}
      </mwc-list>
    `;
  }
}
