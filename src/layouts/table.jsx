import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Table({ orders, onRowClick, onEdit, onDelete }) {
  // Determine if actions should be shown
  const showActions = !!(onEdit || onDelete);

  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 border-b text-left">Order Number</th>
          <th className="px-4 py-2 border-b text-left">Customer Name</th>
          <th className="px-4 py-2 border-b text-left">Payment Method</th>
          <th className="px-4 py-2 border-b text-left">Total Amount</th>
          {showActions && (
            <th className="px-4 py-2 border-b text-left">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr
            key={order.orderMasterId}
            className={`odd:bg-white even:bg-gray-50 transition-colors 
              ${onRowClick ? 'hover:bg-gray-200 cursor-pointer' : ''}`}
            onClick={() => {
              if (onRowClick) onRowClick(order.orderMasterId);
            }}
            title={onRowClick ? 'Click to edit this order' : ''}
          >
            <td className="px-4 py-2 border-b">{order.orderNumber}</td>
            <td className="px-4 py-2 border-b">
              {order.customer?.customerName || 'N/A'}
            </td>
            <td className="px-4 py-2 border-b">{order.pMethod}</td>
            <td className="px-4 py-2 border-b">
              ${Number(order.gTotal).toFixed(2)}
            </td>
            {showActions && (
              <td className="px-4 py-2 border-b">
                {onEdit && (
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(order.orderMasterId);
                    }}
                    size="small"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
                {onDelete && (
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(order.orderMasterId);
                    }}
                    size="small"
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
