import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import React from 'react'
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

function DashboardLayout() {
  const {bookings, isLoading, numDays} = useRecentBooking();
  const {isLoading:isLoading1, stays,confirmedStays} = useRecentStays();
  const {cabins, isLoading:isLoading2} = useCabins()

  if(isLoading || isLoading1 || isLoading2) return <Spinner/>
 
  const cabinCount = cabins?.length

  return (
    <StyledDashboardLayout>
    <Stats bookings={bookings} 
      confirmedStays={confirmedStays}
      numDays={numDays}
      cabinCount={cabinCount}
      />
    <div>Today's activity</div>
    <div>Chart stay duration</div>
    <SalesChart 
      bookings={bookings} 
      numDays={numDays}/>
    </StyledDashboardLayout>
    )
}

export default DashboardLayout
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

