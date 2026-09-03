import {
  Server,
  Database,
  BarChart2,
  FlaskConical,
  Cloud,
  Code2,
  LucideIcon,
} from "lucide-react";

export interface ToolItem {
  name: string;
  level: number;
  status: "expert" | "proficient" | "learning";
}

export interface TechCategory {
  category: string;
  color: string;
  border: string;
  bg: string;
  text: string;
  icon: LucideIcon;
  tools: ToolItem[];
}

export const TECH_STACK: TechCategory[] = [
  {
    category: "Data Processing & Pipelines",
    color: "from-cyan-500 to-blue-600",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    icon: Server,
    tools: [
      { name: "Apache Spark", level: 82, status: "proficient" },
      { name: "Apache Kafka", level: 74, status: "proficient" },
      { name: "Apache Airflow", level: 78, status: "proficient" },
      { name: "dbt (Data Build Tool)", level: 85, status: "expert" },
      { name: "Pandas / Polars", level: 92, status: "expert" },
      { name: "PySpark", level: 80, status: "proficient" },
    ],
  },
  {
    category: "Databases & Data Warehouses",
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    icon: Database,
    tools: [
      { name: "PostgreSQL", level: 90, status: "expert" },
      { name: "BigQuery", level: 84, status: "proficient" },
      { name: "Snowflake", level: 76, status: "proficient" },
      { name: "ClickHouse", level: 70, status: "learning" },
      { name: "Redis", level: 78, status: "proficient" },
      { name: "MongoDB", level: 72, status: "proficient" },
    ],
  },
  {
    category: "Analytics & Visualization",
    color: "from-amber-500 to-orange-500",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    icon: BarChart2,
    tools: [
      { name: "Metabase", level: 88, status: "expert" },
      { name: "Apache Superset", level: 82, status: "proficient" },
      { name: "Looker Studio", level: 86, status: "proficient" },
      { name: "Matplotlib / Seaborn", level: 88, status: "expert" },
      { name: "Plotly / Dash", level: 80, status: "proficient" },
      { name: "Power BI", level: 68, status: "learning" },
    ],
  },
  {
    category: "ML & Statistical Analysis",
    color: "from-rose-500 to-pink-600",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    icon: FlaskConical,
    tools: [
      { name: "Scikit-learn", level: 82, status: "proficient" },
      { name: "NumPy / SciPy", level: 88, status: "expert" },
      { name: "Jupyter Notebook", level: 94, status: "expert" },
      { name: "MLflow", level: 68, status: "learning" },
      { name: "TensorFlow (Basics)", level: 60, status: "learning" },
      { name: "Feature Engineering", level: 80, status: "proficient" },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    color: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: Cloud,
    tools: [
      { name: "Google Cloud Platform", level: 80, status: "proficient" },
      { name: "Docker", level: 85, status: "proficient" },
      { name: "Kubernetes (basics)", level: 60, status: "learning" },
      { name: "Terraform", level: 65, status: "learning" },
      { name: "AWS S3 / Glue", level: 72, status: "proficient" },
      { name: "Linux / Shell Scripting", level: 88, status: "expert" },
    ],
  },
  {
    category: "Programming Languages",
    color: "from-indigo-500 to-blue-500",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    icon: Code2,
    tools: [
      { name: "Python", level: 94, status: "expert" },
      { name: "SQL (Advanced)", level: 92, status: "expert" },
      { name: "Bash / Shell", level: 85, status: "proficient" },
      { name: "TypeScript / Next.js", level: 80, status: "proficient" },
      { name: "R (Statistical)", level: 62, status: "learning" },
      { name: "Scala (Spark)", level: 58, status: "learning" },
    ],
  },
];

export const STATUS_COLORS = {
  expert: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  proficient: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
  learning: "text-amber-400 border-amber-500/40 bg-amber-500/10",
};

export interface LearningItem {
  name: string;
  icon: string;
  desc: string;
}

export const CURRENTLY_LEARNING: LearningItem[] = [
  { name: "ClickHouse OLAP", icon: "🔴", desc: "Columnar DB untuk analitik real-time skala besar" },
  { name: "Apache Flink", icon: "⚡", desc: "Stream processing stateful untuk event-driven pipeline" },
  { name: "dbt + Snowflake", icon: "❄️", desc: "Advanced data modeling dan data contract patterns" },
  { name: "Kubernetes + Helm", icon: "☸️", desc: "Orkestrasi Spark jobs dan Airflow di k8s cluster" },
  { name: "Rust (pra-eksplorasi)", icon: "🦀", desc: "Untuk sistem data-intensive berkecepatan tinggi" },
  { name: "LLM Data Pipelines", icon: "🤖", desc: "RAG pipeline dan vector database integration" },
];

export interface MilestoneItem {
  year: string;
  role: string;
  company: string;
  location: string;
  desc: string;
  highlights: string[];
  tags: string[];
}

export const MILESTONES: MilestoneItem[] = [
  {
    year: "2024 — Sekarang",
    role: "Data Engineer / Analytics Engineer",
    company: "Freelance & Konsultan Data",
    location: "Remote / Jakarta",
    desc: "Merancang dan membangun data pipelines end-to-end: dari ingestion raw data, transformasi dengan dbt, hingga dashboard analytics untuk klien startup dan perusahaan mid-size.",
    highlights: [
      "Membangun 3 pipeline ETL dengan Apache Airflow + BigQuery",
      "Memotong waktu query dashboard 60% dengan materialized views",
      "Implementasi data quality testing dengan dbt + Great Expectations",
    ],
    tags: ["dbt", "BigQuery", "Airflow", "Python", "Metabase"],
  },
  {
    year: "2022 — 2024",
    role: "Data Analyst → Junior Data Engineer",
    company: "Platform Enterprise Cloud",
    location: "Jakarta, ID",
    desc: "Transisi dari peran analyst ke engineering: membangun pipeline otomatisasi laporan, data mart untuk tim bisnis, dan memelihara data warehouse berbasis BigQuery.",
    highlights: [
      "Mengotomatisasi 25+ laporan Excel manual menjadi pipeline Airflow",
      "Mendesain skema data warehouse dimensional untuk modul keuangan",
      "Mengurangi biaya query BigQuery 40% via partitioning dan clustering",
    ],
    tags: ["BigQuery", "Looker Studio", "Python", "SQL", "dbt"],
  },
  {
    year: "2020 — 2022",
    role: "Business Intelligence Analyst",
    company: "Startup E-Commerce",
    location: "Bandung, ID",
    desc: "Menganalisis data transaksi jutaan baris, membuat dashboard eksekutif, dan menjalankan model prediksi churn pelanggan dengan Scikit-learn.",
    highlights: [
      "Membuat model prediksi churn dengan akurasi 82%",
      "Dashboard retention & funnel di Metabase untuk tim product",
    ],
    tags: ["Python", "SQL", "Metabase", "Scikit-learn", "Pandas"],
  },
  {
    year: "2018 — 2020",
    role: "Sarjana Informatika / Sistem Informasi",
    company: "Universitas Teknologi Yogyakarta",
    location: "Yogyakarta, ID",
    desc: "Skripsi: Analisis sentimen ulasan produk marketplace menggunakan Naïve Bayes + TF-IDF. Aktif di komunitas open-source data science kampus.",
    highlights: [
      "Akurasi klasifikasi sentimen 78% pada dataset 50K ulasan",
      "Juara 2 Kompetisi Data Mining Regional 2019",
    ],
    tags: ["Python", "NLP", "Machine Learning", "Research"],
  },
];

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}

export const STATS: StatItem[] = [
  { value: "50M+", label: "Baris Data Diproses", sub: "Setiap bulan via pipeline produksi" },
  { value: "25+", label: "Pipeline ETL Dibangun", sub: "Airflow, Spark, dbt, & custom scripts" },
  { value: "60%", label: "Percepatan Query", sub: "Partitioning + materialized views" },
  { value: "82%", label: "Model Churn Accuracy", sub: "Scikit-learn + feature engineering" },
];

export interface PrincipleItem {
  num: string;
  title: string;
  desc: string;
  tag: string;
}

export const PRINCIPLES: PrincipleItem[] = [
  {
    num: "01",
    title: "Data sebagai Produk, Bukan Artefak",
    desc: "Setiap pipeline, tabel, dan dashboard harus memiliki 'owner', dokumentasi, dan kontrak kualitas yang jelas — layaknya sebuah produk yang melayani pengguna internal.",
    tag: "Data Ownership",
  },
  {
    num: "02",
    title: "Observabilitas Lebih Penting dari Kode",
    desc: "Pipeline yang tidak dapat dimonitor, tidak dapat dipercaya. Setiap langkah harus memiliki logging, alerting, dan data quality checks yang ketat.",
    tag: "Data Quality",
  },
  {
    num: "03",
    title: "Transformasi Deklaratif, Bukan Prosedural",
    desc: "dbt mengajarkan saya bahwa transformasi data terbaik adalah yang mudah dibaca, diuji, dan diaudit — bukan sekedar script Python yang bekerja sekali.",
    tag: "Engineering Craft",
  },
  {
    num: "04",
    title: "Desain Visual Memperkuat Data",
    desc: "Latar belakang desain saya menjadi senjata di bidang data: dashboard yang dirancang dengan prinsip UX yang baik akan dibaca dan dipercaya oleh decision maker.",
    tag: "Data Storytelling",
  },
];
