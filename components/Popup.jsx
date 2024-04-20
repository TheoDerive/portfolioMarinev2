import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Popup({ data }) {
  return (
    <>
      {data.message !== "" ? (
        <section
          className="popup-container"
          style={
            data.ok
              ? {
                  background: "rgba(34, 155, 34, .7)",
                  color: "white",
                  border: "3px solid #229b22",
                }
              : {
                  background: "rgba(255, 0, 0, .7)",
                  color: "white",
                  border: "3px solid red",
                }
          }
        >
          <span className="information">
            <FontAwesomeIcon icon={faCircleInfo} />- Message
          </span>
          <p className="popup-message">{data.message}</p>
        </section>
      ) : null}
    </>
  );
}
