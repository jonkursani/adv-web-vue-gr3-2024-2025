# Creating a New Vue Project

## Prerequisites

1. **Node.js**:
    - If you don't have Node.js installed, you can download it from the official website.
    - Download and install the latest LTS version from [Node.js official website](https://nodejs.org/en/download).
    - Verify installation by running:
      ```bash
      node -v
      ```
      This should display your installed Node.js version.

2. **NPM**:
    - Comes bundled with Node.js. To check your version, run:
      ```bash
      npm -v
      ```

## Steps to Create a New Vue Project

1. **Create the Project:**
   ```bash
   npm create vue@latest
   ```
   - If the vite command is not recognized, you can install Vite manually:
     ```bash
     npm install vite
     ```

2. **Respond to Creation Prompts:**
   - You will be asked several questions about your project setup (project name, framework, variant, etc.).
   - Choose the desired options (e.g., Vue 3, TypeScript or JavaScript, etc.).

3. **Navigate Into Your New Project:**
   ```bash
   cd your-project-name
   ```
4. **Install Dependencies:**
   ```bash
   npm install
   ```
5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
    - Open your browser and navigate to http://localhost:5173 (or the port specified in the terminal) to see your new Vue app in action.

## Project Structure

After setup, your project may have a structure like the following:
   ```text
   your-project-name
   ├─ public
   ├─ src
   │  ├─ assets
   │  ├─ components
   │  ├─ App.vue
   │  └─ main.js (or main.ts if using TypeScript)
   ├─ .gitignore
   ├─ package.json
   ├─ vite.config.js
   └─ README.md
   ```
   - public: Static assets that are directly served.
   - src: Main directory where your Vue application code lives.
   - assets: Images, styles, etc.
   - components: Vue components used throughout the app.
   - App.vue: Root Vue component.
   - main.js: Entry point that boots your Vue application.
   - .gitignore: Files to be ignored by git.
   - package.json: Lists project dependencies, scripts, and other metadata.
   - vite.config.js: Vite configuration file.

## Scripts Overview
   - npm run dev: Starts the development server.
   - npm run build: Builds your project for production.
   - npm run preview: Previews the built project locally.

## Helpful Tips
   - Use npm install <package-name> or npm install -D <package-name> to add dependencies or devDependencies.
   - For production, always build and then preview to ensure everything works correctly in a production-like environment.
   - Refer to [Vue.js documentation](https://vuejs.org/) for more detailed information on Vue.

That’s it! You now have a fully functioning Vue project set up with Vite. Happy coding!