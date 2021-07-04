import { html, css, LitElement } from 'lit-element';
import { render } from 'lit-html';
import '@vaadin/vaadin-dialog';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';

export class GrteModalEditCustomers extends LitElement {
  static get styles() {
    return css`
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean },
      /**
       * Customer data object:
       * {
       *   name: 'Peter Wright',
       *   phone: 912343344,
       *   email: 'peterw@gmail.com'
       * }
       */
      customerData: { type: Object },
    };
  }

  constructor() {
    super();
    this._boundDialogRenderer = this.dialogRenderer.bind(this);
    this.customerData = {};
    this.opened = false;
  }

  open() {
    this.opened = !this.opened;
  }

  render() {
    return html`
        <vaadin-dialog 
        ?opened=${this.opened} 
        .renderer=${this._boundDialogRenderer}
        @opened-changed=${this._cambioModal}
        >
        </vaadin-dialog>
    `;
  }

  _cambioModal(event) {
    if(!event.detail.value) { this.opened = false };
  }

  dialogRenderer(root) {
    const { name = '', phone = 0, email = '' } = this.customerData || {};

    render(
      html`
       <style>
         #buttons {
           padding: 2rem;
         }
       </style>

       <div id="modal">
         <h1>Modal para editar Clientes</h1>
         <vaadin-form-layout>
         <vaadin-text-field
           id="name"
           name="name"
           label="Nombre"
           value=${name}
           @change="${this._changeField.bind(this)}"
         ></vaadin-text-field>
         <vaadin-text-field
           id="phone"
           name="phone"
           label="Teléfono"
           value=${phone}
           @change="${this._changeField.bind(this)}"
         ></vaadin-text-field>
         <vaadin-text-field
           id="email"
           name="email"
           label="eMail"
           value=${email}
           @change="${this._changeField.bind(this)}"
         ></vaadin-text-field>
         </vaadin-form-layout>

         <div id="buttons">
           <vaadin-button>Cancelar</vaadin-button>
           <vaadin-button @click="${this._closeDialog.bind(this)}">Guardar</vaadin-button>       
         </div>
        </div>
      `
      , root
    );
  }

  _changeField( {currentTarget} ) {
    console.log(currentTarget.name, '  ', currentTarget.value );
    Object.keys(this.customerData).forEach(prop => {
      if (prop === currentTarget.name) { this.customerData[prop] = currentTarget.value } 
    })
  }

  _closeDialog(e) {
    this.opened = !this.opened;
  }  
}
