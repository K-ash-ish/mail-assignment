function MailContent(props) {
  const { mailId, subject, date, user, content, setIsFavorite, isFavorite } =
    props;
  const div = document.createElement("div");
  div.innerHTML = content;

  return (
    <section className="mail-body">
      <div className="mail-content-header">
        <div>
          <p className="user-img">{user}</p>
        </div>
        <div className="mail-content-description">
          <h2>{subject}</h2>
          <p className="text-light">{date}</p>
        </div>
        <button
          className="fvrt-btn"
          onClick={() => {
            setIsFavorite((prevValue) => {
              if (isFavorite.includes(mailId)) {
                return [...prevValue];
              }
              return [...prevValue, mailId];
            });
          }}
        >
          Mark as favorite
        </button>
      </div>
      <div className="mail-content text-light">{div.innerText}</div>
    </section>
  );
}

export default MailContent;
