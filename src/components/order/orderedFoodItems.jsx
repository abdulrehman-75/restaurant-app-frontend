import React from "react";
import {
  List,
  Paper,
  ListItem,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function OrderedFoodItems({ values, removeFoodItem, updateFoodItemQuantity }) {
  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  const handleIncrease = (index) => {
    const currentQuantity = values.orderDetails[index].quantity;
    updateFoodItemQuantity(index, currentQuantity + 1);
  };

  const handleDecrease = (index) => {
    const currentQuantity = values.orderDetails[index].quantity;
    if (currentQuantity > 1) {
      updateFoodItemQuantity(index, currentQuantity - 1);
    }
  };

  return (
    <>
      {values.orderDetails.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontSize: "1rem",
            marginTop: 2,
          }}
        >
          Please select food item(s)!
        </Typography>
      ) : (
        <List>
          {values.orderDetails.map((item, index) => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            const total = quantity * price;

            return (
              <Paper
                key={item.foodItemId || index}
                sx={{ marginBottom: 1, paddingX: 1 }}
              >
                <ListItem
                  disableGutters
                  sx={{ display: "flex", alignItems: "center", gap: 1, paddingY: 1 }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, fontSize: "1.2rem" }}
                    >
                      {item.foodItemName}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          gap: 1,
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          px: 1,
                          width: "fit-content",
                          bgcolor: "white",
                          boxShadow: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          aria-label="Decrease quantity"
                          onClick={() => handleDecrease(index)}
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            "&:hover": { color: "#d32f2f" },
                          }}
                        >
                          −
                        </IconButton>
                        <Typography
                          sx={{
                            px: 2,
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "text.primary",
                            userSelect: "none",
                          }}
                        >
                          {quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          aria-label="Increase quantity"
                          onClick={() => handleIncrease(index)}
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            "&:hover": { color: "#2e7d32" },
                          }}
                        >
                          ＋
                        </IconButton>
                      </Box>
                      <span>{formatPrice(total)}</span>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      ml: "auto",
                      borderLeft: "2px solid #e0e0e0",
                      pl: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="Delete item"
                      onClick={() => removeFoodItem(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      )}
    </>
  );
}

export default OrderedFoodItems;