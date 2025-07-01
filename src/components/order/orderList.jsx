import React, { useEffect, useState } from "react";
import { createApiEndpoint, API_ENDPOINTS } from "../../API";
import Table from "../../layouts/table";
import Popup from "../../layouts/popup";
import ProcessPayment from "../payment/processPayment";

function OrderList({ onEditOrder, onClose, showSnackbar }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await createApiEndpoint(
          API_ENDPOINTS.ORDERS
        ).fetchAll();
        console.log("Fetched Orders:", response.data);
        setOrders(response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      createApiEndpoint(API_ENDPOINTS.ORDERS)
        .delete(orderId)
        .then(() => {
          setOrders((prev) =>
            prev.filter((order) => order.orderMasterId !== orderId)
          );
          showSnackbar("Order deleted successfully.", "success");
        })
        .catch((err) => {
          console.error("Error deleting order:", err);
          showSnackbar("Failed to delete order. Please try again.", "error");
        });
    }
  };

  const handleEdit = async (orderId) => {
    try {
      const response = await createApiEndpoint(API_ENDPOINTS.ORDERS).fetchById(
        orderId
      );
      if (onEditOrder) onEditOrder(response.data);
      if (onClose) onClose();
      showSnackbar("Order loaded for editing.", "info");
    } catch (err) {
      console.error("Error fetching order for edit:", err);
      showSnackbar("Failed to load order for editing.", "error");
    }
  };

  const handlePayNow = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePopup = () => {
    setShowPaymentPopup(false);
  };

  const creditCardOrders = orders.filter(
    (order) => order.pMethod?.toLowerCase() === "credit"
  );

  const totalAmount = creditCardOrders.reduce(
    (sum, order) => sum + Number(order.gTotal || 0),
    0
  );

  return (
    <div className="p-8 font-sans">
      <div className="overflow-x-auto mb-4">
        {loading && (
          <p className="text-center text-gray-600">Loading orders...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {orders.length > 0 ? (
              <Table
                orders={orders}
                onRowClick={handleEdit}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions
              />
            ) : (
              <p className="text-center text-gray-600">No orders found.</p>
            )}

            {orders.length > 0 && (
              <div className="text-center mt-4">
                <button
                  onClick={handlePayNow}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Pay Now
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Popup
        open={showPaymentPopup}
        onClose={handleClosePopup}
        title="Credit Card Orders Payment"
        maxWidth="md"
      >
        {creditCardOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table
              orders={creditCardOrders}
              onRowClick={null}
              onEdit={null}
              onDelete={null}
            />
            <div className="mt-4 flex justify-end items-center gap-4">
              <div className="text-lg font-semibold">
                Total Amount to Pay: ${totalAmount.toFixed(2)}
              </div>
              <ProcessPayment
                totalAmount={totalAmount}
                onSuccess={handleClosePopup}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No orders with payment method 'Credit Card'.
          </p>
        )}
      </Popup>
    </div>
  );
}

export default OrderList;
