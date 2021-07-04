import { LitElement, html, css } from 'lit-element';

class ViewOtra extends LitElement {

  static get properties() {
    return { };
  }

  render() {
    return html`
    <h1>View otra</h1>`
  }
}
customElements.define('view-otra', ViewOtra);