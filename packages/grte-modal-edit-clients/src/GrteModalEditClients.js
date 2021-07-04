import { html, css, LitElement } from 'lit-element';
import '@vaadin/vaadin-confirm-dialog';
import '@vaadin/vaadin-form-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import { dispatch, isEmptyObject } from 'grte-helpers/src/GrteHelpers';

export class GrteModalEditClients extends LitElement {
    static get styles() {
      return css`
      #buttons {
        padding: 2rem;
      }
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
    this.customerData = {};
    this.opened = false;
    this._originalCustomerData = {};
  }

  open() {
    this._originalCustomerData = { ...this.customerData };
    this.opened = !this.opened;
  }

  render() {
    const { name = '', phone = 0, email = '' } = this.customerData || {};

    return html`
        <vaadin-confirm-dialog
        header="Modificar Clientes"
        confirm-text="Grabar"
        cancel
        cancel-text="Cancelar"
        ?opened=${this.opened} 
        @opened-changed=${this._cambioModal}
        @confirm=${this._dataSave}
        @cancel=${this._cancelModal}
        >

       <div id="modal">
         <vaadin-form-layout>
         <vaadin-text-field
           name="name"
           label="Nombre"
           value="${name}"
           @change="${this._changeField}"
         ></vaadin-text-field>
         <vaadin-text-field
           name="phone"
           label="Teléfono"
           value=${phone}
           @change="${this._changeField}"
         ></vaadin-text-field>
         <vaadin-text-field
           name="email"
           label="eMail"
           value=${email}
           @change="${this._changeField}"
         ></vaadin-text-field>
         </vaadin-form-layout>

        </div>

          <vaadin-button 
            slot="confirm-button"
            theme="primary"
            ?disabled=${!this._formChanged}
            @click=${this._dataSave}
          >Grabarlo</vaadin-button>

        </vaadin-confirm-dialog>
    `;
  }

  _cambioModal(event) {
    if(!event.detail.value) { this.opened = false };
  }

   _changeField( {currentTarget} ) {
    console.log(currentTarget.name, '  ', currentTarget.value );

    Object.keys(this.customerData).forEach(prop => {
      if (prop === currentTarget.name) { this.customerData[prop] = currentTarget.value } 
    })
    this.customerData = { ...this.customerData };
  }

  get _formChanged() {
    return !isEmptyObject(this.customerData) && JSON.stringify(this.customerData) !== JSON.stringify(this._originalCustomerData);
  }

  _dataSave() {
    console.log('Guardo datos y salgo ', this.customerData);
    dispatch(this, 'grte-modal-edit-clients-save', this.customerData);
    this._closeDialog();
  }

  _cancelModal() {
    console.log('Cancelo y salgo');
    dispatch(this, 'grte-modal-edit-clients-cancel', {});
  }

  _closeDialog() {
    this.opened = !this.opened;
  }  

}