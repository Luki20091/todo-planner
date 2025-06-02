# PowerShell setup script for Todo Planner
Write-Host "Installing dependencies..."
npm install

Write-Host "Installing Vite React plugin and type definitions..."
npm install --save-dev @vitejs/plugin-react
npm install --save-dev @types/react @types/react-dom

Write-Host "Starting development server..."
npm run dev
