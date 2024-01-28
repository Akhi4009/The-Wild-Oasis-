import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi";
import { BsCopy } from "react-icons/bs";
import {formatCurrency} from "../../utils/helpers"

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin()
  const {isCreating, createCabin} = useCreateCabin();

  const {
    id, maxCapacity, regularPrice,
    discount, image, name, description,
  } = cabin;


  function handleDuplicate(){
    createCabin({
      name:`Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    })

  }
  return (
    <TableRow role="row">
    <Img src={image} alt={name}/>
    <Cabin>{name}</Cabin>
    <div>Fits up to {maxCapacity}</div>
    <Price>{formatCurrency(regularPrice)}</Price>
    {
      discount ? 
      <Discount>{formatCurrency(discount)}</Discount>
      : <span>&mdash;</span>
    }
    <div>
    <button 
    onClick={handleDuplicate}
    disabled={isCreating}
    >
    <BsCopy/>  
    </button>
    <Modal>
    <Modal.Open opens="edit">
    <button> <HiPencil/> </button>
    </Modal.Open>
    <Modal.Window name="edit">
    <CreateCabinForm cabinToEdit={cabin} />
    </Modal.Window>

    <Modal.Open opens="delete">
    <button 
    onClick={()=>deleteCabin(id)}
    disabled={isDeleting}
    >
    <HiTrash/>
    </button>
    </Modal.Open>
    <Modal.Window name="delete">
    <ConfirmDelete 
    disabled={isDeleting}
    onConfirm={()=>deleteCabin(id)}
    resourceName="cabin"
    />
    </Modal.Window>
    </Modal>
    </div>
    </TableRow>
    )
  }
  
    
  const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default CabinRow
    
    