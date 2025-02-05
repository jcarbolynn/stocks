import React from 'react';

const Output = ({error, loading, buyDays}) => {
    return (
    <>
        {error && <div className="error-message">{error}</div>}

          {loading ? (<div className="loading">Loading...</div>) : 
            <div>
              You should have bought this stock:

              {buyDays.map((item, index) => (
                <p key={index}>{item} </p>
              ))}
            </div>
          }
    </>

    )
}

export default Output