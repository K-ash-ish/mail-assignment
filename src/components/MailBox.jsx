import { useEffect, useState } from "react";
import { list } from "../data";
import { mail } from "../samplemail";
import MailContent from "./MailContent";
import formatTimestamp from "../utils/formatDate";
function MailBox() {
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [allMail, setAllMail] = useState([]);
  const [currentMail, setCurrentMail] = useState("");
  const [mailId, setMailId] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState();
  const [user, setUser] = useState();
  const [isFavorite, setIsFavorite] = useState([]);
  useEffect(() => {
    (async () => {
      const mail = await fetch("https://flipkart-email-mock.vercel.app/");
      const data = await mail.json();
      setAllMail(data?.list);
    })();
  }, []);
  async function handleClick(id, subject, date, user) {
    const currentMailJson = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${id}`
    );
    const data = await currentMailJson.json();
    setCurrentMail(data);
    setIsMailOpen(true);
    setMailId(id);
    setSubject(subject);
    setDate(date);
    setUser(user);
  }

  return (
    <section className="mail-section">
      <div className={`mail-list ${!isMailOpen ? "full-mail-list" : ""}`}>
        {allMail?.map((data) => {
          return (
            <div
              key={data.id}
              className="mail-preview"
              onClick={() => {
                handleClick(
                  data.id,
                  data.subject,
                  formatTimestamp(data.date),
                  data.from.name.slice(0, 1)
                );
              }}
            >
              <div>
                <p className="user-img">{data.from.name.slice(0, 1)}</p>
              </div>
              <div className="mail-info">
                <div className="user-info">
                  <p className=" text-capitalize">
                    <span className="text-light">From: </span>
                    <span className="text-bold">{data.from.name}</span>{" "}
                    <span className="text-lowercase text-bold">{`<${data.from.email}>`}</span>
                  </p>
                  <p>
                    <span className="text-light">Subject: </span>
                    {data.subject}
                  </p>
                </div>
                <div className="mail-description">
                  <p className="text-light">{data.short_description}</p>
                  <p className="text-light">{formatTimestamp(data.date)}</p>
                  {isFavorite.includes(data.id) ? (
                    <p style={{ color: "#e54065" }}>Favorite</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isMailOpen && (
        <MailContent
          mailId={mailId}
          subject={subject}
          date={date}
          user={user}
          content={currentMail?.body}
          setIsFavorite={setIsFavorite}
          isFavorite={isFavorite}
        />
      )}
    </section>
  );
}

export default MailBox;
