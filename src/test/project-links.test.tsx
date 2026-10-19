import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { site } from "@/data/portfolio";
import { Index } from "@/routes/index";

const PROFILE = "https://github.com/Amulpappu";

const hrefsIn = (selector: string) =>
  Array.from(document.querySelectorAll(`${selector} a`)).map((a) => a.getAttribute("href"));

describe("Project links", () => {
  it("shows exactly the projects in the data file, in order", () => {
    render(<Index />);

    const titles = Array.from(document.querySelectorAll("#projects h3")).map((h) =>
      h.textContent?.trim(),
    );
    expect(titles).toEqual(site.projects.map((p) => p.title));
    expect(titles[0]).toBe("Jiraiya Bot Monitor");
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

    // Every repo link must point at one specific repo on this account, never the profile.
    for (const p of site.projects) {
      const urls = [p.repoUrl, ...(p.links ?? []).map((l) => l.url)].filter(
        (u): u is string => !!u && u.startsWith("https://github.com/"),
      );
      for (const u of urls) expect(u).toMatch(/^https:\/\/github\.com\/Amulpappu\/[^/]+$/);
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
  it("links the real résumé PDF and email", () => {
    render(<Index />);
    expect(site.resumeUrl).toBe("/Lohith_K_Resume.pdf");
    const resume = Array.from(document.querySelectorAll(`a[href="${site.resumeUrl}"]`));
    expect(resume.length).toBe(2); // hero button + contact link
    for (const a of resume) expect(a.getAttribute("target")).toBe("_blank");
    expect(document.querySelector('a[href="mailto:lohithgamer12@gmail.com"]')).not.toBeNull();
  });
  it("lists Excel and spreadsheets as skills", () => {
    render(<Index />);
    expect(document.querySelector("#skills")).toHaveTextContent("Microsoft Excel");
    expect(document.querySelector("#skills")).toHaveTextContent("Spreadsheets");
  });
  it("shows the exact status labels and never claims a win", () => {
    render(<Index />);
    for (const s of ["Deployed (Render)", "Working bot", "Prototype · in development", "Android app (APK)", "Workshop projects", "Live on Vercel", "Submitted (2026)", "Stage 2 (Design Development)", "Registered"]) {
      expect(document.body).toHaveTextContent(s);
    }
    expect(document.querySelector("#achievements")).not.toHaveTextContent(/won|winner/i);
  });
});
