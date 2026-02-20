import { MotionConfig } from "framer-motion";
import React from "react";

const MotionConfigWrapper = ({ children }: { children: React.ReactNode }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};

export default MotionConfigWrapper;
