import { html, css, LitElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-dialog';

export class GrteModalEditCustomers extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      opened: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.opened = false;
    this._noClose = true;
  }

  firstUpdated() {
    this._boundDialogRenderer = this.dialogRenderer.bind(this);
  }

  render() {
    return html`
      <vaadin-dialog
        noCloseOnOutsideClick

        ?opened=${this.opened}
        .renderer="${this._boundDialogRenderer}"
      >
      </vaadin-dialog>
    `;
  }

  dialogRenderer(root) {
    render(
      html`
        <h1>Modal para editar Clientes</h1>
        <button @click="${this._closeDialog.bind(this)}">Cerrar</button>`, 
      root
    );
  }

  _closeDialog() {
   this.opened = !this.opened;
  }
}
