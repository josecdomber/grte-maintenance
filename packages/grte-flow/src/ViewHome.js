import { LitElement, html, css } from 'lit-element';

class ViewHome extends LitElement {

  static get properties() {
    return { };
  }

  render() {
    return html`
    <h1>View Home</h1>`
  }
}
customElements.define('view-home', ViewHome);