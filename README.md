# Duvan Mendoza Ortega Portfolio

Personal portfolio for Machine Learning Engineer, NLP, LLM Systems, and Backend AI roles.

The main landing page is static HTML/CSS/JavaScript and can be opened directly from `index.html` or served by GitHub Pages.

## Local development

This repository targets Ruby `3.3.0`, as defined in `.ruby-version`.

```sh
gem install bundler:2.5.23
bundle install
bundle exec jekyll serve
```

For a quick static preview of the landing page only:

```sh
python3 -m http.server 8000
```

## Files

- `index.html` - main portfolio landing page
- `style.css` - visual design and responsive layout
- `script.js` - mobile navigation, active anchors, and reveal animations
- `assets/og-image.png` - social preview image

## Notes

- The landing page intentionally uses standalone `style.css` and `script.js`.
- The markdown pages use Jekyll/Minima through `assets/main.scss`.
- The CV CTA uses email until a final PDF is added to the repository.

The site is published through GitHub Pages at `https://duvi-m.github.io`.
