import Nav from "@/components/Nav";
import "@/style/style.scss";

export default function About() {
  return (
    <>
      <Nav />
      <main className="about-main">
        <section className="about-header">
          <section className="about-header-information">
            <h1>À Propos</h1>
            <p>
              Bonjour, je m’appelle Marine Sicaud. Depuis mon plus jeune âge,
              j'ai toujours eu une âme créative, fascinée par l’art et la
              manière dont les images pouvaient évoquer une émotion ou susciter
              une réflexion profonde. De nature curieuse, mon intérêt pour l’art
              a vu le jour lorsque les crayons et les pinceaux étaient mes
              compagnons constants, et où chaque coin de la maison était
              transformé en un atelier d'art. Cette créativité innée a tissé les
              bases de mon intérêt pour l'expression visuelle qui a évolué au
              fil des années. La photographie est pour moi un moyen puissant
              d'exprimer ma créativité en capturant des moments uniques qui
              évoquent des émotions intenses. Lorsque je prends un appareil
              photo entre mes mains, je suis transportée dans un monde où la
              beauté se trouve dans chaque coin de rue, dans chaque visage et
              dans chaque paysage.
            </p>
          </section>
          <img src="/assets/picture.png" />
        </section>

        <section className="about-job-container">
          <ul>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
            <p>Design</p>
          </ul>
        </section>
      </main>
    </>
  );
}
