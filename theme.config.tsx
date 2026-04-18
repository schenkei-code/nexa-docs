import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nexaLogoG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#nexaLogoG)" />
        <path
          d="M6 18V6h2.4l7.2 8.4V6H18v12h-2.4L8.4 9.6V18H6Z"
          fill="#ffffff"
        />
      </svg>
      <strong style={{ letterSpacing: "-0.01em", fontFamily: "Outfit, Inter, sans-serif", fontWeight: 700 }}>
        Nexa Docs
      </strong>
      <span
        style={{
          fontSize: "10px",
          opacity: 0.7,
          padding: "2px 7px",
          border: "1px solid currentColor",
          borderRadius: "999px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Beta
      </span>
    </span>
  ),
  project: {
    link: "https://github.com/schenkei-code/nexa-docs",
  },
  chat: {
    link: "https://nexa.one",
    icon: (
      <span style={{ fontFamily: "Outfit, Inter, sans-serif", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.9 }}>
        nexa.one
      </span>
    ),
  },
  docsRepositoryBase: "https://github.com/schenkei-code/nexa-docs/tree/main",
  footer: {
    content: (
      <span style={{ fontFamily: "Outfit, Inter, sans-serif" }}>
        Nexa Family — built by{" "}
        <a href="https://nexa.one" target="_blank" rel="noreferrer" style={{ color: "#22d3ee" }}>
          Dominik Schenkel
        </a>
        . MIT Licensed · <a href="/llms.txt" style={{ color: "#22d3ee" }}>llms.txt</a>
      </span>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    content: "Edit this page on GitHub",
  },
  feedback: {
    content: "Question? Give us feedback",
    labels: "feedback",
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "dark",
    forcedTheme: "dark",
  },
  head: (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="The Nexa API — one account, all products. Developer docs for NexaAds, NexaCreate, NexaLytics, and NexaVoize."
      />
      <meta property="og:title" content="Nexa Docs" />
      <meta
        property="og:description"
        content="One account, all products. REST, MCP, and typed SDKs for the Nexa API family."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://docs.nexa.one" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#0a0a0f" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <title>Nexa Docs</title>
    </>
  ),
  color: {
    hue: { dark: 265, light: 265 },
    saturation: { dark: 85, light: 80 },
  },
};

export default config;
