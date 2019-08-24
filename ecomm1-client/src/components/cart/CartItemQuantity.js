import React,{useState, useEffect}from 'react';
import { connect } from 'react-redux';
import {adjustCount} from '../../actions/cartActions';

const CartItemQuantity = (props) => {

  const [quantity, setQuantity] = useState('');
  const {count, id} = props.count;

  useEffect(()=>{
    // Set Initial Quantity based on ItemCount from state
    setQuantity(count)
  },[count])

  const handleChange = () => async e => {
    await setQuantity(e.target.value);
    props.adjustCount(quantity, id)
  }

  return(
    <input
    type="number"
    className="form-field-create"
    name="quantity"
    value={quantity}
    onChange={handleChange("quantity")}
  />
  )

}

export default connect(null, {adjustCount})(CartItemQuantity)