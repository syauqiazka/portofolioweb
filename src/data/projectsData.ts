export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  cat: string;
  catColor: "cyan" | "violet" | "amber" | "rose";
  year: string;
  status: "Production" | "Research" | "Live";
  desc: string;
  stack: string[];
  impact: string[];
  link: string;
  github: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "pipeline-etl",
    title: "Real-time ETL Pipeline",
    subtitle: "Airflow + BigQuery + dbt",
    tags: ["Pipeline", "BigQuery", "Airflow", "dbt"],
    cat: "Data Engineering",
    catColor: "cyan",
    year: "2024",
    status: "Production",
    desc: "Pipeline ingestion & transformasi data transaksi dari 3 sumber berbeda (REST API, PostgreSQL, flat files) ke BigQuery menggunakan Airflow DAG + dbt models. Memproses 2M+ baris per hari.",
    stack: ["Apache Airflow", "dbt", "BigQuery", "Python", "Docker"],
    impact: ["2M+ baris/hari diproses", "Latency turun 60%", "15+ dbt models tertest"],
    link: "#",
    github: "#",
  },
  {
    id: "churn-model",
    title: "Customer Churn Predictor",
    subtitle: "Scikit-learn + Metabase",
    tags: ["ML", "Analytics", "Python"],
    cat: "Analytics & ML",
    catColor: "violet",
    year: "2023",
    status: "Production",
    desc: "Model prediksi churn pelanggan e-commerce dengan fitur RFM, behavioral segmentation, dan Gradient Boosting. Dashboard monitoring akurasi model terintegrasi di Metabase.",
    stack: ["Python", "Scikit-learn", "Pandas", "Metabase", "PostgreSQL"],
    impact: ["Akurasi 82% di test set", "Churn rate turun 18%", "Dashboard real-time eksekutif"],
    link: "#",
    github: "#",
  },
  {
    id: "data-warehouse",
    title: "Enterprise Data Warehouse",
    subtitle: "Dimensional Modeling + Snowflake",
    tags: ["Warehouse", "SQL", "Snowflake"],
    cat: "Data Engineering",
    catColor: "cyan",
    year: "2023",
    status: "Production",
    desc: "Desain skema dimensional (star schema) untuk modul keuangan & operasional perusahaan mid-size. Biaya query BigQuery turun 40% setelah implementasi partitioning dan clustering.",
    stack: ["Snowflake", "dbt", "SQL", "Python", "Looker Studio"],
    impact: ["Query cost -40%", "6 fact tables, 18 dim tables", "3 departemen terlayani"],
    link: "#",
    github: "#",
  },
  {
    id: "sentiment-nlp",
    title: "Sentimen Ulasan Marketplace",
    subtitle: "NLP · Naïve Bayes · TF-IDF",
    tags: ["ML", "NLP", "Python"],
    cat: "Analytics & ML",
    catColor: "violet",
    year: "2020",
    status: "Research",
    desc: "Skripsi: Klasifikasi sentimen 50.000 ulasan produk menggunakan Naïve Bayes dengan TF-IDF feature extraction. Implementasi preprocessing Bahasa Indonesia (stemming, stopwords).",
    stack: ["Python", "NLTK", "Scikit-learn", "Pandas", "Matplotlib"],
    impact: ["78% akurasi klasifikasi", "50K dataset ulasan", "Juara 2 Kompetisi DM Regional"],
    link: "#",
    github: "#",
  },
  {
    id: "dashboard-bi",
    title: "Executive BI Dashboard",
    subtitle: "Metabase + SQL + Looker Studio",
    tags: ["Analytics", "Dashboard", "SQL"],
    cat: "Analytics & Viz",
    catColor: "amber",
    year: "2023",
    status: "Production",
    desc: "Dashboard eksekutif untuk monitoring KPI bisnis real-time: revenue, retention, funnel konversi, dan anomali harian. Mengotomatiskan 25+ laporan Excel manual menjadi pipeline terstruktur.",
    stack: ["Metabase", "Looker Studio", "PostgreSQL", "SQL", "Python"],
    impact: ["25+ laporan manual dihapus", "Dashboard refresh < 5 menit", "4 tim bisnis terlayani"],
    link: "#",
    github: "#",
  },
  {
    id: "portfolio-web",
    title: "Portfolio ini sendiri",
    subtitle: "Next.js · Framer Motion · TypeScript",
    tags: ["Frontend", "Design"],
    cat: "Side Projects",
    catColor: "rose",
    year: "2024",
    status: "Live",
    desc: "Portofolio interaktif dengan transisi halaman Aizen slash, ilustrasi botani dinamis, kinetic typography, dan Web Audio synthesizer — dibangun dari nol tanpa template.",
    stack: ["Next.js 16", "TypeScript", "Framer Motion", "Tailwind CSS"],
    impact: ["Aizen dimensional rift transition", "Day/Night landscape SVG", "Web Audio API synth"],
    link: "/",
    github: "#",
  },
];

export const FILTERS = ["All", "Data Engineering", "Analytics & ML", "Analytics & Viz", "Side Projects"];

export const CAT_COLORS: Record<string, { dot: string; badge: string; bar: string }> = {
  cyan: {
    dot: "bg-cyan-400",
    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    bar: "from-cyan-400 to-blue-500",
  },
  violet: {
    dot: "bg-violet-400",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    bar: "from-violet-400 to-purple-500",
  },
  amber: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    bar: "from-amber-400 to-orange-500",
  },
  rose: {
    dot: "bg-rose-400",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    bar: "from-rose-400 to-pink-500",
  },
};

export const STATUS_STYLE: Record<string, string> = {
  Production: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Research: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Live: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};
