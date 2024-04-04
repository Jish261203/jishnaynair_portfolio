import "./app.scss"
import Navbars from "./components/navbar/Navbars";

const App = () => {
  return (<div>
    <section id="HomePage">
      <Navbars/>
    </section>
    <section id="Skills">Parallex</section>
    <section>Skills And Technologies</section>
    <section id="Portfolio">Parallex</section>
    <section>Portfolio1</section>
    <section>Portfolio2</section>
    <section>Portfolio3</section>
    <section id="Contact">Contact</section>
  </div>)
};

export default App;
