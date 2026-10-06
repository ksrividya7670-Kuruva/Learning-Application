export const pythonDictionariesLesson = `
# Python Dictionaries

When we say that dictionaries are ordered, it means that the items have a defined order, and that order will not change.

Unordered means that the items do not have a defined order, you cannot refer to an item by using an index.

## Changeable

Dictionaries are changeable, meaning that we can change, add or remove items after the dictionary has been created.

## Duplicates Not Allowed

Dictionaries cannot have two items with the same key:

\`\`\`python
# Duplicate values will overwrite existing values:
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
  "year": 2020
}
print(thisdict)
\`\`\`

### Dictionary Length

To determine how many items a dictionary has, use the \`len()\` function:

\`\`\`python
# Print the number of items in the dictionary:
print(len(thisdict))
\`\`\`

### Dictionary Items - Data Types

The values in dictionary items can be of any data type:

\`\`\`python
# String, int, boolean, and list data types:
thisdict = {
  "brand": "Ford",
  "electric": False,
  "year": 1964,
  "colors": ["red", "white", "blue"]
}
\`\`\`

### The dict() Constructor

It is also possible to use the \`dict()\` constructor to make a dictionary.

\`\`\`python
# Using the dict() method to make a dictionary:
thisdict = dict(name = "John", age = 36, country = "Norway")
print(thisdict)
\`\`\`
`;

export const getLessonContent = (courseName, lessonTitle) => {
  const t = (lessonTitle || '').toLowerCase();
  const c = (courseName || '').toLowerCase();

  // Python specific exact matches (like W3Schools example)
  if (c === 'python' && t.includes('dictionaries')) {
    return pythonDictionariesLesson;
  }

  // HTML specific exact matches
  if (c === 'html' && t.includes('formatting')) {
    return `
# Text Formatting, Headings & Links

Welcome to the lesson on **Text Formatting, Headings & Links** in HTML. This lesson focuses on the core tags used to present text, structure importance, and connect pages together.

## 1. Headings (h1 - h6)

HTML provides 6 levels of headings. \`<h1>\` is the most important, and \`<h6>\` is the least important.

\`\`\`html
<h1>Main Title of the Page</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
\`\`\`

## 2. Text Formatting Tags

You can make text bold, italic, or underlined using specific semantic tags.

- \`<strong>\` or \`<b>\`: **Bold text**
- \`<em>\` or \`<i>\`: *Italic text*
- \`<mark>\`: <mark>Highlighted text</mark>
- \`<u>\`: Underlined text
- \`<br>\`: Line break (does not have a closing tag)

\`\`\`html
<!-- Example of text formatting -->
<p>This is a <strong>very important</strong> message.</p>
<p>We can also add <em>emphasis</em> to our words.</p>
<p>Line 1<br>Line 2</p>
\`\`\`

## 3. Hyperlinks

To create a link, use the \`<a>\` (anchor) tag. The \`href\` attribute specifies the URL of the page the link goes to.

\`\`\`html
<!-- A simple link -->
<a href="https://learnhub.org">Visit LearnHub Academy</a>

<!-- A link that opens in a new tab -->
<a href="https://learnhub.org" target="_blank">Open in New Tab</a>
\`\`\`

## 4. Try It Yourself!

Check the Practice Editor tab to write your own HTML headings, formatted paragraphs, and links!
`;
  }

  // Introduction specific template
  if (t.includes('intro')) {
    let description = '';
    let benefits = [];
    let realWorld = '';
    
    switch(c) {
      case 'python':
        description = 'Python is a high-level, general-purpose programming language known for its readability and versatile nature. It supports multiple programming paradigms, including structured, object-oriented, and functional programming.';
        benefits = ['Highly readable syntax, resembling plain English.', 'Extensive standard library for web, data science, and AI.', 'Massive community support and third-party packages.'];
        realWorld = 'Instagram relies heavily on Python (Django) for its backend, managing millions of users. Netflix uses Python for its recommendation algorithms and data analysis.';
        break;
      case 'javascript':
        description = 'JavaScript is a lightweight, interpreted programming language primarily known as the scripting language for Web pages. It enables interactive web pages and is an essential part of web applications.';
        benefits = ['Runs natively in all modern web browsers.', 'Can be used for both frontend and backend (Node.js).', 'Asynchronous processing capabilities for fast performance.'];
        realWorld = 'Google Maps uses JavaScript extensively to fetch map tiles and handle interactive dragging and zooming without reloading the page.';
        break;
      case 'html':
        description = 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and meaning of web content.';
        benefits = ['Universal standard for all web pages.', 'SEO friendly when using proper semantic tags.', 'Easily integrates with CSS for styling and JS for logic.'];
        realWorld = 'Every single web page you visit, from Amazon to Wikipedia, uses HTML to structure its navigation, text, images, and links.';
        break;
      case 'css':
        description = 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. It separates content from design.';
        benefits = ['Enables complex responsive layouts (Flexbox, Grid).', 'Provides rich visual styling, animations, and transitions.', 'Improves website accessibility and user experience.'];
        realWorld = 'Apple\'s product landing pages use advanced CSS for smooth scrolling animations, sleek typography, and responsive grid layouts that adapt to phones and desktops.';
        break;
      case 'react':
      case 'react.js':
        description = 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.';
        benefits = ['Virtual DOM ensures ultra-fast rendering.', 'Component-based architecture promotes high reusability.', 'Strong ecosystem and backed by Meta (Facebook).'];
        realWorld = 'Facebook and Instagram are built using React to handle massive amounts of real-time data, like news feeds and notifications, without reloading the page.';
        break;
      case 'java':
        description = 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It runs on the "write once, run anywhere" (WORA) principle.';
        benefits = ['Platform independence via the Java Virtual Machine (JVM).', 'Strongly typed and highly secure for enterprise applications.', 'Excellent multi-threading capabilities.'];
        realWorld = 'The Android operating system\'s core apps and many enterprise banking systems (like those at Chase or Bank of America) run on Java for its security and scalability.';
        break;
      default:
        description = `${courseName} is a powerful technology used by developers worldwide to build robust and scalable systems.`;
        benefits = ['High performance and scalability.', 'Industry standard for modern development.', 'Great developer experience and community support.'];
        realWorld = `Many Fortune 500 companies utilize ${courseName} to power their core infrastructure and user-facing applications.`;
        break;
    }

    return `
# Introduction to ${courseName}

Welcome to the absolute beginning of your **${courseName}** journey! Before we dive into writing code, it is crucial to understand what this technology is, why it was created, and how it is used in the real world.

## 1. About ${courseName}

${description}

When learning ${courseName}, you are not just learning syntax; you are learning a new way to solve problems and structure logic.

## 2. Core Benefits

Why do millions of developers and thousands of companies choose ${courseName}?

- **Benefit 1:** ${benefits[0]}
- **Benefit 2:** ${benefits[1]}
- **Benefit 3:** ${benefits[2]}

## 3. Real-Time Industry Examples

It's easy to look at code in a vacuum, but how is this used in the real world?

> [!NOTE]
> **Real-World Application:**
> ${realWorld}

## 4. What You Will Build

By the end of this masterclass, you won't just know the theory—you will have built practical, real-world projects that utilize ${courseName}'s best features. 

Head over to the next lesson to write your very first line of code!
`;
  }

  // Dynamic W3Schools-style structured template for ANY lesson
  let ext = 'javascript';
  let cmt = '//';
  let basicCode = '';
  let advancedCode = '';
  let realWorldContext = '';

  switch(c) {
    case 'python':
      ext = 'python';
      cmt = '#';
      basicCode = `def init_${t.replace(/[^a-zA-Z]/g, '')}():\n    print(f"Initializing {lessonTitle}")\n\ninit_${t.replace(/[^a-zA-Z]/g, '')}()`;
      advancedCode = `class ${lessonTitle.replace(/[^a-zA-Z]/g, '')}Manager:\n    def __init__(self):\n        self.is_active = True\n\n    def process(self, data):\n        try:\n            if self.is_active:\n                return data.upper()\n        except Exception as e:\n            print(f"Critical error: {e}")`;
      realWorldContext = `For example, a data engineering team at a streaming service might use this specific Python implementation to batch process thousands of user logs securely and efficiently.`;
      break;
    case 'html':
      ext = 'html';
      cmt = '<!-- -->';
      basicCode = `<div class="container">\n  <h1>Understanding ${lessonTitle}</h1>\n  <p>This is a foundational example.</p>\n</div>`;
      advancedCode = `<main id="app-root">\n  <section aria-labelledby="section-title">\n    <h2 id="section-title">Advanced ${lessonTitle}</h2>\n    <form onsubmit="return false;">\n      <input type="text" required placeholder="Enter data" />\n      <button type="submit">Process</button>\n    </form>\n  </section>\n</main>`;
      realWorldContext = `For instance, a major e-commerce platform uses this precise HTML architecture to ensure their checkout forms and product catalogs are fully accessible to screen readers and optimized for SEO.`;
      break;
    case 'css':
      ext = 'css';
      cmt = '/* */';
      basicCode = `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 1rem;\n}`;
      advancedCode = `@media (min-width: 768px) {\n  .grid-layout {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    gap: 2rem;\n    transition: all 0.3s ease;\n  }\n  .grid-layout:hover {\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n  }\n}`;
      realWorldContext = `A real-world example is a responsive media dashboard (like YouTube's grid) that seamlessly scales and reflows elements depending on whether the user is on a mobile device or a 4K monitor.`;
      break;
    case 'react':
    case 'react.js':
      ext = 'jsx';
      cmt = '//';
      basicCode = `import React, { useState } from 'react';\n\nconst BasicComponent = () => {\n  const [active, setActive] = useState(false);\n  return <div onClick={() => setActive(!active)}>{active ? 'Active' : 'Inactive'}</div>;\n};`;
      advancedCode = `import React, { useEffect, useCallback } from 'react';\n\nconst AdvancedContainer = ({ data }) => {\n  const processData = useCallback(() => {\n    // complex processing\n    return data.map(item => item.id);\n  }, [data]);\n\n  useEffect(() => {\n    const results = processData();\n    console.log("Processed:", results);\n  }, [processData]);\n\n  return <section>Data processed successfully.</section>;\n};`;
      realWorldContext = `In a real enterprise React application, like a banking portal, developers use these patterns to handle complex state transitions and memoized data fetching to ensure the UI never stutters.`;
      break;
    case 'java':
      ext = 'java';
      cmt = '//';
      basicCode = `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Initializing ${lessonTitle}");\n    }\n}`;
      advancedCode = `import java.util.*;\nimport java.util.stream.*;\n\npublic class DataProcessor {\n    public List<String> processList(List<String> input) {\n        return input.stream()\n            .filter(Objects::nonNull)\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n    }\n}`;
      realWorldContext = `A large-scale financial trading system uses this Java pattern to safely process millions of concurrent transactions across multiple threads without risking data corruption.`;
      break;
    default:
      ext = 'javascript';
      cmt = '//';
      basicCode = `// Basic syntax template for ${lessonTitle}\nconst init = () => {\n  console.log("Initializing ${lessonTitle} within ${courseName} environment.");\n};\ninit();`;
      advancedCode = `// Advanced production-grade implementation of ${lessonTitle}\ntry {\n    const processResult = executeAdvancedLogic();\n    if (processResult.isValid) {\n        handleSuccess(processResult.data);\n    }\n} catch (error) {\n    console.error("Critical failure during execution:", error);\n}`;
      realWorldContext = `In real-world production environments, software engineers implement these precise patterns to maintain modular, scalable, and bug-free codebases when collaborating with large teams.`;
      break;
  }

  return `
# ${lessonTitle}

Welcome to this comprehensive guide on **${lessonTitle}** in ${courseName}. In this lesson, we will cover the core principles, syntax structure, and real-world best practices used by professional engineers.

## 1. Introduction to the Concept

${lessonTitle} is a foundational architectural concept in ${courseName} that allows developers to write efficient, clean, and highly scalable code. Understanding how it works under the hood is absolutely crucial for building robust applications.

When working with ${courseName} in a production environment, you will frequently encounter scenarios where you must implement this concept to solve complex data flow or layout problems.

## 2. Syntax & Basic Usage

Here is the basic syntax and structural pattern:

\`\`\`${ext}
${cmt} Basic syntax implementation
${basicCode}
\`\`\`

### Industry Best Practices

1. **Keep it modular:** Always ensure your code is separated into isolated, logical blocks.
2. **Naming conventions:** Use clear, descriptive names for your variables, functions, and classes to ensure the codebase remains self-documenting.
3. **Error handling:** Always anticipate edge cases (like null values or network failures) and handle them gracefully to prevent crashes.

## 3. Real-World Industry Application

It's easy to write code in a controlled environment, but how is this applied at scale?

> [!NOTE]
> **Real-World Context:**
> ${realWorldContext}

For enterprise-scale web applications, simple implementations often aren't enough. You must consider time complexity, memory management, and security vulnerabilities. Below is a more advanced structural example showing how to scale this concept.

\`\`\`${ext}
${cmt} Advanced production-grade pattern
${advancedCode}
\`\`\`

## 4. Try It Yourself (Interactive Lab)

It's time to put theory into practice! Use the interactive editor below to:
- Instantiate a new data structure or component.
- Apply the principles taught in this lesson.
- Verify the output in the live console to ensure it matches expectations.
`;
};
