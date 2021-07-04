import { html, css, LitElement } from 'lit-element';
import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import 'grte-menu-options/grte-menu-options';
// import router
import { Router } from '@vaadin/router';
// import views
import './ViewHome.js';
import './ViewAdmin.js';
import './ViewOtra.js';

import './ManagerFlow.js';

export class GrteFlow extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        height: 100%;
        min-width: 100%;
        font-family: var(--mdc-typography-font-family);
      }
      .drawer-content {
        padding: 0px 16px 0 16px;
      }
      
      .main-content {
        min-height: 300px;
        padding: 48px 18px 0 18px;
      }

      nav {
        display: flex;
        flex-direction: column;
      }

      a {
        padding: 0.5rem;
      }



    `;
  }

  static get properties() {
    return {
      _menuOptions: { type: Array },
    };
  }

  constructor() {
    super();
    this.drawerContent = 'Título menú';
    this._menuOptions = [];
    this._managerFlow = null;
    this._router = null;
  }

  listenView() {
    console.log('escuchadooooo')
  }

  async firstUpdated() {

    // this.addEventListener('view-admin-data-load', this.listenView);

    this._managerFlow = this.shadowRoot.querySelector('manager-flow');

    this._router = new Router(this.shadowRoot.querySelector('.main-content'));
    this._router.setRoutes([
      { name: 'home', path: '/', component: 'view-home' },
      { name: 'admin', path: '/admin', component: 'view-admin' },
      { name: 'otra', path: '/otra', component: 'view-otra' }
    ]);

    await this.requestUpdate();

    const mainContent = this.shadowRoot.querySelector('.main-content');

  }

  toggleDrawer() {
    const drawer = this.shadowRoot.querySelector('mwc-drawer');
    drawer.open = !drawer.open;
  }

  setProperties(event) {
    const propsByView = event.detail;
    console.log('Router location', this._router.location.route);

    const { component, name } = this._router.location.route;

    const tempComponent = this.shadowRoot.querySelector(component);
    if (tempComponent) {
      const viewProps = Object.keys(propsByView[name]);
      let i = 0;
      Object.keys(propsByView[name]).forEach(prop => {
        tempComponent[prop] = Object.values(propsByView[name])[i];
        i++;
      }
      )
    }
  }

  get _managerTemplate() {
    return html`
      <manager-flow @grte-grte-flow-drawer-change="${this._onDrawerChange}"
        @manager-flow-properties-change="${this.setProperties}">
      
        <mwc-drawer hasHeader type="dismissible">
          <span slot="title">Drawer Title</span>
          <span slot="subtitle">subtitle</span>
          <div class="drawer-content">
            <p>Drawer content!</p>
            <p>With separate drawer scrolling.</p>
            <!-- <grte-menu-options .menuOptions=${this._menuOptions}></grte-menu-options> -->
            <nav>
              <a href="/">Home</a>
              <a href="/admin">Administración</a>
              <a href="/otra">Otra view</a>
            </nav>
          </div>
          <div slot="appContent">
            <mwc-top-app-bar>
              <mwc-icon-button slot="navigationIcon" icon="menu" @click=${this.toggleDrawer}></mwc-icon-button>
              <div slot="title">Title</div>
            </mwc-top-app-bar>
            <div class="main-content"></div>
          </div>
        </mwc-drawer>
      
      
      </manager-flow>
    `;
  }

  /**
 * Cuando los datos del drawer han cambiado
 *
 * @param {Array} detail Listado de opciones del menu drawer
 */
  _onDrawerChange({ detail }) {
    this._menuOptions = detail;
  }

  render() {
    return html`
  ${this._managerTemplate}

    `;
  }
}
