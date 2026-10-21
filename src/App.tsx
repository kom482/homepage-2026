import './App.css';
import AnnotationBackground from './components/AnnotationBackground';

const EMAIL = 'kom482@gmail.com';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/viacheslav-komarivskyi-49b16284/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kom482',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/komarivskyi/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com/Komarivskyi',
    path: 'M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a42.153 42.153 0 0 0-.767-1.68c2.31-1 4.165-2.358 5.548-4.082a9.863 9.863 0 0 1 2.322 5.835zM12 2.126c2.45 0 4.692.874 6.442 2.32-1.236 1.564-2.957 2.79-5.145 3.715a42.272 42.272 0 0 0-3.797-5.87A9.9 9.9 0 0 1 12 2.126zM7.332 3.063a44.98 44.98 0 0 1 3.767 5.796c-2.825.746-6.023.975-9.56.945a9.908 9.908 0 0 1 5.793-6.74zM2.096 12.12v-.31c4.063.043 7.716-.263 10.947-1.19.237.46.46.927.666 1.397-3.308.973-6.063 2.92-8.258 5.916a9.855 9.855 0 0 1-3.355-5.813zM12 21.874a9.86 9.86 0 0 1-6.09-2.096c1.84-2.634 4.21-4.368 7.128-5.207 1.006 2.61 1.737 5.212 2.19 7.818A9.861 9.861 0 0 1 12 21.874zm5.313-1.74c-.42-2.436-1.09-4.86-2.01-7.264 1.936-.317 4.018-.252 6.26.173a9.9 9.9 0 0 1-4.25 7.09z',
  },
];

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
        <ul className="socials no-print" aria-label="Social links">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
