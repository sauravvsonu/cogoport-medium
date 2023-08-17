import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function PaymentForm({ amount, select }) {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [googlePay, setGooglePay] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    // Implement your payment gateway integration here
    console.log("Payment processed:", paymentDetails, "Amount:", amount);
    const userData = JSON.parse(localStorage.getItem('currentUser'))
    userData.viewLeft += amount
    localStorage.setItem('currentUser', JSON.stringify(userData))
    // setPaymentDone(true)
    redirect();
  };
  const redirect = () => {
      alert("Payment Done\nRedirecting in 3 seconds");
    
      setTimeout(() => {
        navigate("/");
      }, 3000);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <Typography variant="body2" gutterBottom>
          Plans starting at less than ₹100/week. Cancel anytime.
          <ul>
            <li>No ads</li>
            <li>Listen to any story</li>
            <li>Support quality writing</li>
            <li>Access on any device</li>
            <li>Read offline with the sparkle app</li>
            <li>Create your own publications</li>
          </ul>
        </Typography>
        <form onSubmit={handlePaymentSubmit}>
          <RadioGroup
            aria-label="payment-method"
            name="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit/Debit Card"
            />
            <FormControlLabel
              value="googlePay"
              control={<Radio />}
              label="Google Pay"
            />
          </RadioGroup>
          {paymentMethod === "creditCard" && (
            <div>
              <TextField
                label="Card Number"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Expiry Date"
                name="expiryDate"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="CVV"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </div>
          )}
          {paymentMethod === "googlePay" && (
            <FormGroup sx={{ marginTop: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={googlePay}
                    onChange={() => setGooglePay(!googlePay)}
                  />
                }
                label="Use Google Pay"
              />
            </FormGroup>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                // onClick={handlePaymentSubmit}
              >
                Make Payment
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => select(null)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default PaymentForm;
