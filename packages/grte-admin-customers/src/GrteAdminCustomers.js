import { html, css, LitElement } from 'lit-element';
import 'grte-tab-generic/grte-tab-generic';
import 'grte-modal-edit-clients/grte-modal-edit-clients';
import '@vaadin/vaadin-confirm-dialog';

export class GrteAdminCustomers extends LitElement {

  static get properties() {
    return {
      headerTable: { type: Array },
      dataTable: { type: Array },
      titleTable: { type: String },
      _isOpenedModalDelete: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.dataTable = [];
    this._isOpenedModalDelete=false;
    this._messageDeleteModal
  }

  firstUpdated() {
    this._templateModalEdit = this.shadowRoot.querySelector('grte-modal-edit-clients');
  }

  get _tabGenericTemplate() {
    return html`
      <grte-tab-generic
        titleTable=${this.titleTable}
        .headerTable=${this.headerTable}
        .dataTable=${this.dataTable}
        @grte-tab-generic-edit=${this._openEditModal}
        @grte-tab-generic-delete=${this._openDeleteModal}
      ></grte-tab-generic>
    `;
  }

  get _modalEditTemplate() {
    return html`
    <grte-modal-edit-clients></grte-modal-edit-clients>
    `;
  }

  get _modalDeleteTemplate() {
    return html`
    <vaadin-confirm-dialog
        header="Eliminar Clientes"
        message="${this._messageDeleteModal}"
        confirm-text="Eliminar"
        cancel
        ?opened=${this._isOpenedModalDelete}
        cancel-text="Cancelar"
        @opened-changed=${this._cambioModal}
        @confirm=${this._dataDelete}
        @cancel=${this._cancelModal}      
    
    ></vaadin-confirm-dialog>
    `;
    
  }

  _cambioModal(event) {
    if(!event.detail.value) { this._isOpenedModalDelete = false };
  }

  _openEditModal({ detail }) {
    console.log('Fila seleccionada ', detail.rowNo)
    this._templateModalEdit.customerData=this._getCustomerData(detail.rowNo);
    this._templateModalEdit.open();
  }

  _openDeleteModal({ detail }) {
    this._messageDeleteModal=`¿Desea eliminar a ${this._getCustomerName(detail.rowNo)} de la base de datos?`
    this._isOpenedModalDelete=true;
    console.log('Fila seleccionada ', detail.rowNo)
  }

  _getCustomerData(rowNo) {
    return this.dataTable[rowNo];
  }

  _getCustomerName(rowNo) {
    return this.dataTable[rowNo].name;
  }

  render() {
    return html`
      ${this._tabGenericTemplate}
      ${this._modalEditTemplate}
      ${this._modalDeleteTemplate}
    `;
  }
}
