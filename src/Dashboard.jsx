import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SalesContext } from './context/SalesContext';

const Dashboard = () => {
  const { sales, setSales } = useContext(SalesContext);
  const paid =  sales.map(sale => sale.recieved)
  const unpaid = sales.map(sale => sale.balance)
  const paidAmount = paid.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const unpaidAmount = unpaid.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const customers = sales.map(sale => sale.customer)
  const [customerFilter, setCustomerFilter] = useState('all');
  const filteredSales = sales.filter(sale => customerFilter == 'all' || sale.customer == customerFilter )
  console.log(customers)

  const handleFilter = (e) => {
    let value = e.target.value;
    setCustomerFilter(value)
  }

  return (
    <>

      <header className='navbar sticky-top bg-dark flex-md-nowrap p-0 shadow' data-bs-theme='dark'>
        <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white' href='#'>My Customer</a>

        <ul className='navbar-nav flex-row d-md-none'>
          <li className='nav-item text-nowrap'>
            <button className='nav-link px-3 text-white' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSearch' aria-controls='navbarSearch' aria-expanded='false' aria-label='Toggle search'>
            <i className="bi bi-list"></i>
            </button>
          </li>
          <li className='nav-item text-nowrap'>
            <button className='nav-link px-3 text-white' type='button' data-bs-toggle='offcanvas' data-bs-target='#sidebarMenu' aria-controls='sidebarMenu' aria-expanded='false' aria-label='Toggle navigation'>
            <i className="bi bi-list"></i>
            </button>
          </li>
        </ul>

        <div id='navbarSearch' className='navbar-search w-100 collapse'>
          <input className='form-control w-100 rounded-0 border-0' type='text' placeholder='Search' aria-label='Search' />
        </div>
      </header>

      <div className='container-fluid'>
        <div className='row'>
          <div className='sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary'>
            <div className='offcanvas-md offcanvas-end bg-body-tertiary' tabIndex='-1' id='sidebarMenu' aria-labelledby='sidebarMenuLabel'>
              <div className='offcanvas-header'>
                <h5 className='offcanvas-title' id='sidebarMenuLabel'>My Customer</h5>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas' data-bs-target='#sidebarMenu' aria-label='Close'></button>
              </div>
              <div className='offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto'>
                <ul className='nav flex-column'>
                  <li className='nav-item'>
                    
                    <a className='nav-link d-flex align-items-center gap-2 active' aria-current='page' href='#'>
                    <i class="bi bi-house-door-fill"></i>
                      Home
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                    <i class="bi bi-people-fill"></i>
                      Parties
                      <i class="bi bi-plus-lg"></i>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                    <i class="bi bi-diagram-2-fill"></i>
                      Items
                      <i class="bi bi-plus-lg"></i>
                    </a>
                  </li>
                
                  <li className="nav-item">
                    <a className='nav-link d-flex align-items-center gap-2' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false">
                    <i class="bi bi-receipt"></i>
                      Sale
                      <i class="bi bi-chevron-compact-down"></i>
                    </a>
                    <ul className="nav collapse" id="collapseExample">
                      <li className='nav-item'>
                        <Link className='nav-link d-flex align-items-center gap-2' to="/">
                          Sale Invoices
                          <i class="bi bi-plus-lg"></i>
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link d-flex align-items-center gap-2' href='#'>
                          Estimate/Quotation
                          <i class="bi bi-plus-lg"></i>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link d-flex align-items-center gap-2' href='#'>
                          Payment In
                          <i class="bi bi-plus-lg"></i>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link d-flex align-items-center gap-2' href='#'>
                          Sale Order
                          <i class="bi bi-plus-lg"></i>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                    <i class="bi bi-cart-fill"></i>
                      Purchase & Expense
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Grow your business
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Cash & Bank
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Reports
                    </a>
                  </li>
                </ul>
                <hr />

                <ul className='nav flex-column mb-auto'>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Sync,Share & Backups
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Utilities
                    </a>
                  </li>
                </ul>

                <hr className='my-3' />

                <ul className='nav flex-column mb-auto'>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Settings
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link d-flex align-items-center gap-2' href='#'>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className="card p-3">
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className="input-group">
                    <span className="input-group-text">Between</span>
                    <input type="date" className="form-control" placeholder="01/09/2024"/>
                    <span className="input-group-text">To</span>
                    <input type="date" className="form-control" placeholder="31/09/2024"/>
                  </div>

                  <select name="customer" defaultValue={customerFilter} onChange={handleFilter} className="form-select">
                        <option value="all">ALL FIRMS</option>
                        {customers.map(customer =>(
                          <option value={customer}>{customer}</option>
                        ))}
              
                      
                  </select>

                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                  <i className="bi bi-bar-chart-fill"></i>
                  <p>Graph</p>
                  </div>
                  <div>
                  <i className="bi bi-file-earmark-excel"></i>
                  <p>Excel Report</p>
                  </div>
                  <div>
                  <i className="bi bi-printer-fill"></i>
                  <p>Print</p>
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center'>
                  <div className="card bg-success-subtle m-2 p-1 pe-5 flex flex-column justify-content-start">
                    <span>Paid</span>
                    <span>{paidAmount}</span>
                  </div>
                  +
                  <div className="card bg-primary-subtle m-2 p-1 pe-5 flex flex-column justify-content-start">
                  <span>Unpaid</span>
                  <span>{unpaidAmount}</span>
                  </div>
                  =
                  <div className="card bg-warning-subtle m-2 p-1 pe-5 flex flex-column justify-content-start">
                  <span>Total</span>
                  <span>{paidAmount + unpaidAmount}</span>
                  </div>
              </div>
            </div>
            <div className="card p-3">
            <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
              <div className='d-flex flex-column align-items-start'>
                <p className='text-uppercase fw-bold'>Transactions</p>
                <div className='input-group'>
                <i className='bi bi-search input-group-text'></i>
                <input type='text' className='form-control'/>
                </div>
                
              </div>
              <Link to='/form'>
                <button className='btn btn-primary p-2'><i className='bi bi-plus-circle-fill'></i>&nbsp; Add</button>
              </Link>

            </div>

            <div className='table-responsive small'>
              <table className='table table-striped table-sm'>
                <thead>
                  <tr>
                    <th scope='col'>DATE</th>
                    <th scope='col'>PARTY NAME</th>
                    <th scope='col'>INVOICE NO.</th>
                    <th scope='col'>TRANSACTION</th>
                    <th scope='col'>PAYMENT TYPE</th>
                    <th scope='col'>AMOUNT</th>
                    <th scope='col'>BALANCE DUE</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {
                      filteredSales.map(sale => (
                        <tr>
                        <td>{sale.invoiceDate}</td>
                        <td>{sale.customer}</td>
                        <td>{sale.invoiceNo}</td>
                        <td>Sale</td>
                        <td>{sale.paymentType}</td>
                        <td>{sale.total}</td>
                        <td>{sale.balance}</td>
                        <td><i className="bi bi-printer-fill"></i>&nbsp;&nbsp;&nbsp;<i className="bi bi-send-arrow-up-fill"></i></td>
                      </tr>
                      ))
                  }                           
                </tbody>
              </table>
            </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
