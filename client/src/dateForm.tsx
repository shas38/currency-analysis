import React from 'react';

const DateForm = (props: any) => {

  return (
    <form onSubmit={props.submit}>
      <label>
        From Date:&nbsp;
        <input
          type="date"
          value={props.fromDate}
          onChange={props.newFromDate} />
      </label>&nbsp;
      <label>
        To Date:&nbsp;
        <input
          type="date"
          value={props.toDate}
          onChange={props.newToDate} />
      </label>&nbsp;
      <button>Submit</button>
    </form>
  )

}

export default DateForm;
