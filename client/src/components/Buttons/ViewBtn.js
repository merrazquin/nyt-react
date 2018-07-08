import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export const ViewBtn = props => (
  <a className="view-btn" target="_blank" {...props}><span className="fa fa-eye" aria-label="view article"></span></a>
);
