import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export const SaveBtn = props => (
  <span className="save-btn fa fa-save"  aria-label="save article" {...props}></span>
);
