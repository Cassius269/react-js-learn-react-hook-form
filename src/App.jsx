import "./assets/styles/App.scss";
import UserForm from "./components/UserForm";

function App() {
  return (
    <>
      <h1 className="text-danger">Hello world</h1>
      <main className="container">
        <section>
          <UserForm />
        </section>
      </main>
    </>
  );
}

export default App;
