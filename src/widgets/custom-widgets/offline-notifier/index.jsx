import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const OfflineNotifier = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleOffline() {
      setIsOnline(false);
    }

    function handleOnline() {
      setIsOnline(true);
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed opacity-80 bg-white z-20 hidden mx-auto bottom-10 left-0 right-0 w-fit md:block">
      <Typography
        variant="paragraph"
        color={"white"}
        className="text-center text-red-500 bg-black border-radius-4 font-sans rounded p-4 top-1em w-38em max-w-full overflow-hidden"
      >
        You are currently offline. Please check your internet connection.
      </Typography>
    </div>
  );
};

export default OfflineNotifier;
