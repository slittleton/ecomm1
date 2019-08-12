import React from 'react';

import Layout from '../layout/Layout';

const AccountUser = (props) => {

  return(
    <div className="home">
      <Layout title="Account Settings" description={`Welcome ${props.user.name}`}>
        
      </Layout>
    </div>
  )
}

export default AccountUser;
