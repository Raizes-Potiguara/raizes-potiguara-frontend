import Footer from "@/components/general/Footer";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { CORES } from "@/util/constants";

const MotionDiv = motion.div;

export default function Layout() {
  const location = useLocation();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <AnimatePresence mode="wait">
        <MotionDiv
          key={location.pathname}
          initial={{
            y: "60%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            opacity: 1
          }}
          transition={{
            duration: 0.35,
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            background: `${CORES.PRETO}`,
            willChange: "transform",
          }}
        >
          <div style={{ flex: 1, overflow: "auto" }}>
            <Outlet />
          </div>

          <Footer />
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
}