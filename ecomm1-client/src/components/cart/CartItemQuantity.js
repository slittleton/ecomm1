import React,{useState, useEffect}from 'react';
import { connect } from 'react-redux';
import {adjustCount} from '../../actions/cartActions';

const CartItemQuantity = (props) => {

  const [quantity, setQuantity] = useState('');
  const {count, id} = props;

  useEffect(()=>{
    // Set Initial Quantity based on ItemCount from state
    setQuantity(count)
  },[count])

  const handleChange = value => {
    setQuantity(value);
    props.adjustCount(value, id)
  }

  return(
    <input
    type="number"
    className="small-form-field-create"
    style={{width: '100%', border: 'none', fontSize: '1rem'}}
    name="quantity"
    value={quantity}
    onChange={e=>handleChange(e.target.value)}
  />
  )

}

export default connect(null, {adjustCount})(CartItemQuantity)