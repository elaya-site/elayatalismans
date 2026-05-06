import Reveal from "./Reveal";
import Star from "./Star";

export default function Reassurance() {
  return (
    <Reveal as="section" className="reassure" threshold={0.2}>
      <div className="reassure__inner">
        <div className="reassure__star fade-up"><Star size={11} /></div>
        <p className="reassure__line fade-up delay-1">
          Chaque bijou ELAYA est <em>unique.</em><br />
          De légères variations peuvent exister, témoignant de son authenticité.
        </p>
        <p className="reassure__line fade-up delay-2">
          Pensés pour s&apos;adapter à vous, nos bijoux sont en taille <em>ajustable.</em><br />
          Conçus en <em>acier inoxydable</em>, ils vous accompagnent dans le temps,<br />
          sans perdre leur éclat.
        </p>
      </div>
    </Reveal>
  );
}
