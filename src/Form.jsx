import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SalesContext } from './context/SalesContext';

 
const Form = () => {
    const { sales, setSales } = useContext(SalesContext);
    const [form, setForm] = useState({
        customer: "google",
        phone: "",
        address: "",
        item: "",
        unit: "",
        stateOfSupply: "select",
        paymentType: "cash",
        invoiceDate: "",
        invoiceNo: 0,
        total: 0,
        recieved: 0,
        balance: 0,
        qty: 0,
        price: 0,
        discountPercent: 0,
        discount: 0,
        taxPercent: 0,
        tax: 0,
        amount: 0
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let sum
        let discount
        let tax
        let amount

        switch (name) {
            case 'item':
            case 'customer':
            case 'phone':
            case 'address':
            case 'paymentType':
            case 'invoiceDate':
            case 'invoiceNo':
            case 'unit':
            case 'stateOfSupply':
                setForm(prevForm => ({
                    ...prevForm,
                    [name]: value  
                }));
                break;
            case 'price':
                sum = parseInt(value) * form['qty'];
                discount = sum * form['discountPercent'] / 100
                tax = (sum - discount) * form['taxPercent'] / 100
                amount = sum - discount + tax;
                setForm(prevForm => ({
                    ...prevForm,
                    'price': parseInt(value),
                    'amount': amount,
                    'total': parseInt(amount),
                    'balance': parseInt(amount) - form['recieved']
                }));
                break;
            case 'qty':
                sum = parseInt(value) * form['price'];
                discount = sum * form['discountPercent'] / 100
                tax = (sum - discount) * form['taxPercent'] / 100
                amount = sum - discount + tax;
                setForm(prevForm => ({
                    ...prevForm,
                    'qty': parseInt(value),
                    'amount': amount,
                    'total': parseInt(amount),
                    'balance': parseInt(amount) - form['recieved']
                }));
                break;

            case 'discountPercent':
                sum = form['qty'] * form['price'];
                discount = sum * parseInt(value) / 100
                tax = (sum - discount) * form['taxPercent'] / 100
                amount = sum - discount + tax;
                setForm(prevForm => ({
                    ...prevForm,
                    'discountPercent': parseInt(value),
                    'discount': discount,
                    'tax': tax,
                    'amount': amount,
                    'total': parseInt(amount),
                    'balance': parseInt(amount) - form['recieved']
                }));

                break;
            case 'taxPercent':
                sum = form['qty'] * form['price'];
                discount = sum * form['discountPercent'] / 100
                tax = (sum - discount) * parseInt(value) / 100
                amount = sum - discount + tax;
                setForm(prevForm => ({
                    ...prevForm,
                    'taxPercent': parseInt(value),
                    'tax': tax,
                    'amount': amount,
                    'total': parseInt(amount),
                    'balance': parseInt(amount) - form['recieved']
                }));
                break;
            case 'recieved':
                setForm(prevForm => ({
                    ...prevForm,
                    'recieved': parseInt(value),
                    'balance': form['total'] - parseInt(value)
                }));
                break;
            default:
                break;
        }
        console.log(form)
    };

    const generatePdf = async () => {
        const doc = new jsPDF('portrait', 'px', 'a4', 'false');
        doc.setFontSize(22);
        doc.text("Invoice", 20, 30);
        doc.setFontSize(12);
        doc.text("XianInfoTech", 20, 50);
        doc.text("123 Company St.", 20, 65);
        doc.text("Phone: (555) 555-5555", 20, 80);
        doc.text("Email: info@company.com", 20, 95);
        doc.text(`Invoice #: ${form.invoiceNo}`, 350, 50);
        doc.text(`Date: ${form.invoiceDate}`, 350, 65);
        doc.text("Due Date: 2024-10-01", 350, 80);
        doc.text("Bill To:", 20, 130);
        doc.text(form.customer, 20, 145);
        doc.text(form.address, 20, 160);
        doc.text(`Phone: ${form.phone}`, 20, 175);


        const element = document.getElementById('my-table');
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const imgProps = doc.getImageProperties(data);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(data, 'PNG', 0, 200, pdfWidth, pdfHeight);
        doc.save('invoice.pdf');
    };

    const handleClick = () => {
        setSales((prevSales) => [...prevSales, form]);
        generatePdf();
    };

    return (
        <>
            <main className="container-fluid">
                <div className="row my-5">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="d-flex">
                                <div className="form-floating">
                                    <select className="form-select" id="customer"
                                        name="customer" defaultValue={form.customer} onChange={handleChange}>
                                        <option value="google">Google</option>
                                        <option value="meta">Meta</option>
                                        <option value="amazon">Amazon</option>
                                    </select>
                                    <label htmlFor="customer">Customer</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="phone" placeholder='123456789'
                                        name="phone" value={form.phone} onChange={handleChange} />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>
                            </div>
                            <div className="form-floating">
                                <textarea className="form-control" id="address" placeholder='123 downing street'
                                    name="address" value={form.address} onChange={handleChange}></textarea>
                                <label htmlFor="address">Billing Address</label>
                            </div>
                        </div>
                        <div>
                            <div className='row mb-1'>
                                <div className="col-6">
                                    <label htmlFor="invoiceNo" className="col-form-label">Invoice Number</label>
                                </div>
                                <div className="col-6">
                                    <input type="number" id="invoiceNo" className="form-control border-0 border-bottom"
                                        name="invoiceNo" value={form.invoiceNo} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-6">
                                    <label htmlFor="invoiceDate" className="col-form-label">Invoice Date</label>
                                </div>
                                <div className="col-6">
                                    <input type="date" id="invoiceDate" className="form-control border-0 border-bottom"
                                        name="invoiceDate" value={form.invoiceDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-6">
                                    <label htmlFor="stateOfSupply" className="col-form-label">State of supply</label>
                                </div>
                                <div className="col-6">
                                    <select defaultValue={form.stateOfSupply} className="form-select border-0 border-bottom" id='stateOfSupply'
                                        name="stateOfSupply" onChange={handleChange}>
                                        <option value="select">Select</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row my-5">
                    <div className="table-responsive small">
                        <table className="table table-striped table-bordered table-sm " id='my-table'>
                            <thead>
                                <tr className='align-middle'>
                                    <th rowSpan="2" scope="col">ITEM</th>
                                    <th rowSpan="2" scope="col">QTY</th>
                                    <th rowSpan="2" scope="col">UNIT</th>
                                    <th rowSpan="2" scope="col">PRICE/UNIT</th>
                                    <th colSpan="2" scope="col">DISCOUNT</th>
                                    <th colSpan="2" scope="col">TAX</th>
                                    <th rowSpan="2" scope="col">AMOUNT</th>
                                </tr>
                                <tr>
                                    <th scope="col">%</th>
                                    <th scope="col">AMOUNT</th>
                                    <th scope="col">%</th>
                                    <th scope="col">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                <tr>
                                    <td><input type="text" className="form-control" name="item" value={form.item} onChange={handleChange} /><span className='d-none'>{form.item}</span></td>
                                    <td><input type="number" className="form-control" name="qty" value={form.qty} onChange={handleChange} /><span className='d-none'>{form.qty}</span></td>
                                    <td>
                                        <select name="unit" defaultValue={form.unit} onChange={handleChange} className="form-select">
                                            <option value="bags">Bags(Bag)</option>
                                            <option value="packs">Packs(Pack)</option>
                                        </select>
                                    </td>


                                    <td><input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} /><span className='d-none'>{form.price}</span></td>
                                    <td><input type="number" className="form-control" name="discountPercent" value={form.discountPercent} onChange={handleChange} /><span className='d-none'>{form.discountPercent}</span></td>
                                    <td><input type="number" className="form-control" name="discount" value={form.discount} readOnly /><span className='d-none'>{form.discount}</span></td>
                                    <td><input type="number" className="form-control" name="taxPercent" value={form.taxPercent} onChange={handleChange} /><span className='d-none'>{form.taxPercent}</span></td>
                                    <td><input type="number" className="form-control" name="tax" value={form.tax} readOnly /><span className='d-none'>{form.tax}</span></td>

                                    <td><input type="number" className="form-control" name="amount" value={form.amount} readOnly /><span className='d-none'>{form.amount}</span></td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="d-flex justify-content-between">


                        <div className="form-floating">
                            <select className="form-select" id="paymentType"
                                name="paymentType" defaultValue={form.paymentType} onChange={handleChange}>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="upi">UPI</option>
                            </select>
                            <label htmlFor="paymentType">Payment Type</label>
                        </div>


                        <div>
                            <div className='row mb-1'>
                                <div className="col-6">
                                    <label htmlFor="total" className="col-form-label">Total</label>
                                </div>
                                <div className="col-6">
                                    <input type="number" id="total" className="form-control border-0 border-bottom"
                                        name="total" value={form.total} readOnly />
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-6">
                                    <label htmlFor="recieved" className="col-form-label">Recieved</label>
                                </div>
                                <div className="col-6">
                                    <input type="number" id="recieved" className="form-control border-0 border-bottom"
                                        name="recieved" value={form.recieved} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col-6">
                                    <label htmlFor="balance" className="col-form-label">Balance</label>
                                </div>
                                <div className="col-6">
                                    <input type="number" id="balance" className="form-control border-0 border-bottom"
                                        name="recieved" value={form.balance} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div> 
                <button className='btn btn-primary p-2 me-3' onClick={handleClick}>Save</button>
                <Link to="/"><button className='btn btn-primary p-2'>Home</button></Link>
                </div>
             
            </main>

        </>
    );
};

export default Form;

