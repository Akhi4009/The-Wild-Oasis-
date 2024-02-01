import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity"

import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

function DashboardLayout() {
  const {bookings, isLoading, numDays} = useRecentBooking();
  const {isLoading:isLoading1,confirmedStays} = useRecentStays();
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
    <TodayActivity/>
    <DurationChart confirmedStays={confirmedStays}/>
    <SalesChart 
      bookings={bookings} 
      numDays={numDays}/>
    </StyledDashboardLayout>
    )
}

export default DashboardLayout;

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

