import React from "react";

import { Avatar as Avatars, AvatarFallback } from "@/components/ui/avatar";

const Avatar = () => {
  return (
    <>
      <Avatars>
        <AvatarFallback className="bg-primary text-white">PS</AvatarFallback>
      </Avatars>
    </>
  );
};

export default Avatar;
    