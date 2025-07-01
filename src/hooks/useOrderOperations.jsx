import { useState, useEffect, useCallback } from 'react';
import { createApiEndpoint, API_ENDPOINTS } from '../API';

// Extended hook that builds on top of existing useForm hook
export const useOrderOperations = (formHook) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Calculate grand total whenever order details change
  useEffect(() => {
    const gTotal = formHook.values.orderDetails.reduce((sum, item) => {
      return sum + (Number(item.quantity) || 0) * (Number(item.price) || 0);
    }, 0);
    
    formHook.setValues(prev => ({
      ...prev,
      gTotal: gTotal.toFixed(2),
    }));
  }, [formHook.values.orderDetails, formHook.setValues]);

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    if (!formHook.values.customerId || formHook.values.customerId === 0) {
      newErrors.customerId = "Customer is required";
      isValid = false;
    }

    if (formHook.values.paymentMethod === "none") {
      newErrors.paymentMethod = "Payment method is required";
      isValid = false;
    }

    if (formHook.values.orderDetails.length === 0) {
      newErrors.orderDetails = "At least one food item must be selected";
      isValid = false;
    }

    formHook.setErrors(newErrors);
    return isValid;
  }, [formHook.values, formHook.setErrors]);

  const submitOrder = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }

    const apiPayload = {
      orderMasterId: formHook.values.orderMasterId || 0,
      orderNumber: formHook.values.orderNumber,
      customerId: Number(formHook.values.customerId),
      pMethod: formHook.values.paymentMethod,
      gTotal: parseFloat(formHook.values.gTotal),
      orderDetails: formHook.values.orderDetails.map((item) => ({
        orderDetailId: item.orderDetailsId || 0,
        orderMasterId: formHook.values.orderMasterId || 0,
        foodItemId: Number(item.foodItemId),
        foodItemPrice: Number(item.price) || 0,
        quantity: Number(item.quantity) || 0,
      })),
    };

    try {
      if (isEditMode && formHook.values.orderMasterId) {
        await createApiEndpoint(API_ENDPOINTS.ORDERS).update(formHook.values.orderMasterId, apiPayload);
        showSnackbar("Order updated successfully!", "success");
      } else {
        await createApiEndpoint(API_ENDPOINTS.ORDERS).create(apiPayload);
        showSnackbar("Order created successfully!", "success");
      }
      
      resetForm();
      return true;
    } catch (error) {
      console.error("Order operation failed:", error);
      showSnackbar(
        isEditMode ? "Order update failed!" : "Order creation failed!",
        "error"
      );
      return false;
    }
  }, [formHook.values, isEditMode, validateForm, showSnackbar, formHook.setErrors]);

  const resetForm = useCallback(() => {
    formHook.resetFormControls();
    setIsEditMode(false);
  }, [formHook]);

  const loadOrderForEdit = useCallback((orderData) => {
    const transformedData = {
      orderMasterId: orderData.orderMasterId,
      orderNumber: orderData.orderNumber,
      customerId: orderData.customerId,
      paymentMethod: orderData.pMethod,
      gTotal: orderData.gTotal,
      deletedOrderItemIds: '',
      orderDetails: orderData.orderDetails?.map(detail => ({
        orderDetailsId: detail.orderDetailId,
        foodItemId: detail.foodItemId,
        foodItemName: detail.foodItem?.foodItemName || '',
        price: detail.foodItemPrice,
        quantity: detail.quantity,
      })) || [],
    };
    
    formHook.setValues(transformedData);
    setIsEditMode(true);
    showSnackbar(`Order #${orderData.orderNumber} loaded for editing`, "info");
  }, [formHook.setValues, showSnackbar]);

  // Order details management
  const addFoodItem = useCallback((foodItem) => {
    const newItem = {
      orderMasterId: formHook.values.orderMasterId,
      orderDetailsId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      price: foodItem.price,
      foodItemName: foodItem.foodItemName,
    };
    
    formHook.setValues(prev => ({
      ...prev,
      orderDetails: [...prev.orderDetails, newItem],
    }));
  }, [formHook.values.orderMasterId, formHook.setValues]);

  const removeFoodItem = useCallback((indexToRemove) => {
    formHook.setValues(prev => ({
      ...prev,
      orderDetails: prev.orderDetails.filter((_, i) => i !== indexToRemove),
    }));
  }, [formHook.setValues]);

  const updateFoodItemQuantity = useCallback((index, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    
    formHook.setValues(prev => ({
      ...prev,
      orderDetails: prev.orderDetails.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      ),
    }));
  }, [formHook.setValues]);

  return {
    // Extended state
    isEditMode,
    setIsEditMode,
    snackbar,
    
    // Operations
    submitOrder,
    resetForm,
    loadOrderForEdit,
    addFoodItem,
    removeFoodItem,
    updateFoodItemQuantity,
    showSnackbar,
    hideSnackbar,
    validateForm,
  };
};