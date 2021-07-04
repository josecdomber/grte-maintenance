import { LitElement, html, css } from 'lit-element';
import { dispatch } from 'grte-helpers/src/GrteHelpers'
// Import necesary DMs and API
import 'grte-x-api-grte/grte-x-api-grte';
// Import sub-managers
import './ManagerDrawer.js';
import './ManagerAdminCustomers.js';

class Managerflow extends LitElement {

  static get properties() {
    return {
      // Objeto donde se almacenan todos los datos de cada vista (Contenido)
      _props: { type: Object },
    };
  }

  constructor() {
    super();
    this._dmAPIGrte = null;
    this._managerDrawer = null;
    this._managerAdminCustomers = null;
  }

    // Cuando cambian las props emito un evento para que las vistas se actualizen
    updated(changedProperties) {
      // Si cambian los datos del Routes emito un evento con los nuevos datos
      if (changedProperties.has('_props')) {
        dispatch(this, 'manager-flow-properties-change', this._props);
      }
    }

  async firstUpdated() {
    this._setupDataManagers();
    this._setupCustomManagers();
    this._setupListeners();

    await this.requestUpdate();

    // Emito unos eventos iniciales para que desde fuera se actualizen los datos por primera vez
    dispatch(this, `grte-grte-flow-drawer-change`, this._managerDrawer.getMenuOptions());

    // Espero a que se complete el primer Update
    await this.updateComplete;
  }

  /**
   * Setup DM and DP
   */
  _setupDataManagers() {
    this._dmAPIGrte = this.shadowRoot.querySelector('grte-x-api-grte');
  }

  /** 
   * Setup custom managers to view or operative
  */
  _setupCustomManagers() {
    this._managerDrawer = this.shadowRoot.querySelector('manager-drawer');
    this._managerAdminCustomers = this.shadowRoot.querySelector('manager-admin-customers');
  }

  /**
   * Events capture for maintenance
   */
  _setupListeners() {
    const eventActions = {
      // 'Evento-recibido-en-manager-flow': ({ detail }) =>
      //   this._managerGenerico.metodoDelManager(detail),
      'view-admin-data-load': () =>
        this._managerAdminCustomers.getCustomersList(),
      'grte-modal-edit-clients-save': (detail) =>
        this._managerAdminCustomers.updateCustomer( detail )
    };

    for (const [key, value] of Object.entries(eventActions)) {
      this.addEventListener(key, value);
    }
  }

  static get _dmApiGrteTemplate() {
    return html`
          <grte-x-api-grte></grte-x-api-grte>
      `;
  }

  get _managerDrawerTemplate() {
    return html`
        <manager-drawer .dmAPIGrte="${this._dmAPIGrte}"></manager-drawer>
    `;
  }

  get _managerAdminCustomersTemplate() {
    return html`
      <manager-admin-customers .dmAPIGrte="${this._dmAPIGrte}"
        @grte-admin-customers-list-success="${this._onAdminCustomersListSuccess}"></manager-admin-customers>
    `;
  }

  /**
    * Se añade el listado de clientes para mostrar en la view de Administración
    * @param {Object} detail Detalle del evento
    */
  _onAdminCustomersListSuccess({ detail }) {
    this._addProp('admin', detail);
  }

  /**
 * Aniado datos a la variable _props
 * Tiene que sustituirse todo el objeto _props para que Lit se entere del cambio
 */
  _addProp(id, newValue) {
    const tempData = { ...this._props };
    tempData[id] = {
      ...tempData[id],
      ...newValue,
    };
    this._props = tempData;
  }

  render() {
    return html`
        ${Managerflow._dmApiGrteTemplate}
        ${this._managerDrawerTemplate}
        ${this._managerAdminCustomersTemplate}
        <slot></slot>
    `;
  }

}
customElements.define('manager-flow', Managerflow);