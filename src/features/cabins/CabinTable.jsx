import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get("discount") || "all";
  
  if(isLoading) return <Spinner/>

  let filterCabins;
  if(filterValue === 'all') filterCabins = cabins;
  if(filterValue === 'no-discount')
  filterCabins = cabins.filter((cabin)=>cabin.discount === 0);

  if(filterValue === 'with-discount')
  filterCabins = cabins.filter((cabin)=>cabin.discount >0 );

  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
    <Table.Header >
    <div></div>
    <div>Cabin</div>
    <div>Capacity</div>
    <div>Price</div>
    <div>Discount</div>
    <div></div>
    </Table.Header>
    <Table.Body data ={filterCabins} render={(cabin=>
      <CabinRow cabin={cabin}key={cabin.id}/>)} 
      />
      </Table>
      </Menus>
    )
  }

  export default CabinTable

  
  
  
  