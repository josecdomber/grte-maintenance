import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
// import { dispatch } from 'grte-helpers/src/GrteHelpers'
import 'grte-admin-customers/grte-admin-customers';
import '@material/mwc-tab-bar';
import '@material/mwc-tab';

class ViewAdmin extends LitElement {

  static get properties() {
    return {
      dataCustomers: { type: Array},
      _tabIndex: { type: Number},
      _doneFirstLoad: { type: Boolean }
    };
  }

  constructor() {
    super();
    this._doneFirstLoad = false;
    this.dataCustomers = [];
    // this.dataCustomers = [
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez Martínez-Cobo',
    //     'phone': '780909887',
    //     'email': 'alfredopmtez200@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    //   {
    //     'name': 'Alfredo Pérez',
    //     'phone': '780909887',
    //     'email': 'alfredop@gmail.com' 
    //   },
    //   {
    //     'name': 'Luis López',
    //     'phone': '780909000',
    //     'email': 'llopez@gmail.com' 
    //   },
    // ];
  }

  updated() {
    if (!this._doneFirstLoad) {
      this._doneFirstLoad = true;
      this.dispatch(this, 'view-admin-data-load', {})
    }
  }

  get _adminCustomersTemplate() {
    const headerTable = ['Nombre', 'Teléfono', 'email'];
    const titleTable = "Clientes";
    return html`
    <grte-admin-customers
      titleTable=${titleTable}
      .headerTable=${headerTable}
      .dataTable=${this.dataCustomers}
    >
    </grte-admin-customers>
    `;
  }

  render() {
    return html`
    <h1>Administración</h1>
    <mwc-tab-bar @MDCTabBar:activated=${this._activatedTab}>
      <mwc-tab label="Clientes"></mwc-tab>
      <mwc-tab label="Grupos"></mwc-tab>
      <mwc-tab label="Platos"></mwc-tab>
      <mwc-tab label="Informes"></mwc-tab>
      <mwc-tab label="Mesas"></mwc-tab>
      <mwc-tab label="Otra más"></mwc-tab>

    </mwc-tab-bar>
    ${this._tabIndex === 0 ? html`${this._adminCustomersTemplate}` : nothing}
    ${this._tabIndex === 1 ? html`<p>Tab Grupos</p>` : nothing}
    ${this._tabIndex === 2 ? html`<p>Tab Platos</p>` : nothing}
    ${this._tabIndex === 3 ? html`<p>Tab Informes</p>` : nothing}
    ${this._tabIndex === 4 ? html`<p>Tab Mesas</p>` : nothing}
    ${this._tabIndex === 5 ? html`<p>Tab Otra más</p>` : nothing}
    `
  }

  _activatedTab(customEvent) {
    const { index } = customEvent.detail;
    this._tabIndex = index;
    console.log('Indice: ', index);
  }

  /**
 * Dado un elemento HTML emite un evento nativo
 * @param {HTMLElement} element Nodo HTML que emitira el evento
 * @param {String} event Nombre del evento
 * @param {Any} detail Payload del evento
 * @param {Boolean} bubbles
 * @param {Boolean} composed
 */
dispatch(element, event, detail, bubbles = true, composed = true) {
  element.dispatchEvent(
    new CustomEvent(event, {
      detail,
      bubbles,
      composed,
    }),
  );
}


}
customElements.define('view-admin', ViewAdmin);