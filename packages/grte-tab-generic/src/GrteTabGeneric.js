import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column'
import '@vaadin/vaadin-grid/vaadin-grid-filter-column'
import '@material/mwc-button/mwc-button';
import { dispatch } from 'grte-helpers/src/GrteHelpers'

export class GrteTabGeneric extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 25px;
        color: var(--grte-tab-generic-text-color, #000);
      }

      h2 {
        text-align: center;
      }

      vaadin-grid {
        width: 100%;
      }
      
      #col-buttons {
        text-align: right;
      }

      .text{
        --mdc-typography-button-text-transform:none;
      }


    `;
  }

  static get properties() {
    return {
      headerTable: { type: Array },
      dataTable: { type: Array },
      titleTable: { type: String }
    };
  }

  constructor() {
    super();
    this.titleTable = '';
    this.headerTable = [];
    this.dataTable = [];
  }

  firstUpdated() {
    if (this.dataTable && this.dataTable[0]) {
      this.shadowRoot.querySelector('vaadin-grid').items = this.dataTable;

      const columns = this.shadowRoot.querySelectorAll('vaadin-grid-column');
      columns[0].renderer = function(root, column, model) {
        root.innerHTML = `
        <div id="col-buttons" class="text">
          <mwc-button outlined data-id=${model.index} label="Modificar"></mwc-button>
          <mwc-button outlined data-id=${model.index} label="Eliminar"></mwc-button>
        </div>`;

        const wrapper = root.firstElementChild;

        const buttons = wrapper.querySelectorAll('mwc-button');
        // EDIT
        buttons[0].addEventListener('click', function({currentTarget}) {
          const { id: rowNo } = currentTarget.dataset;
          dispatch(this, 'grte-tab-generic-edit', { rowNo })
          console.log(`Editar la fila ${rowNo}`);
        });
        // DELETE
        buttons[1].addEventListener('click', function({currentTarget}) {
          const { id: rowNo } = currentTarget.dataset;
          dispatch(this, 'grte-tab-generic-delete', { rowNo })
          console.log(`Borrar la fila ${rowNo}`);
        });
      }
      
    }
  }

  getColumnsTemplate() {
    let i=0;
    return html`
          <vaadin-grid theme="row-stripes">
            ${
              this.dataTable && this.dataTable[0] && Object.keys(this.dataTable[0]).map(key => 
                html`<vaadin-grid-filter-column  auto-width flex-grow="0" path="${key}" header="${this.headerTable[i++]}"></vaadin-grid-filter-column>` 
               )
            }
            <vaadin-grid-column></vaadin-grid-column>
          </vaadin-grid>`;
  }

  getNoDataTemplate() {
    return html`
    <h2>No se han encontrado datos</h2>`;
  }

  render() {
    return html`
          <h2>${this.titleTable}</h2>
          ${this.dataTable && this.dataTable[0]
            ? this.getColumnsTemplate()
            : this.getNoDataTemplate()
            }`;
    }

}
