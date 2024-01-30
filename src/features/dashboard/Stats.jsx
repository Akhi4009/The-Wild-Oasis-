import {HiCurrencyDollar, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineChartBar} from "react-icons/hi"
import {formatCurrency} from "../../utils/helpers"
import Stat from './Stat';

function Stats({bookings, confirmedStays, numDays,cabinCount}) {
    const numBookings = bookings?.length;
    
    const sales = bookings.reduce((acc, cur)=>
 acc+ cur.totalPrice,0);

 const checkins = confirmedStays?.length;

 const occupation = confirmedStays.reduce(
    (acc,cur)=>acc+ cur.numNights,0) /
    (numDays * cabinCount);

// num checked in nights / all available nights

  return (
    <>
    <Stat 
    title='Bookings'
    color='blue'
    icon={<HiOutlineBriefcase/>} 
    value={numBookings}
    />
    <Stat 
    title='Sales'
    color='green'
    icon={<HiCurrencyDollar/>} 
    value={formatCurrency(sales)}
    />
    <Stat 
    title='Check ins'
    color='indigo'
    icon={<HiOutlineCalendar/>} 
    value={checkins}
    />
    <Stat 
    title='Occupancy'
    color='yellow'
    icon={<HiOutlineChartBar/>} 
    value={Math.round(occupation *100) + '%'}
    />
    
    </>
  )
}

export default Stats