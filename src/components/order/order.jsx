import React from 'react';
import { Grid, Box, Paper } from '@mui/material';
import useForm from '../../hooks/useForm';
import { useOrderOperations } from '../../hooks/useOrderOperations';
import OrderForm from './orderForm';
import SearchFoodItems from './searchFoodItems';
import OrderedFoodItems from './orderedFoodItems';
import OrderSnackbar from './orderSnackbar';

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
  orderMasterId: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  paymentMethod: 'none',
  gTotal: 0,
  deletedOrderItemIds: '',
  orderDetails: [],
});

function Order() {
  // Your existing useForm hook
  const formHook = useForm(getFreshModelObject);
  
  // Extended operations hook
  const orderOperations = useOrderOperations(formHook);
  
  // Combine both hooks for child components
  const combinedProps = {
    ...formHook,
    ...orderOperations,
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 1000, width: '100%' }}>
        <OrderForm {...combinedProps} />

        <Box mt={4}>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2,
            }}
          >
            <Box sx={{ gridColumn: 'span 1' }}>
              <SearchFoodItems {...combinedProps} />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <OrderedFoodItems {...combinedProps} />
            </Box>
          </Grid>
        </Box>
        
        <OrderSnackbar {...combinedProps} />
      </Paper>
    </Box>
  );
}

export default Order;