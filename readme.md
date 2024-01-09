<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">Sentira AI (https://sentiraai.com)</h1>
</p>
<p align="center">
    <em>Simplify Audio Transcription and Summarization with SentiraAI</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/Aunali321/sentira-common?style=default&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Aunali321/sentira-common?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Aunali321/sentira-common?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running sentira-common](#-running-sentira-common)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

sentira-common is a codebase that provides a common library for interacting with the Sentira AI platform. It includes functionality for transcribing audio files using the Sentira API. The core purpose of this project is to simplify the process of transcribing audio by providing a straightforward interface to the Sentira AI platform. The value proposition of sentira-common lies in its ability to handle the complexities of audio transcription, allowing developers to easily integrate the Sentira AI platform into their applications.

---

## 📦 Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| 🎵️  | **Transcription**  | Transcribe audio files with ⚡️ fast speeds. |
| 📄 | **Summarization** | Summarize any content while retaining key facts. |


---

## 📂 Repository Structure

```sh
└── sentira-common/
    ├── .github
    │   └── workflows
    │       └── release.yml
    ├── .releaserc
    ├── example.ts
    ├── index.ts
    ├── lib
    │   ├── types.js
    │   └── types.ts
    ├── package-lock.json
    ├── package.json
    ├── sentira_client.ts
    └── tsconfig.json
```

---

## 🧩 Modules

<details open><summary>Usage</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                            | ---                                                                                                                                                                                                                                                                                                                                                                         |
| [sentira_client.ts](https://github.com/Aunali321/sentira-common/blob/master/sentira_client.ts) | The `sentira_client.ts` code is a part of the `sentira-common` repository. It contains a shared API client for Sentira services. The code provides methods for summarizing text, transcribing audio, and creating API keys. It interacts with the SentiraAI API using the provided base URL and API key. The code handles requests, responses, error handling, and logging. |                                                                        |
| [example.ts](https://github.com/Aunali321/sentira-common/blob/master/example.ts)               | The `example.ts` code snippet in the `sentira-common` repository demonstrates the usage of the `SentiraAIClient` class. It showcases three critical features: audio transcription, text summarization, and API key creation. Each feature is demonstrated with example inputs and desired outputs.                                                                          |
| [index.ts](https://github.com/Aunali321/sentira-common/blob/master/index.ts)                   | The code snippet in the `index.ts` file is responsible for exporting the `sentira_client` module and the `types` module from the `sentira-common` repository. It plays a critical role in providing access to these modules to other parts of the codebase.                                                                                                                 |
| [types.ts](https://github.com/Aunali321/sentira-common/blob/master/lib/types.ts) | The code snippet in `lib/types.ts` defines the interfaces used in the parent repository's architecture. These interfaces represent the request and response bodies for Transcription and Summary APIs, facilitating speech-to-text and text summarization functionalities. |
| [release.yml](https://github.com/Aunali321/sentira-common/blob/master/.github/workflows/release.yml) | The code snippet in `.github/workflows/release.yml` is responsible for automating the release process in the `sentira-common` repository. It sets up a workflow that runs whenever a new release is created. The workflow executes a series of steps, including building and testing the code, generating release notes, and publishing the release artifacts. |
</details>

---

## 🚀 Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**

### ⚙️ Installation

1. Clone the sentira-common repository:

```sh
git clone https://github.com/Aunali321/sentira-common
```

2. Change to the project directory:

```sh
cd sentira-common
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running sentira-common

Use the following command to run sentira-common:

```sh
npm run build && node dist/index.js
```

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github/Aunali321/sentira-common/pulls)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github/Aunali321/sentira-common/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github/Aunali321/sentira-common/issues)**: Submit bugs found or log feature requests for Sentira-common.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/Aunali321/sentira-common
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>