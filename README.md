# Paceline — Running & Footwear Storefront

Paceline is a responsive, static storefront concept for an independent running shop. It pairs editorial running photography with a curated footwear and apparel experience, plus a separate story page about the shop and its community.

## Preview

![Paceline storefront hero: “Chase Every Second”](src/Home/hero_section/image1.png)

*Hero artwork used on the home page.*

### Shop by discipline

![Road running collection](src/Home/category_section/image1.png)
![Trail running collection](src/Home/category_section/image2.png)
![Running apparel collection](src/Home/category_section/image3.png)
![Running accessories collection](src/Home/category_section/image4.png)

### The Paceline story

![Runners on a trail above the clouds](src/Home/story_section/image.png)

## Pages

- **Home (`index.html`)** — campaign hero, shop-by-category cards, filterable new-arrival cards, brand story, men’s and women’s collections, and newsletter sign-up section.
- **Our Story (`about.html`)** — shop mission and values, history timeline, Glasgow store information, and founder profiles.

## Features

- Responsive navigation with an accessible mobile menu.
- New-arrival filters for **New In**, **Best Sellers**, **Race Day**, and **Trail**.
- Scroll-triggered statistic and timeline animations, with reduced-motion preference support.
- Responsive layouts, hover treatments, and locally bundled running imagery.
- Semantic page structure, descriptive image alt text, and visible keyboard-focus styles.

## Run locally

This is a plain HTML, CSS, and JavaScript project; there is no package installation or build step.

1. Clone or download the project.
2. From the project root, start a local web server:

   ```bash
   python3 -m http.server 8000
   ```

3. Visit [http://localhost:8000](http://localhost:8000) in a browser.

You can also open `index.html` directly, but a local server is recommended for a consistent preview. The site loads the Archivo font from Google Fonts when an internet connection is available.

## Project structure

```text
.
├── index.html
├── about.html
├── style.css
├── script.js
└── src/
    ├── Home/
    │   ├── hero_section/
    │   ├── category_section/
    │   ├── arrivals_section/
    │   ├── story_section/
    │   └── explore_section/
    └── About/
        ├── main_story_section/
        ├── founders_section/
        └── visit_us_section/
```

## Demo notes

This repository is a front-end storefront concept, not a connected commerce system. Product imagery and category filters are illustrative; there is no inventory, checkout, account, search, or newsletter backend wired up. Some navigation and footer links are placeholders.
