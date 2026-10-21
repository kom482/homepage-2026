import './App.css';
import AnnotationBackground from './components/AnnotationBackground';

const EMAIL = 'kom482@gmail.com';

function scrollTo(sel: string) {
  const el = document.querySelector(sel);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function App() {
  return (
    <>
      <header className="site-header">
        <div
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
        <nav>
          <div className="item" onClick={() => scrollTo('.about')}>
            About
          </div>
          <div className="item" onClick={() => scrollTo('.cv')}>
            CV
          </div>
          <div className="item" onClick={() => scrollTo('.contact')}>
            Contact
          </div>
        </nav>
      </header>

      {/* ---- About (ambient canvas annotation background) ---- */}
      <section className="about">
        <AnnotationBackground />
        <img className="my-photo" src="/photo.jpg" alt="Viacheslav Komarivskyi" />
        <div className="text">
          <div className="print-head print-only">
            <h1>Viacheslav Komarivskyi</h1>
            <p className="print-role">
              Senior Software Engineer — Medical Imaging · Roche
            </p>
            <p className="print-contact">
              {EMAIL} ·{' '}
              <a href="https://komarivskyi.com">komarivskyi.com</a> · Warsaw,
              Poland
            </p>
          </div>
          <h1 className="no-print">About me</h1>
          <p>
            Hi, I'm Viacheslav Komarivskyi, a&nbsp;software engineer from
            Poland, currently living in Warsaw.
          </p>
          <p>
            I have more than 10 years of experience as a&nbsp;developer, and
            these days I&nbsp;focus on medical imaging. I&nbsp;love building
            fast, reliable web applications with Angular, React, TypeScript and
            Three.js.
          </p>
          <a
            className="btn"
            href="/Viacheslav-Komarivskyi-CV.pdf"
            target="_blank"
            rel="noreferrer"
            download
          >
            <span className="btn__image" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v12M7 11l5 5 5-5M5 20h14"
                />
              </svg>
            </span>
            <span className="btn__text">Download CV</span>
          </a>
        </div>
      </section>

      {/* ---- CV ---- */}
      <section className="cv">
        <h1>CV</h1>
        <div className="cv-cols">
          <div className="col_left">
            <h2>Work experience</h2>

            <div className="date_range_item stacked">
              <div className="text">
                <h3>
                  <span className="year">since 2022</span> Senior Software
                  Engineer
                  <br />
                  Roche, Poland
                </h3>
                Senior software engineer specializing in medical imaging
                visualization, with a primary focus on Digital Pathology and
                extensive experience in Radiology and Ophthalmology. Develop and
                optimize complex rendering solutions, integrating commercial and
                open-source imaging libraries to visualize algorithm results,
                annotations, and overlays, enabling intuitive interpretation of
                medical imaging data and supporting clinical workflows.
              </div>
            </div>

            <div className="date_range_item stacked">
              <div className="text">
                <h3>
                  <span className="year">2016 - 2022</span> Lead Software
                  Developer
                  <br />
                  <span className="year">2013 - 2016</span> Front-End Developer
                  <br />
                  Medorado, Poland
                </h3>
                Led the development of web applications and cross-platform mobile
                apps for major pharmaceutical clients, including Roche, Pfizer,
                Lilly, Adamed, and Boehringer Ingelheim. Developed Ionic and
                Angular
                mobile applications and interactive 3D web experiences using
                WebGL, Three.js, and Blender, including virtual exhibition spaces
                and immersive conference environments.
                <br />
                <br />
                Developed a high-performance medical live-streaming platform
                supporting up to 15,000 concurrent users per event, with
                automatic failover between multiple streaming sources.
                <ul>
                  <li>
                    Technical architecture, technology selection, and effort
                    estimation.
                  </li>
                  <li>
                    Development planning, task coordination, and team mentoring.
                  </li>
                  <li>
                    Application performance optimization, deployment, and
                    reliability.
                  </li>
                </ul>
              </div>
            </div>

            <div className="date_range_item stacked">
              <div className="text">
                <h3>
                  <span className="year">2012 - 2013</span> Junior Demandware
                  Developer
                  <br />
                  Astound Commerce, Ukraine
                </h3>
                Participated in the development of websites for FinishLine,
                L’Oréal and Giorgio Armani.
              </div>
            </div>

            <h2>Technologies</h2>
            <div className="date_range_item stacked">
              <div className="date">Frameworks &amp; libraries</div>
              <div className="text">
                Angular, NgRx, RxJS, React, Ionic.
              </div>
            </div>
            <div className="date_range_item stacked">
              <div className="date">Languages &amp; runtime</div>
              <div className="text">
                JavaScript, TypeScript, Python, Node.js.
              </div>
            </div>
            <div className="date_range_item stacked">
              <div className="date">Medical imaging &amp; visualization</div>
              <div className="text">
                Cornerstone.js (OHIF), OpenSeadragon, VTK.js, Three.js, Orthanc,
                DICOMweb. Integration of medical imaging libraries into
                production applications, including bug fixes and contributions
                to the Cornerstone.js open-source project.
              </div>
            </div>
            <div className="date_range_item stacked">
              <div className="date">Test automation &amp; validation</div>
              <div className="text">
                Extensive experience with Cypress and Playwright for automated
                testing of complex medical imaging platforms, including visual
                regression testing, image comparison, and rendering performance
                measurement. Strong domain expertise in imaging viewer behavior
                and rendering pipelines, enabling effective collaboration with
                UI automation engineers to design robust tests for complex
                visualization workflows.
              </div>
            </div>
            <div className="date_range_item stacked">
              <div className="date">AI-assisted &amp; agentic development</div>
              <div className="text">
                Hands-on experience with agentic software development workflows
                using Claude Code and AI coding agents for code generation,
                refactoring, debugging, code review, and test automation.
                Experienced in integrating AI-assisted workflows into software
                engineering practices to improve development efficiency and code
                quality.
              </div>
            </div>

            <h2>Education</h2>
            <div className="date_range_item stacked">
              <div className="text">
                <h3>
                  <span className="year">2008 - 2012</span> Vinnytsia State
                  Pedagogical University, Ukraine
                </h3>
                “Mathematics, Physics and Technology Science”
                <br />
                Bachelor degree of Mathematics
                <br />
                <br />
                As a student I actively took part in technical and science
                competitions, twice becoming a prize-winner of the “Microsoft
                Partners in Learning” contest. I also worked on a range of
                educational projects, building web resources, platforms and
                software for learning.
              </div>
            </div>
          </div>

          <div className="col_right">
            <h2>Personal information</h2>
            <div className="date_range_item">
              <div className="date">Email:</div>
              <div className="text">
                <a className="plain-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="date_range_item">
              <div className="date">Location:</div>
              <div className="text">Warsaw, Poland</div>
            </div>

            <h2>Languages</h2>
            <div className="date_range_item">
              <div className="date">Ukrainian</div>
              <div className="text">Native</div>
            </div>
            <div className="date_range_item">
              <div className="date">English</div>
              <div className="text">Fluent</div>
            </div>
            <div className="date_range_item">
              <div className="date">Polish</div>
              <div className="text">Fluent</div>
            </div>

            <h2>Hobbies</h2>
            <div className="date_range_item">
              <div className="text">3D Printing, Gaming, Longboarding</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section className="contact">
        <h1>Contact</h1>
        <p>
          Drop me a&nbsp;line if you want to say “hi” or talk about medical
          imaging, viewers, or anything volumetric on the web. I'll be happy to
          hear from you: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </section>
    </>
  );
}

export default App;
