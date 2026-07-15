# CUBE27 Website: Architectural & Maintenance Guide

This document provides a comparative analysis of the maintenance profiles, workflows, and operational requirements for the two core architectural paths for the CUBE27 marketing website:
1. **Option 1: Standalone Astro Website (Current Setup)**
2. **Option 2: Astro with Headless WordPress CMS**

---

## Option 1: Standalone Astro Website *(Current Setup)*

In this option, all content, copy, metadata, and pages are stored directly in your codebase as static files (JSON, Markdown, or React code). 

### 🛠️ How to Maintain It
1. **Content Updates**: To edit page copy, testimonials, or services, a developer modifies configuration files (e.g., `src/site-config.ts`) or page files (e.g., `src/components/pages/about/page.tsx`).
2. **Publishing**: You commit the change and push to your GitHub repo. 
3. **Infrastructure Maintenance**: **Virtually Zero.** The site compiles into pure static HTML/CSS/JS and is deployed on **Cloudflare Pages**. There are no databases to optimize, no servers to configure, and no operating systems to patch.

### 📈 Pros & Cons
*   **Pros**: 
    *   **Zero Server Maintenance**: No databases or virtual machines to manage.
    *   **Perfect Security**: Since there is no database or server-side execution, the site is **completely unhackable** (no SQL injections, zero login brute-forcing).
    *   **Zero Infrastructure Costs**: Cloudflare Pages hosts static sites entirely for free.
    *   **Max Performance**: Page loads are near-instantaneous worldwide (perfect 100 Lighthouse scores).
*   **Cons**:
    *   **Developer Dependency**: Non-technical editors cannot log in to a visual dashboard (like `/wp-admin`) to write blogs or edit copy directly.

---

## Option 2: Astro with Headless WordPress CMS

In this option, WordPress is hosted on a separate server (e.g., `cms.cube27.com`) solely to serve as a content database. Astro fetches the copy and articles from the WordPress API (using GraphQL or REST) during the build process.

### 🛠️ How to Maintain It
Maintaining this architecture requires managing **two separate systems**:

1.  **The Frontend (Astro)**: Maintained just like Option A via GitHub and Cloudflare Pages.
2.  **The Backend (WordPress)**: 
    *   **Content Updates**: Marketing and content teams log into `https://cms.cube27.com/wp-admin` to write, edit, and upload media.
    *   **Server Maintenance**: You must pay for and configure a server (e.g., WP Engine, Kinsta, or AWS) to host the WordPress PHP/MySQL stack.
    *   **Security & Plugin Patching**: You must regularly log in to update WordPress core, themes, and plugins (e.g., WPGraphQL, ACF) to prevent security vulnerabilities.
    *   **Automated Webhooks**: You must maintain a webhook plugin in WordPress so that when an editor clicks "Publish", it sends a ping to Cloudflare Pages to rebuild the Astro site with the new content.

---

## 📊 Side-by-Side Maintenance Comparison

| Feature / Task | Standalone Astro (Option 1) | Headless WordPress + Astro (Option 2) |
| :--- | :--- | :--- |
| **Server Administration** | None | Must manage WP Server, Database, PHP, and SSL |
| **Security Patches** | None | Regular WordPress & Plugin security updates |
| **Content Editing** | Modifying JSON/React config files | Logging into `/wp-admin` visual dashboard |
| **Publishing Speed** | ~1 minute (via Git Push) | ~2 minutes (via WP publish trigger webhooks) |
| **Cost** | $0/month (Free Cloudflare Pages) | Server costs ($15 - $50/month for WP hosting) |
| **Architecture Complexity**| Low (1 codebase) | High (Separate React/Astro code + PHP CMS API) |

---

## 💡 Recommendation

*   **Choose Standalone Astro (Option 1)** if your marketing website changes infrequently (e.g., updating a case study, a solution, or contact info once a month) and you have a developer on hand. It keeps your overhead, costs, and security risks at **zero**.
*   **Choose Headless WordPress (Option 2)** only if you plan to publish blog posts, whitepapers, or landing pages multiple times a week, and your marketing team needs full autonomy to publish content without developer assistance.
