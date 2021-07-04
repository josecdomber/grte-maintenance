import { LitElement, html, css } from 'lit-element';
import { dispatch } from 'grte-helpers/src/GrteHelpers'

class ManagerAdminCustomers extends LitElement {

  static get properties() {
    return {
      dmAPIGrte: { type: Object }
    };
  }

  constructor() {
    super();
    this.dmAPIGrte = null;
  }

  async updateCustomer( { detail } ) {
    try {
//      const result = await this.dmAPIGrte.updateCustomer( detail );
//
    const result = { status: 'OK'}

      dispatch(this, `grte-admin-customers-update-success`, result);
    } catch (error) {
      console.log('ManagerAdminCustomersUpdate: ', error)
    }

  }  

  async getCustomersList() {
    try {
//      const result = await this.dmAPIGrte.getCustomer();
//
    const result = [
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez Martínez-Cobo',
        'phone': '780909887',
        'email': 'alfredopmtez200@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
      {
        'name': 'Alfredo Pérez',
        'phone': '780909887',
        'email': 'alfredop@gmail.com' 
      },
      {
        'name': 'Luis López',
        'phone': '780909000',
        'email': 'llopez@gmail.com' 
      },
    ];     
//
//
      dispatch(this, `grte-admin-customers-list-success`, {dataCustomers: result});
    } catch (error) {
      console.log('ManagerAdminCustomersList: ', error)
    }

  }
}
customElements.define('manager-admin-customers', ManagerAdminCustomers);