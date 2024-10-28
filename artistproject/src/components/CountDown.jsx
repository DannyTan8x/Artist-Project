import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MainContext } from "./ContextProvider/MainContext";

export default function CountDown({ datetime, config, onTimeUp }) {
  const DateTime = datetime;
  const { setIsvalid } = useContext(MainContext);

  const comingSoonDate = new Date(DateTime);
  comingSoonDate.setDate(comingSoonDate.getDate() + 7);

  const closeInDate = new Date(DateTime);
  closeInDate.setDate(closeInDate.getDate() + 14);

  const [isClosed, setIsClosed] = useState(false);
  const [isOnGoing, setIsOnGoing] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountDown = () => {
      const now = new Date();
      const timeUntilComingSoon = comingSoonDate - now;
      const timeUntilCloseIn = closeInDate - now;

      let days, hours, minutes, seconds;

      if (timeUntilCloseIn > 0) {
        if (timeUntilComingSoon > 0) {
          setIsOnGoing(false);
          days = Math.floor(timeUntilComingSoon / (1000 * 60 * 60 * 24));
          hours = Math.floor(
            (timeUntilComingSoon % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          minutes = Math.floor(
            (timeUntilComingSoon % (1000 * 60 * 60)) / (1000 * 60)
          );
          seconds = Math.floor((timeUntilComingSoon % (1000 * 60)) / 1000);

          if (onTimeUp) {
            onTimeUp(false); // Notify the parent component (Coming Soon phase)
          }
        } else {
          setIsOnGoing(true);
          days = Math.floor(timeUntilCloseIn / (1000 * 60 * 60 * 24));
          hours = Math.floor(
            (timeUntilCloseIn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          minutes = Math.floor(
            (timeUntilCloseIn % (1000 * 60 * 60)) / (1000 * 60)
          );
          seconds = Math.floor((timeUntilCloseIn % (1000 * 60)) / 1000);

          if (onTimeUp) {
            onTimeUp(true); // Notify the parent component (Close-In phase)
          }
        }

        setRemainingTime({ days, hours, minutes, seconds });
      } else {
        setIsClosed(true);
        setRemainingTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        if (onTimeUp) {
          onTimeUp(false); // Notify the parent component (Auction closed)
        }
      }
    };

    const intervalId = setInterval(updateCountDown, 1000);
    return () => clearInterval(intervalId);
  }, [comingSoonDate, closeInDate, onTimeUp]);

  return (
    <>
      {/* <p>{DateTime}</p> */}
      {!isClosed ? (
        <div className={`${config.CountDownClass}`}>
          {!isOnGoing ? (
            <span className={`me-3 text-info ${config.textClass}`}>
              Coming Soon{" "}
            </span>
          ) : (
            <span className={`me-3 text-success ${config.textClass}`}>
              CLOSE IN{" "}
            </span>
          )}
          <div className={`datetime ${config.clockClass}`}>
            {config?.days && remainingTime.days > 0
              ? `${remainingTime.days} day `
              : ""}
            {config?.hours && remainingTime.hours > 0
              ? ` ${remainingTime.hours} h `
              : ""}
            {config?.minutes && remainingTime.minutes > 0
              ? ` ${remainingTime.minutes} m `
              : ""}
            {config?.seconds && remainingTime.seconds > 0
              ? ` ${remainingTime.seconds} s `
              : ""}
          </div>
        </div>
      ) : (
        <span className={`h1 text-danger ${config.textClass}`}>CLOSED!</span>
      )}
    </>
  );
}

CountDown.propTypes = {
  datetime: PropTypes.string.isRequired,
  config: PropTypes.shape({
    days: PropTypes.bool,
    hours: PropTypes.bool,
    minutes: PropTypes.bool,
    seconds: PropTypes.bool,
    clockClass: PropTypes.string,
    textClass: PropTypes.string,
    CountDownClass: PropTypes.string,
  }),
  onTimeUp: PropTypes.func, // Ensure parent gets notified
};
