import { test, expect } from "@playwright/test";

test.describe("Tests E2E", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByRole("button", { name: "¿No tienes cuenta? Regístrate" }).click();

    await page.getByPlaceholder("Usuario").fill("Chronicle");
    await page.getByPlaceholder("Nombre completo").fill("Emanuel Saavedra");
    await page.getByPlaceholder("Email").fill("chronicle@gmail.com");
    await page.getByPlaceholder("Contraseña").fill("letswinbro");

    await page.getByRole("button", { name: "Registrarse" }).click();
  });

  test.describe("Flujo de Inicio de Sesión", () => {
    test("login y ver usuario", async ({ page }) => {

      await page.goto("http://localhost:5173/login");

      await page.getByPlaceholder("Usuario").fill("Chronicle");
      await page.getByPlaceholder("Contraseña").fill("letswinbro");
      await page.getByRole("button", { name: "Iniciar Sesión" }).click();

      await expect(page.getByText("Chronicle")).toBeVisible();
    });
  });

  test.describe("Abrir packs", () => {
    test("Abrir un pack", async ({page}) => {
        await page.goto("http://localhost:5173/login");

        await page.getByPlaceholder("Usuario").fill("Chronicle");
        await page.getByPlaceholder("Contraseña").fill("letswinbro");
        await page.getByRole("button", { name: "Iniciar Sesión" }).click();

        await page.goto("http://localhost:5173/packs");

        await page.getByRole("button", {name: "Abrir Pack"}).click();

        await page.waitForSelector('.player-card');
        await expect(page.locator('.player-card')).toHaveCount(4);  
    })

    test("revisar que estén en el inventario", async ({ page }) => {

        await page.goto("http://localhost:5173/login");

        await page.getByPlaceholder("Usuario").fill("Chronicle");
        await page.getByPlaceholder("Contraseña").fill("letswinbro");
        await page.getByRole("button", { name: "Iniciar Sesión" }).click();

        await page.goto("http://localhost:5173/packs");
        await page.getByRole("button", { name: "Abrir Pack" }).click();

        await page.goto("http://localhost:5173/team");

        const inventoryCards = page.locator('img[alt="Player"]');
        
        await expect(page.getByText("ACS")).toBeVisible();
    });

  })
});
