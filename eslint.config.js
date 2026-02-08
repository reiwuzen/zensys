import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // 1️⃣ Base JS rules
  js.configs.recommended,

  // 2️⃣ TypeScript rules
  ...tseslint.configs.recommended,

  // 3️⃣ React rules (WITHOUT legacy JSX scope)
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // 4️⃣ UI architectural boundaries
  {
    files: ["src/workspace/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["src/service/**", "@/service/**", "@/__service/**"],
              message:
                "UI layer must not import from src/service. Use a controller or adapter layer.",
            },
            {
              group: ["src/store/**", "@/store/**", "@/__store/**"],
              message:
                "UI layer must not import from src/store. State must be injected, not pulled.",
            },
          ],
        },
      ],
    },
  },

  // 5️⃣ Global language options & ignores
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    ignores: ["src-tauri/**", "dist/**", "node_modules/**"],
  },
];
