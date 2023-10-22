import "./App.css";
import MailBox from "./components/MailBox";
import MessageFilter from "./components/MessageFilter";

function App() {
  return (
    <main className="container">
      <MessageFilter />
      <MailBox />
    </main>
  );
}

export default App;
