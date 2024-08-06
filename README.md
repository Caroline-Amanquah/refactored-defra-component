# Refactored Codebase

The restructured codebase provides several benefits over the original codebase:

## Original Codebase

The original codebase (https://github.com/Caroline-Amanquah/nunjucks-defra-components) has a straightforward setup but lacks modularisation and separation of concerns. Here’s a breakdown of the key components and their limitations:

### Single File for Configuration and Routes:

- All the server setup, route definitions, and view configurations are in one file (`server.js`).
- This makes the file large and harder to maintain as the application grows.

### Direct Use of Nunjucks and Vision:

- Nunjucks and Vision are configured directly within the server setup, leading to less flexibility.
- Any changes to the view configuration require changes directly in the `server.js` file.

### Context and Configuration:

- The context for the views is hardcoded within the `server.js` file.
- There's no clear separation between configuration and application logic.

## Restructured Codebase

The restructured codebase, as shown in your provided files and screenshots, offers several advantages through modularisation and separation of concerns. The structure was designed to be similar to the [DEFRA/ncea-frontend](https://github.com/DEFRA/ncea-frontend) project.

### Separation of Configuration and Application Logic:

#### Environment Configuration (`environmentConfig.js`):

- Validates and manages environment variables separately.
- This allows for easier management and changes to environment-specific settings.

#### Constants (`constants.js`):

- Centralised place for defining route paths and other constants.
- Makes it easy to update paths and constants without touching the core application logic.

### Modular View Configuration (`views.js`):

- Encapsulates the view configuration logic.
- Custom filters and context are defined in a dedicated module, making it reusable and easier to manage.

### Structured Directory Layout:

#### Public Assets:

- Clear organisation of public assets (`/public/assets`).
- Easier to manage and locate static files such as fonts and images.

#### Views:

- Templates and partials are organised under `/views`.
- Encourages reusability and better organisation of templates.

### Scalability and Maintainability:

- The modular approach ensures that as the application grows, new features can be added with minimal changes to the existing structure.
- Easier to onboard new developers as the structure is clear and logical.

## Side-by-Side Comparison

| Aspect                    | Original Codebase                     | Restructured Codebase                              |
|---------------------------|----------------------------------------|----------------------------------------------------|
| Configuration             | Mixed with application logic in `server.js` | Separate `environmentConfig.js`, `constants.js` |
| View Configuration        | Directly in `server.js`                | Encapsulated in `views.js`                         |
| Template Management       | All templates in `views`               | Organised under `views/layout`, `views/partials`   |
| Static Assets             | Managed in `public/assets`             | Same structure, clear organisation                 |
| Modularity                | Low                                    | High (clear separation of concerns)                |
| Scalability               | Harder to scale                        | Easier to scale and maintain                       |

## Conclusion

The restructured codebase offers a more maintainable, scalable, and modular architecture. It adheres to the best practices of separating configuration, constants, and application logic, making it easier to manage and extend in the long term. This structure is particularly beneficial for larger projects or projects expected to grow over time.
