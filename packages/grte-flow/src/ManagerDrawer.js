import { LitElement, html, css } from 'lit-element';
import { dispatch } from 'grte-helpers/src/GrteHelpers'
//import 'grte-x-api-grte/grte-x-api-grte';

class ManagerDrawer extends LitElement {

  static get properties() {
    return {
      dmAPIGrte: { type: Object }
    };
  }

  constructor() {
    super();
    this.dmAPIGrte = null;
  }

  async getMenuOptions() {
    try {
      const result = await this.dmAPIGrte.getMenuOptions();
      dispatch(this, `grte-grte-flow-drawer-change`, result);
    } catch (error) {
      console.log('ManagerDrawer: ', error)
    }

  }
}
customElements.define('manager-drawer', ManagerDrawer);