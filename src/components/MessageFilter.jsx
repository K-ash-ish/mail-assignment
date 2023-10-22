function MessageFilter() {
  return (
    <div className="filter-message">
      <p>Filter by:</p>
      <div className="filter-by">
        <button className="filter-btn">Read</button>
        <button className="filter-btn">unread</button>
        <button className="filter-btn">favorites</button>
      </div>
    </div>
  );
}

export default MessageFilter;
