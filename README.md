#🛠️ AzleHub

AzleHub is a centralized suite of essential developer tools, built with a focus on clean architecture, performance, and user experience.

##📖 About the Project

AzleHub was born from the need to have a single, reliable location for daily development utilities (such as UUID generators, formatters, converters). More than just a set of tools, this project serves as a software engineering laboratory, rigorously applying SOLID principles, Clean Architecture, and modern Design Patterns within the React/Next.js ecosystem.

##✨ Current Features

UUID Generator v4: Instant generation, validation, and local history of generated IDs.

Text Analyzer: Character, word, and line counts, plus an automatic "Slug" converter (URL Friendly).

Theme System: Full support for Dark/Light modes.

Responsive Design: Adaptive interface for both Mobile and Desktop.

##🚀 Tech Stack

The project utilizes the most modern technologies in the web ecosystem:

Core: Next.js 14 (App Router) & React

Language: TypeScript (Strict typing)

Styling: Tailwind CSS

Icons: Lucide React

Code Quality: ESLint & Prettier

##🏗️ Architecture & Engineering

AzleHub's key differentiator is its modular structure. The project moves away from the common "everything in a component" pattern and follows a scalable architecture:

Applied Principles

S.O.L.I.D:

SRP (Single Responsibility Principle): Business logic (e.g., generating a UUID) is completely separated from the UI (Components) and State (Hooks).

DIP (Dependency Inversion Principle): Components depend on abstractions (Hooks/Interfaces) rather than concrete service implementations.

Modularization: Each tool is an isolated "module" (src/modules/), containing its own components, hooks, and services. This allows adding new tools without the risk of breaking existing ones.

Folder Structure

src/
├── app/                  # Next.js App Router (Pages)
├── core/                 # The application "Kernel"
│   ├── services/         # Pure Logic (Business Logic) - Zero React dependency
│   └── ...
├── components/           # Shared UI Kit (Button, Card, Inputs)
├── config/               # Global configurations (e.g., Tool Registry)
├── lib/                  # Helper utilities
├── layouts/              # Layout structures (Sidebar, Header)
└── modules/              # Feature Modules
    ├── uuid/             # Example: UUID Module
    │   ├── components/   # Feature-specific UI
    │   └── hooks/        # State Management (ViewModel)
    └── text/             # Other modules...


##⚡ How to Run Locally

Follow the steps below to clone and run the application in your environment:

Prerequisites

Node.js 18+

npm or yarn

Installation

Clone the repository

git clone [https://github.com/your-username/azlehub.git](https://github.com/your-username/azlehub.git)
cd azlehub


Install dependencies

npm install


Run the development server

npm run dev


Access in browser
Open http://localhost:3000 to see the result.

##🛣️ Roadmap

AzleHub is constantly evolving. Upcoming tools planned:

[ ] MarkUp TO PDF text converter.

[ ] Base64 Encoder/Decoder: Fast conversion for strings and images.

[ ] Diff Checker: Side-by-side text comparison.

##🤝 How to Contribute

Contributions are very welcome! If you have an idea for a tool or an improvement:

Fork the project.

Create a Branch for your Feature (git checkout -b feature/NewTool).

Commit your changes (git commit -m 'Add: New JSON tool').

Push to the Branch (git push origin feature/NewTool).

Open a Pull Request.

##📝 License

This project is under the MIT license. See the LICENSE file for more details.

<div align="center">
<sub>Developed by <a href="https://www.google.com/search?q=https://github.com/AzarioCossa">Azle</a></sub>
</div>