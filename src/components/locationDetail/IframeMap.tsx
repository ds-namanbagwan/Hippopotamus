import * as React from "react";

type Address = {
  address: any;
};

const IframeMap = (props: Address) => {
  const { address } = props;

  return (
    <>
    <iframe className="h-[400px] w-full md:h-[500px] xl:h-full"
      src={`https://www.google.com/maps/embed/v1/place?q=${address.line1}&language=fr&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18`}>
    </iframe>
    </>
  );
};

export default IframeMap;
