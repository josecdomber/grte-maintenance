import { html, LitElement } from 'lit-element';
import  * as awsApi from '../aws/aws-grte-v1.js';

export class GrteXApiGrte extends LitElement {

  static get properties() {
    return {
      _email: { type: String },
    };
  }

  constructor() {
    super();
  }

  async getCustomer(id=0) {
    const response = await awsApi.getCustomer(id);
    console.log(response);
    return response;
  }

  async getMenuOptions() {
    const response = await awsApi.getMenuOptions();
    console.log(response);
    return response.map(item => item.desOption  );
  }

}
