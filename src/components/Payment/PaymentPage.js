import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BlogNav from "../BlogPage/BlogNav";

const RootContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SubscriptionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
}));

function PaymentPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
  };

  return (
    <RootContainer maxWidth="md">
        <BlogNav />
      <Card elevation={3} sx={{marginTop:"5rem"}}>
        <CardContent>
          <Title variant="h4">Buy Subscriptions</Title>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <SubscriptionButton
                  variant={selectedAmount == 10 ? "contained": "outlined"}
                  color="primary"
                  onClick={() => handleAmountSelection(10)}
                  fullWidth
                >
                  Buy 10 Post Subscription (₹5/-)
                </SubscriptionButton>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <SubscriptionButton
                  variant={selectedAmount == 20 ? "contained": "outlined"}
                  color="primary"
                  onClick={() => handleAmountSelection(20)}
                  fullWidth
                >
                  Buy 20 Post Subscription (₹10)
                </SubscriptionButton>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2}>
                <SubscriptionButton
                  variant={selectedAmount == 100 ? "contained": "outlined"}
                  color="primary"
                  onClick={() => handleAmountSelection(100)}
                  fullWidth
                >
                  Buy 100 Post Subscription (₹50)
                </SubscriptionButton>
              </Paper>
            </Grid>
          </Grid>
          {selectedAmount && <PaymentForm amount={selectedAmount} select={(e)=> setSelectedAmount(e)} />}
        </CardContent>
      </Card>
    </RootContainer>
  );
}

export default PaymentPage;
