import Image from "next/image";

const skillGroups = [
  {
    category: "Langages",
    tools: "Python (NumPy, Pandas, Scikit-learn), SQL",
  },
  {
    category: "Bases de données",
    tools: "MySQL, PostgreSQL, Oracle, NoSQL, MongoDB",
  },
  {
    category: "Machine Learning",
    tools: "Classification, Régression, Random Forest, modélisation prédictive",
  },
  {
    category: "IA / NLP",
    tools: "LLM, NLP, FLAN-T5, analyse de données textuelles",
  },
  {
    category: "Data Visualisation",
    tools: "Power BI, Tableau, Grafana, Excel, suivi KPI",
  },
  {
    category: "Data Engineering",
    tools: "ETL / ELT, pipelines, Data Warehouse, Data Lake, data quality",
  },
  {
    category: "Big Data",
    tools: "Apache Hadoop, Spark",
  },
  {
    category: "MLOps / Cloud & DevOps",
    tools:
      "Docker, CI/CD, APIs (FastAPI), Git, GitLab, Jenkins, Ansible, Terraform, notions GCP / AWS / Azure",
  },
  {
    category: "Sécurité des systèmes & réseaux",
    tools:
      "Microsoft 365, Linux, administration & hardening, SIEM / SOC, audit, conformité, gestion du risque, SCCM",
  },
];

const education = [
  {
    degree: "Master Data Science & Stratégie",
    school: "Ionis-STM, Paris — France",
    period: "Depuis octobre 2025",
  },
  {
    degree: "Licence Professionnelle en Administration et Sécurité Réseaux",
    school: "Institut Universitaire de la Côte, Douala — Cameroun",
    period: "2022 - 2023",
  },
  {
    degree: "BTS Réseaux et Sécurité",
    school: "Institut Universitaire de la Côte, Douala — Cameroun",
    period: "2020 - 2022",
  },
];

const fallbackProjects = [
  {
    id: "fallback-1",
    name: "Projets GitHub",
    description:
      "Les repositories publics de Snell429 apparaitront automatiquement ici des que l'API GitHub repond.",
    html_url: "https://github.com/Snell429",
    language: "GitHub",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString(),
  },
];

async function getGithubProjects() {
  try {
    const response = await fetch("https://api.github.com/users/Snell429/repos?sort=updated&per_page=12", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return fallbackProjects;
    }

    const repos = await response.json();

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => {
        const stars = b.stargazers_count - a.stargazers_count;
        if (stars !== 0) return stars;
        return new Date(b.updated_at) - new Date(a.updated_at);
      })
      .slice(0, 6);
  } catch {
    return fallbackProjects;
  }
}

function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getProjectVisual(repo) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || "").toLowerCase();
  const searchable = `${name} ${description}`;

  if (searchable.includes("healthcare") || searchable.includes("warehouse")) {
    return {
      label: "BI",
      title: "Healthcare BI",
      detail: "Data warehouse, KPI et prediction patient",
      pattern: "grid",
    };
  }

  if (searchable.includes("nlp") || searchable.includes("ai-service") || searchable.includes("flan")) {
    return {
      label: "NLP",
      title: "IA Generative",
      detail: "Modele NLP, API et extraction textuelle",
      pattern: "nodes",
    };
  }

  if (searchable.includes("iot")) {
    return {
      label: "IoT",
      title: "Agents connectes",
      detail: "Donnees capteurs, automatisation et monitoring",
      pattern: "signal",
    };
  }

  if (searchable.includes("java") || searchable.includes("mysql") || searchable.includes("student")) {
    return {
      label: "SQL",
      title: "Application data",
      detail: "Java, MySQL, JDBC et gestion relationnelle",
      pattern: "database",
    };
  }

  if (searchable.includes("portfolio") || searchable.includes("guy-nonkala")) {
    return {
      label: "GN",
      title: "Portfolio",
      detail: "Next.js, Tailwind CSS et GitHub API",
      pattern: "portfolio",
    };
  }

  return {
    label: repo.language || "DEV",
    title: "Projet GitHub",
    detail: "Code, experimentation et apprentissage",
    pattern: "default",
  };
}

function ProjectIcon({ visual }) {
  const lineClass = "stroke-current";
  const fillClass = "fill-current";

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-lg shadow-black/10 transition group-hover:bg-white group-hover:text-black group-hover:shadow-white/10">
      {visual.pattern === "grid" && (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path className={lineClass} d="M10 38h28M14 38V16h20v22M20 16V9h8v7" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path className={lineClass} d="M21 24h6M24 21v6M18 32h1M29 32h1" fill="none" strokeWidth="3" strokeLinecap="round" />
          <path className={fillClass} d="M34 26h7v12h-7z" />
        </svg>
      )}
      {visual.pattern === "nodes" && (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <circle className={lineClass} cx="14" cy="16" r="6" fill="none" strokeWidth="3" />
          <circle className={lineClass} cx="34" cy="16" r="6" fill="none" strokeWidth="3" />
          <circle className={lineClass} cx="24" cy="34" r="6" fill="none" strokeWidth="3" />
          <path className={lineClass} d="M19 19l3 9M29 19l-3 9M20 16h8" fill="none" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {visual.pattern === "signal" && (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <path className={lineClass} d="M8 34c8-8 24-8 32 0M14 27c5-5 15-5 20 0M20 20c2-2 6-2 8 0" fill="none" strokeWidth="3" strokeLinecap="round" />
          <circle className={fillClass} cx="24" cy="38" r="4" />
        </svg>
      )}
      {visual.pattern === "database" && (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <ellipse className={lineClass} cx="24" cy="12" rx="14" ry="6" fill="none" strokeWidth="3" />
          <path className={lineClass} d="M10 12v24c0 3 6 6 14 6s14-3 14-6V12M10 24c0 3 6 6 14 6s14-3 14-6" fill="none" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {visual.pattern === "portfolio" && (
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
          <rect className={lineClass} x="9" y="12" width="30" height="24" rx="4" fill="none" strokeWidth="3" />
          <path className={lineClass} d="M15 20h18M15 27h10M29 27h4" fill="none" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {visual.pattern === "default" && (
        <span className="text-sm font-black uppercase tracking-tight">
          {visual.label}
        </span>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>
    </div>
  );
}

export default async function Home() {
  const projects = await getGithubProjects();

  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <section id="hero" className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-10 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-14">
        <div className="animate-rise flex -translate-y-12 flex-col items-center lg:-translate-x-10 lg:items-start">
          <p className="mb-4 text-center text-3xl font-semibold tracking-tight text-blue-700 sm:text-4xl lg:text-left">
            Guy Leopold Nonkala
          </p>
          <div className="relative w-40 sm:w-48">
            <div className="overflow-hidden rounded-[1.25rem] border border-black/10 bg-zinc-100 shadow-xl shadow-black/10">
              <Image
                src="/guy-nonkala.jpg"
                alt="Portrait de Guy Nonkala"
                width={900}
                height={1200}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="mt-5 flex w-full flex-col gap-3">
              <a
                className="inline-flex h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
                href="mailto:guynonkala@gmail.com"
              >
                guynonkala@gmail.com
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/20 px-5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black hover:bg-black/5"
                href="https://github.com/Snell429"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Snell429
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/20 px-5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black hover:bg-black/5"
                href="https://www.linkedin.com/in/guy-nonkala"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="animate-rise text-center lg:text-left">
          <h1 className="mt-8 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-black sm:text-4xl lg:text-5xl">
            Donner du sens aux données pour créer des solutions intelligentes.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg lg:mx-0">
            Étudiant en Master Data Science & Stratégie, je développe des
            compétences en analyse de données, machine learning et traitement
            des données à travers des projets concrets utilisant Python, SQL et
            des outils de visualisation de données.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg lg:mx-0">
            Intéressé par l&apos;exploitation des données à des fins d&apos;aide à la
            décision, je m&apos;intéresse particulièrement au développement de
            modèles prédictifs, à l&apos;analyse statistique et à la valorisation
            des données métier.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Voir les projets
            </a>
            <a
              href="/CV-Guy-Nonkala.pdf"
              download
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black hover:bg-black/5"
            >
              Telecharger CV
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="px-6 py-24 sm:px-8">
        <SectionHeader
          eyebrow="Skills"
          title="Compétences"
          description="Un socle technique complet pour concevoir des pipelines fiables, analyser les données, entraîner des modèles et livrer des insights exploitables."
        />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((skill, index) => (
            <div
              key={skill.category}
              className="group rounded-3xl border border-black/10 bg-white p-6 text-left shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <h3 className="text-lg font-semibold tracking-tight text-black group-hover:text-white">
                {skill.category}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 group-hover:text-zinc-300">
                {skill.tools}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="border-y border-black/10 bg-zinc-50 px-6 py-24 sm:px-8">
        <SectionHeader
          eyebrow="GitHub Projects"
          title="Repositories publics"
          description="Les projets sont récupérés automatiquement depuis GitHub, avec un focus sur Data Warehouse, BI, Machine Learning, NLP et déploiement IA."
        />
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((repo) => {
            const visual = getProjectVisual(repo);

            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-72 flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 transition duration-300 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500 group-hover:text-zinc-400">
                    <span>{repo.language || "Code"}</span>
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <ProjectIcon visual={visual} />
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700 group-hover:text-blue-300">
                        {visual.title}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {repo.name.replaceAll("-", " ")}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-zinc-600 group-hover:text-zinc-300">
                    {repo.description ||
                      "Repository GitHub public de Guy Nonkala, a explorer pour voir le code, l'approche et l'evolution du projet."}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5 text-sm text-zinc-600 group-hover:border-white/10 group-hover:text-zinc-300">
                  <span>{repo.stargazers_count} stars</span>
                  <span>{repo.forks_count} forks</span>
                  <span className="font-semibold text-black group-hover:text-white">
                    Ouvrir
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="education" className="px-6 py-24 sm:px-8">
        <SectionHeader
          eyebrow="Education"
          title="Formation"
          description="Un parcours académique construit autour de la Data Science, des systèmes d'information et des réseaux."
        />
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {education.map((item) => (
            <div
              key={item.degree}
              className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5"
            >
              <p className="text-sm font-semibold text-blue-700">{item.period}</p>
              <h3 className="mt-4 text-xl font-semibold leading-7 tracking-tight text-black">
                {item.degree}
              </h3>
              <p className="mt-4 text-sm leading-6 text-zinc-600">{item.school}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="px-6 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-zinc-500">
            Contact
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-blue-700 sm:text-5xl">
            Échangeons sur vos projets data.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Disponible dès septembre 2026 pour une alternance en Data Science,
            Machine Learning et Business Intelligence.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:guynonkala@gmail.com"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              guynonkala@gmail.com
            </a>
            <a
              href="https://github.com/Snell429"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black hover:bg-black/5"
            >
              GitHub Snell429
            </a>
            <a
              href="https://www.linkedin.com/in/guy-nonkala"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/20 px-6 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:border-black hover:bg-black/5"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
