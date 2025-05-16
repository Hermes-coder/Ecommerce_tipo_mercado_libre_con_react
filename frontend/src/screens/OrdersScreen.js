import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Cargando...</div> :
    error ? <div>Error: {error}</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Órdenes</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA</th>
              <th>TOTAL</th>
              <th>USUARIO</th>
              <th>PAGADO</th>
              <th>FECHA DE PAGO</th>
              <th>ENTREGADO</th>
              <th>FECHA DE ENTREGA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid ? "Sí" : "No"}</td>
              <td>{order.paidAt ? order.paidAt : "No pagado"}</td>
              <td>{order.isDelivered ? "Sí" : "No"}</td>
              <td>{order.deliveredAt ? order.deliveredAt : "No entregado"}</td>
              <td>
                <Link to={"/order/" + order._id} className="button secondary" >Detalles</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Eliminar</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;