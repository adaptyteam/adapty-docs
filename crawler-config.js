new Crawler({
  appId: "IPH9RRTSQS",
  apiKey: "eeaf1af17b8ceaf32f29b1ae2b46c55e",
  maxUrls: 5000,
  indexPrefix: "",
  rateLimit: 8,
  renderJavaScript: false,
  startUrls: ["https://adapty.io/docs"],
  discoveryPatterns: ["https://adapty.io/docs/**"],
  schedule: "every 1 day at 04:01",
  maxDepth: 10,
  actions: [
    {
      indexName: "adapty",
      pathsToMatch: ["https://adapty.io/docs/**"],
      recordExtractor: ({ $, helpers }) => {
        const lvl0 =
          $(
            ".menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active",
          )
            .last()
            .text() || "Documentation";

        // Extract custom attributes from React Helmet meta tags
        const keywords = $('meta[data-rh="true"][name="keywords"]').attr(
          "content",
        );
        const description = $('meta[data-rh="true"][name="description"]').attr(
          "content",
        );
        const weight = $('meta[data-rh="true"][name="rank"]').attr("content");
        const customWeight = weight ? parseInt(weight, 10) : 50; // Default to 50 if no weight

        // Fallback to first paragraph if no description
        const fallbackDescription = description || $('.theme-doc-markdown p').first().text().trim().substring(0, 150) + '...';

        // Debug logging (remove after testing)
        console.log("Keywords found:", keywords);
        console.log("Description found:", description);
        console.log("Fallback description:", fallbackDescription);
        console.log("Weight found:", weight);
        console.log("Custom weight:", customWeight);

        const records = helpers.docsearch({
          recordProps: {
            lvl0: { selectors: "", defaultValue: lvl0 },
            lvl1: ["header h1", "article h1", ".theme-doc-markdown h1"],
            lvl2: "article h2",
            lvl3: "article h3",
            lvl4: "article h4",
            lvl5: "article h5, article td:first-child",
            lvl6: "article h6",
            // Keep content for searching but don't display it
            content: ".theme-doc-markdown p, .theme-doc-markdown li, .theme-doc-markdown td:last-child",
            // Add custom attributes
            keywords: {
              defaultValue: keywords
                ? keywords.includes(",")
                  ? keywords.split(",").map((k) => k.trim())
                  : [keywords.trim()]
                : [],
            },
            description: {
              defaultValue: fallbackDescription,
            },
          },
          aggregateContent: true, // Keep true to aggregate content for searching
          recordVersion: "v3",
        });

        return records.map((record) => {
          const url = record.url && record.url.split("#")[0];

          return {
            ...record,
            url,
            weight: {
              pageRank: customWeight,
              level: (() => {
                if (record.hierarchy.lvl1) return 100;
                if (record.hierarchy.lvl2) return 80;
                if (record.hierarchy.lvl3) return 60;
                if (record.hierarchy.lvl4) return 40;
                return 20;
              })(),
            },
          };
        });
      },
    },
  ],
  sitemaps: ["https://adapty.io/docs/sitemap.xml"],
  initialIndexSettings: {
    adapty: {
      advancedSyntax: true,
      queryType: "prefixNone",
      allowTyposOnNumericTokens: false,
      attributeCriteriaComputedByMinProximity: true,
      attributeForDistinct: "url",
      attributesForFaceting: [
        "type",
        "lang",
        "language",
        "version",
        "docusaurus_tag",
        "keywords",
      ],
      // Use description for highlighting instead of content
      attributesToHighlight: ["hierarchy"],
      attributesToRetrieve: [
        "hierarchy",
        // Keep content in retrieval for search functionality but don't display it
        "content",
        "description",
        "anchor",
        "url",
        "url_without_anchor",
        "type",
        "keywords",
        "weight",
      ],
      // Use description for snippets instead of content
      attributesToSnippet: ["description:10"],
      camelCaseAttributes: ["hierarchy", "content", "description"],
      searchableAttributes: [
        "unordered(metadataTitle)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy.lvl6)",
        // Keep content searchable but don't display it in results
        "content",
        "description",
        "unordered(keywords)",
      ],
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      distinct: 1,
      // Keep highlight tags for description highlighting
      highlightPostTag: "</span>",
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      ignorePlurals: true,
      minProximity: 1,
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      ranking: [
        "exact",
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "custom",
      ],
      optionalWords: "",
      exactOnSingleWordQuery: "attribute",
      removeWordsIfNoResults: "none",
    },
  },
  ignoreCanonicalTo: true,
  safetyChecks: { beforeIndexPublishing: { maxLostRecordsPercentage: 10 } },
}); 