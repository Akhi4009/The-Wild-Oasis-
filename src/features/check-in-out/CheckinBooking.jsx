import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";


function CheckinBooking() {
  const [confirmedPaid,setConfirmedPaid] = useState(false);
  const moveBack = useMoveBack();
  const {booking, isLoading} = useBooking();
  const {checkin, isCheckingIn} = useCheckin();
  
  useEffect(()=>{
    setConfirmedPaid(booking?.isPaid)
  },[booking?.isPaid]);

  if(isLoading) return <Spinner/>
  const {
    id:bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if(!confirmedPaid) return;
    checkin(bookingId)
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
      <Checkbox
      checked={confirmedPaid}
      onChange={()=>setConfirmedPaid(confirm=>!confirm)}
      id="confirm"
      disabled={confirmedPaid || isCheckingIn}
      >
      I confirm that {guests.fullName} has paid{" "}
      the total amount of {formatCurrency(totalPrice)}
      </Checkbox>
      </Box>

      <ButtonGroup>
        <Button 
          onClick={handleCheckin}
          disabled={!confirmedPaid || isCheckingIn}
        >
        Check in booking #{bookingId}</Button>
        <Button 
          variation="secondary" 
          onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default CheckinBooking;
