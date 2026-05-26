# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Code Formatting with Prettier

This project uses [Prettier](https://prettier.io/) to enforce consistent code formatting standards across all frontend files.

### Installation

Prettier and required plugins are already installed as dev dependencies:

```json
"devDependencies": {
  "prettier": "^3.8.3",
  "prettier-plugin-tailwindcss": "^0.8.0",
  "prettier-plugin-organize-imports": "^4.3.0"
}
```

### Configuration

The Prettier configuration is defined in `.prettierrc` with the following rules:

- **Semicolons**: Required (`true`)
- **Trailing Commas**: ES5 style
- **Single Quotes**: Use single quotes instead of double quotes
- **Print Width**: 100 characters per line
- **Tab Width**: 2 spaces
- **Tabs**: Use spaces, not tabs
- **Bracket Spacing**: Include spaces (`true`)
- **Arrow Function Parentheses**: Always include (`"always"`)
- **End of Line**: LF (Unix style)

### Ignored Files

Files and directories excluded from formatting are listed in `.prettierignore`:

- Build outputs (`dist`, `build`)
- Dependencies (`node_modules`)
- Generated files (`*.min.js`, `*.min.css`)
- Environment variables (`.env*`)
- IDE/editor files (`.vscode`, `.idea`)
- OS generated files (`.DS_Store`, `Thumbs.db`)

### Available Scripts

The following formatting scripts are already configured in `package.json`:

```json
"scripts": {
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

#### Usage

1. **Format all files** (apply Prettier formatting):

   ```bash
   npm run format
   ```

2. **Check formatting compliance** (for CI/CD pipelines):
   ```bash
   npm run format:check
   ```

### Editor Integration

#### VS Code

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Add to your VS Code settings (`settings.json`):
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true,
     "prettier.requireConfig": true
   }
   ```

#### Other Editors

- **WebStorm/IntelliJ**: Enable Prettier in Settings → Languages & Frameworks → JavaScript → Prettier
- **Sublime Text**: Install [JsPrettier](https://packagecontrol.io/packages/JsPrettier) package
- **Vim/Neovim**: Use [prettier.nvim](https://github.com/MunifTanjim/prettier.nvim) or [coc-prettier](https://github.com/neoclide/coc-prettier)

### Supported File Types

Prettier formats the following file types:

- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- CSS (`.css`, `.scss`)
- HTML (`.html`)
- JSON (`.json`)
- Markdown (`.md`)

### Plugins

1. **prettier-plugin-tailwindcss**: Automatically sorts Tailwind CSS classes for consistency
2. **prettier-plugin-organize-imports**: Organizes and removes unused imports

### CI/CD Integration

Add the formatting check to your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Check code formatting
  run: npm run format:check
```

### Troubleshooting

1. **Prettier not formatting on save**:
   - Ensure Prettier extension is installed and enabled
   - Check that `editor.formatOnSave` is `true` in VS Code settings
   - Verify `.prettierrc` file exists in project root

2. **Conflicts with ESLint**:
   - Install `eslint-config-prettier` to disable ESLint rules that conflict with Prettier
   - Add `"prettier"` to the `extends` array in your ESLint config

3. **Plugin not working**:
   - Ensure plugins are installed as dev dependencies
   - Check that plugins are listed in `.prettierrc` configuration

### Best Practices

1. **Run before commits**: Use `npm run format` before committing code
2. **CI enforcement**: Add `npm run format:check` to your CI pipeline to reject unformatted code
3. **Editor setup**: Configure your editor to format on save for consistent formatting
4. **Team alignment**: Ensure all team members have Prettier configured in their editors

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
