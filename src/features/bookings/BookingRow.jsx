import styled from "styled-components";
import { format, isToday } from "date-fns";
import {useNavigate} from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import { HiArrowDownOnSquare } from "react-icons/hi2";


function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {

  const navigate = useNavigate();
  
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

       <Stacked>
        <span>
           {isToday(new Date(startDate))
             ? "Today"
             : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
        </Stacked> 

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
      <Menus.Toggle id={bookingId}/>
      <Menus.List id={bookingId}>
      <Menus.Button 
      onClick={()=>navigate(`/bookings/${bookingId}`)}
      icon={<HiEye/>}>
      See details
      </Menus.Button>
      { status === 'unconfirmed' &&
        <Menus.Button 
      onClick={()=>navigate(`/checkin/${bookingId}`)}
      icon={<HiArrowDownOnSquare/>}>
        Check in
        </Menus.Button>
      }
      </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

  
  
  const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
  `;
  
  const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  
    & span:first-child {
      font-weight: 500;
    }
  
    & span:last-child {
      color: var(--color-grey-500);
      font-size: 1.2rem;
    }
  `;
  
  const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
  `;
export default BookingRow;
