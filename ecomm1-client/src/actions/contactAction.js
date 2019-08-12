
const API = process.env.REACT_APP_API_URL;

export const sendMessage = (message) => async dispatch => {

  console.log(message);
  let data = await fetch(`${API}/message`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });

  data = await data.json();
  
  console.log(data);


};
