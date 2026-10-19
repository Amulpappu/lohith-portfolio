import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { site } from "@/data/portfolio";
import { Index } from "@/routes/index";

const PROFILE = "https://github.com/Amulpappu";

const hrefsIn = (selector: string) =>
  Array.from(document.querySelectorAll(`${selector} a`)).map((a) => a.getAttribute("href"));

describe("Project links", () => {
  it("shows only the six real GitHub projects, in order", () => {
    render(<Index />);

    const titles = Array.from(document.querySelectorAll("#projects h3")).map((h) =>
      h.textContent?.trim(),
    );
    expect(titles).toEqual([
      "Jiraiya Bot Monitor",
      "Manjummel",
      "AgriGuard",
      "SpendWise",
      "Moonlight ML Workshop",
      "Gamer Portfolio",
    ]);
    for (const gone of ["CurrentGuard AI", "Smart Solar Parking Roof", "IndiaSkills 2026–27", "AGRIGUARD", "SaaS Platform"]) {
      expect(document.querySelector("#projects")).not.toHaveTextContent(gone);
    }
  });

  it("links every project card to its own exact repo, in a new tab", () => {
    render(<Index />);

    const projectHrefs = hrefsIn("#projects");
    for (const p of site.projects) {
      if (!p.repoUrl) continue;
      expect(projectHrefs).toContain(p.repoUrl);
      const card = screen.getByRole("link", { name: new RegExp(`view code for ${p.title}`, "i") });
      expect(card.getAttribute("href")).toBe(p.repoUrl);
      expect(card.getAttribute("target")).toBe("_blank");
      expect(card.getAttribute("rel")).toBe("noopener noreferrer");
    }

    expect(projectHrefs).not.toContain(PROFILE);
    expect(screen.getAllByText(/View code/).length).toBe(
      site.projects.filter((p) => p.repoUrl).length,
    );
  });

  it("shows Moonlight's three repo links and Gamer Portfolio's live link", () => {
    render(<Index />);

    const moonlight = screen
      .getByRole("heading", { name: "Moonlight ML Workshop" })
      .closest("article") as Element;
    expect(hrefsIn("#projects")).toEqual(
      expect.arrayContaining([
        "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop",
        "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop-Audio-",
        "https://github.com/Amulpappu/MoonLight-Machine-Learning-Workshop-Pose-",
      ]),
    );
    expect(moonlight.querySelectorAll("a").length).toBe(3);
    expect(moonlight).not.toHaveTextContent("View code");

    const gamer = screen
      .getByRole("heading", { name: "Gamer Portfolio" })
      .closest("article") as Element;
    expect(gamer).toHaveTextContent("Live");
    expect(gamer.querySelector('a[href="https://designer-coral.vercel.app"]')).not.toBeNull();
    expect(gamer.querySelector('a[href="https://github.com/Amulpappu/Designer"]')).not.toBeNull();
  });

  it("keeps the GitHub profile link out of project cards", () => {
    render(<Index />);

    const profileLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(`a[href="${PROFILE}"]`),
    );
    expect(profileLinks.length).toBe(3);
    expect(profileLinks.some((a) => a.closest("#top"))).toBe(true);
    expect(profileLinks.some((a) => a.closest("#contact"))).toBe(true);
    expect(profileLinks.some((a) => a.closest("footer"))).toBe(true);
    expect(document.querySelector(`#projects a[href="${PROFILE}"]`)).toBeNull();
  });
});

describe("Honest content", () => {
  it("hides résumé and email links while their fields are empty", () => {
    render(<Index />);
    expect(site.resumeUrl).toBe("");
    expect(document.body).not.toHaveTextContent("Résumé");
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull();
  });
  it("shows the exact status labels and never claims a win", () => {
    render(<Index />);
    for (const s of ["Deployed (Render)", "Working bot", "Prototype · in development", "Android app (APK)", "Workshop projects", "Live on Vercel", "Submitted (2026)", "Stage 2 (Design Development)", "Registered"]) {
      expect(document.body).toHaveTextContent(s);
    }
    expect(document.querySelector("#achievements")).not.toHaveTextContent(/won|winner/i);
  });
});
