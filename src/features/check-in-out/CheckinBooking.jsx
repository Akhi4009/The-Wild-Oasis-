import { useEffect, useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import useCheckin from "./useCheckin";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSttings";


function CheckinBooking() {
  const [confirmedPaid,setConfirmedPaid] = useState(false);
  const [addBreakfast,setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const {booking, isLoading} = useBooking();
  const {checkin, isCheckingIn} = useCheckin();
  const {settings,isLoading:isLoadingSettings} = useSettings()
  
  useEffect(()=>{
    setConfirmedPaid(booking?.isPaid)
  },[booking?.isPaid]);

  if(isLoading || isLoadingSettings) return <Spinner/>

  
  const {
    id:bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  const optionalBreakfastPrice =settings.breakfastPrice * numNights * numGuests;

  
    const newtotalPrice = (!hasBreakfast && addBreakfast) ? 
    formatCurrency(totalPrice + optionalBreakfastPrice)
    : formatCurrency(totalPrice)
  
  
  function handleCheckin() {
    if(!confirmedPaid) return;
    console.log(addBreakfast)
    const breakfast= {
      hasBreakfast:true,
      extrasPrice: optionalBreakfastPrice,
      totalPrice: totalPrice + optionalBreakfastPrice,
    }
    if(addBreakfast){
      checkin({bookingId,breakfast})
    }else{
      checkin({bookingId, breakfast:{}})
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      
      { !hasBreakfast &&
        <Box>
      <Checkbox
        checked={addBreakfast}
        onChange={()=>{
          setAddBreakfast(add=>!add)
          setConfirmedPaid(false)
        }}
        id="breakfast"
      >
       Want to add breakfast {formatCurrency(optionalBreakfastPrice)}?
      </Checkbox>
        </Box>
      }
      <Box>
      <Checkbox
      checked={confirmedPaid}
      onChange={()=>setConfirmedPaid(confirm=>!confirm)}
      id="confirm"
      disabled={confirmedPaid || isCheckingIn}
      >
      I confirm that {guests.fullName} has paid{" "}
      the total amount of {newtotalPrice}
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
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

export default CheckinBooking;
