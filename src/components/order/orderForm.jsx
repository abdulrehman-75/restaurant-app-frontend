import React, { useState, useEffect, useRef } from "react";
import Form from "../../layouts/form";
import {
  Grid,
  Stack,
  InputAdornment,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { Input, Select } from "../../controles";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ReorderIcon from "@mui/icons-material/Reorder";
import UpdateIcon from "@mui/icons-material/Update";
import { createApiEndpoint, API_ENDPOINTS } from "../../API";
import Popup from "../../layouts/popup";
import OrderList from "./orderList";

const PAYMENT_METHODS = [
  { id: "none", title: "Select" },
  { id: "cash", title: "Cash" },
  { id: "credit", title: "Credit Card" },
];

const BUTTON_STYLES = {
  warning: {
    backgroundColor: "#f3b33d",
    color: "black",
    "&:hover": { backgroundColor: "#e0a52a" },
  },
  update: {
    backgroundColor: "#4caf50",
    color: "white",
    "&:hover": { backgroundColor: "#45a049" },
  },
  orders: {
    backgroundColor: "#333",
    color: "#ccc",
    textTransform: "none",
    "&:hover": { backgroundColor: "#444", color: "#fff" },
    marginLeft: 2,
    borderRadius: 2,
  },
};

const CURRENCY_ADORNMENT_STYLE = {
  color: "#f3b33d",
  fontWeight: "bolder",
  fontSize: "1.5rem",
};

function OrderForm({
  values,
  errors,
  isEditMode,
  handleInputChange,
  resetForm,
  submitOrder,
  loadOrderForEdit,
  showSnackbar,
}) {
  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const orderButtonRef = useRef(null);

  useEffect(() => {
    createApiEndpoint(API_ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        const customers = [
          { id: 0, title: "Select" },
          ...res.data.map((x) => ({
            id: x.customerId,
            title: x.customerName,
          })),
        ];
        setCustomerList(customers);
      })
      .catch((err) => {
        console.error("Failed to load customers:", err);
        showSnackbar("Failed to load customers.", "error");
      });
  }, [showSnackbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitOrder();
  };

  const handlePopupClose = () => {
    setOrderListVisibility(false);
    requestAnimationFrame(() => {
      if (orderButtonRef.current) {
        orderButtonRef.current.focus();
      }
    });
  };

  return (
    <>
      <Form
        style={{
          boxShadow: "none",
          border: "none",
          backgroundColor: "transparent",
        }}
        onSubmit={handleSubmit}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Box sx={{ gridColumn: "span 1" }}>
            <Stack spacing={3}>
              <Input
                disabled
                label="Order Number"
                name="orderNumber"
                value={values.orderNumber}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={CURRENCY_ADORNMENT_STYLE}>
                        #
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                label="Customer"
                name="customerId"
                value={values.customerId || ""}
                onChange={handleInputChange}
                options={customerList}
                error={!!errors.customerId}
                helperText={errors.customerId}
              />
            </Stack>
          </Box>

          <Box sx={{ gridColumn: "span 1" }}>
            <Stack spacing={3}>
              <Select
                label="Payment Method"
                name="paymentMethod"
                value={values.paymentMethod || ""}
                onChange={handleInputChange}
                options={PAYMENT_METHODS}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod}
              />
              <Input
                disabled
                label="Grand Total"
                name="gTotal"
                value={values.gTotal}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={CURRENCY_ADORNMENT_STYLE}>
                        $
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.orderDetails && (
                <Box sx={{ color: "red", fontSize: "0.875rem" }}>
                  {errors.orderDetails}
                </Box>
              )}

              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  sx={{ overflow: "hidden", border: "1px solid black" }}
                >
                  <Button
                    size="medium"
                    type="submit"
                    sx={{
                      ...(isEditMode ? BUTTON_STYLES.update : BUTTON_STYLES.warning),
                      borderRadius: 0,
                      minWidth: 100,
                    }}
                    endIcon={isEditMode ? <UpdateIcon /> : <RestaurantIcon />}
                  >
                    {isEditMode ? "Update" : "Submit"}
                  </Button>

                  <Box
                    sx={{
                      width: "1px",
                      backgroundColor: "black",
                      alignSelf: "stretch",
                    }}
                  />

                  <IconButton
                    onClick={resetForm}
                    aria-label={isEditMode ? "Cancel Edit" : "Reset Order"}
                    sx={{
                      ...BUTTON_STYLES.warning,
                      width: 42,
                      height: 42,
                      borderRadius: 0,
                    }}
                  >
                    <RestartAltIcon />
                  </IconButton>
                </Box>

                <Button
                  size="medium"
                  startIcon={<ReorderIcon />}
                  sx={BUTTON_STYLES.orders}
                  onClick={() => setOrderListVisibility(true)}
                  ref={orderButtonRef}
                >
                  Orders
                </Button>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Form>

      <Popup
        open={orderListVisibility}
        onClose={handlePopupClose}
        title="List of Orders"
      >
        <OrderList
          onEditOrder={loadOrderForEdit}
          onClose={handlePopupClose}
          showSnackbar={showSnackbar}
        />
      </Popup>
    </>
  );
}

export default OrderForm;