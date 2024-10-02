my-app/
│
├── public/                                 # Pliki publiczne (favicon, index.html, etc.)
│
├── src/
│   ├── assets/                             # Statyczne pliki (obrazki, ikony, etc.)
│   ├── components/                         # Komponenty wielokrotnego użytku
│   │   ├── SearchForm/
│   │   │   ├── SearchFormContainer.tsx
│   │   │   └── SearchForm.tsx
│   │   ├── UserCard/
│   │   │   ├── UserCardContainer.tsx
│   │   │   └── UserCard.tsx
│   │   └── __tests__/                      # Testy komponentów
│   │       ├── SearchForm.test.tsx
│   │       ├── UserCard.test.tsx
│   │
│   ├── hooks/
│   │   └── useGitHubSearch.ts              # Hook do zapytań do GitHub API
│   │   └── useDebounce.ts                  # Hook do debounce
│   │   └── __tests__/                      # Testy hooków
│   │       └── useGitHubSearch.test.ts
│   │
│   ├── pages/
│   │   └── HomePage.tsx                    # Strona główna
│   │   └── __tests__/                      # Testy stron
│   │       └── HomePage.test.tsx
│   │
│   ├── services/
│   │   └── api.ts                          # Obsługa zapytań do API GitHub
│   │   └── __tests__/                      # Testy serwisów/API
│   │       └── api.test.ts
│   │
│   ├── styles/
│   │   └── theme.ts                        # Konfiguracja MUI Theme
│   │
│   ├── App.tsx                             # Główny komponent aplikacji
│   ├── main.tsx                            # Punkt wejściowy aplikacji
│   └── index.css                           # Globalne style
│
└── README.md                               # Dokumentacja projektu