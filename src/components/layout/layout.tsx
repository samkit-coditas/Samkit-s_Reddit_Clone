import React, { PropsWithChildren } from "react";
import Navbar from "../navbar/navbar";

interface layoutProps extends PropsWithChildren {}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default layout;
