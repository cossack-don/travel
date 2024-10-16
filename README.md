# Travel

## Краткое руководство по проекту

### Git Flow

- 1 Заходим в ветку dev
- 2 Делаем git pull
- 3 Создаем новую ветку от dev (для backend разработчиков префикс **back-название-задачи**, для frontend
  разработчиков **front-название-задачи**)
- 4 Как задача сделана, оформляем PR/MR в dev ветку

### Стандарты Git Commits Conventional

[Docs Git Commits Conventional](https://www.conventionalcommits.org/ru/v1.0.0/)

**Пример коммита - (git commit -m "feat: number task - description commit)"**

- build - Изменения, влияющие на систему сборки или внешние зависимости (webpack, npm, gulp)
- ci - Изменения в конфигурационных файлах и сценариях CI
- docs - Меняется только документация
- feat - Новый функционал
- fix - Исправление бага
- perf - Изменение кода, повышающее производительность
- refactor - Изменение кода, которое не исправляет ошибку и не добавляет новую функцию.
- revert - Откат изменений
- style - Изменения кодстайла (табы, отступы, точки, запяты и тд.)
- test - Изменения касающиеся тестов
- chore - Все, что не подходит по типы выше

### Запуск Frontend приложения - папка client - работает на 5000 Порту

- 1 открываем терминал
- 2 переходим в папку client
- 3 устанавливаем зависимости npm i (если ранее не были установлены)
- 4 пишем в терминале команду npm run dev

### Запуск Backend приложения - api Swagger http://127.0.0.1:8000/api/docs

- 0 устанавливаем через pip менеджер зависимостей Poetry (если не установлен)
- 1 открываем терминал
- 2 переходим в папку api
- 3 устанавливаем зависимости командой poetry install (если ранее не установлены)
- 4 запускаем приложение командой make run в терминале

### Стек Frontend app

- React.js
- RTK
- Vite
- React Routing
- TS
- CSS Grid/Flex pkg - [Docs](http://flexboxgrid.com/)
- CSS modules
- Axios
- StoryBook
- commit-lint [Docs](https://commitlint.js.org/)
  + [Статья](https://dev.to/mahmudulhsn/install-husky-in-your-project-for-proper-commit-lint-with-pre-commit-hooks-25b2)
- Husky [Docs](https://typicode.github.io/husky/)

### Стек Backend app

- Fastapi
- SQLite
- SQLAlchemy
- Alembic
- Pydantic
- Pytest
- Black

### Общее

- Палитра цветов [Docs](https://palettes.shecodes.io/)
- Настройка Prettier +
  Linters [Статья - настраивал по ней](https://www.devbookmarks.com/p/vite-answer-eslint-prettier-react-integration)