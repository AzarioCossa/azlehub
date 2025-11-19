# 🛠️ AzleHub

AzleHub is a centralized suite of essential developer tools, built with
a focus on clean architecture, performance, and user experience.

## 📖 About the Project

AzleHub was born from the need for a single, reliable location for daily
development utilities (such as UUID generators, formatters, converters).
More than just a set of tools, this project serves as a software
engineering laboratory, rigorously applying SOLID principles, Clean
Architecture, and modern Design Patterns within the React/Next.js
ecosystem.

## ✨ Current Features

-   UUID Generator v4: Instant generation, validation, and local history
    of generated IDs.
-   Text Analyzer: Character, word, and line counts, plus an automatic
    slug converter (URL friendly).
-   Theme System: Full support for Dark/Light modes.
-   Responsive Design: Adaptive interface for both Mobile and Desktop.

## 🚀 Tech Stack

-   Core: Next.js 14 (App Router) & React
-   Language: TypeScript (Strict typing)
-   Styling: Tailwind CSS
-   Icons: Lucide React
-   Code Quality: ESLint & Prettier

## 🏗️ Architecture & Engineering

### Applied Principles

**S.O.L.I.D**

-   **SRP (Single Responsibility Principle):** Business logic is fully
    separated from UI and State.
-   **DIP (Dependency Inversion Principle):** Components depend on
    abstractions rather than concrete implementations.

### Modularization

Each tool is an isolated module inside `src/modules/`, containing its
own components, hooks, and services.

## 📁 Folder Structure

    src/
    ├── app/
    ├── core/
    │   ├── services/
    │   └── ...
    ├── components/
    ├── config/
    ├── lib/
    ├── layouts/
    └── modules/
        ├── uuid/
        │   ├── components/
        │   └── hooks/
        └── text/

## ⚡ How to Run Locally

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

``` sh
git clone https://github.com/your-username/azlehub.git
cd azlehub
npm install
npm run dev
```

Open in browser: http://localhost:3000

## 🛣️ Roadmap

-   [ ] MarkUp TO PDF text converter.
-   [ ] Base64 Encoder/Decoder.
-   [ ] Diff Checker.

## 🤝 How to Contribute

1.  Fork the project.
2.  Create a feature branch: `git checkout -b feature/NewTool`.
3.  Commit: `git commit -m 'Add: New JSON tool'`.
4.  Push: `git push origin feature/NewTool`.
5.  Open a Pull Request.

## 📝 License

MIT License.

::: {align="center"}
`<sub>`{=html}Developed by
`<a href="https://www.google.com/search?q=https://github.com/AzarioCossa">`{=html}Azle`</a>`{=html}`</sub>`{=html}
:::
