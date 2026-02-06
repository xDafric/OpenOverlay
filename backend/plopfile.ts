export default function (plop: any) {
  plop.setGenerator("Model", {
    description:
      "Generate a new Model (schema, dto, repository, service, controller, routes)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Model name in camelCase:",
      },
      {
        type: "input",
        name: "path",
        massage: "path of module (default src/modules):",
      },
    ],
    actions: function () {
      return [
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.schema.ts`,
          templateFile: "plop-templates/schema.ts.hbs",
        },
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.dto.ts`,
          templateFile: "plop-templates/dto.ts.hbs",
        },
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.repository.ts`,
          templateFile: "plop-templates/repository.ts.hbs",
        },
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.service.ts`,
          templateFile: "plop-templates/service.ts.hbs",
        },
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.controller.ts`,
          templateFile: "plop-templates/controller.ts.hbs",
        },
        {
          type: "add",
          path: `src/modules/{{path}}{{name}}/{{name}}.routes.ts`,
          templateFile: "plop-templates/routes.ts.hbs",
        },
      ];
    },
  });
}
